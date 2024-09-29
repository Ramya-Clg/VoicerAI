import React, { use, useRef, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { GenerateThumbnailProps } from '@/types'
import { Loader } from 'lucide-react'
import { Input } from './ui/input'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import { arrayBuffer, blob } from 'stream/consumers'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { get } from 'http'
import { v4 as uuidv4 } from 'uuid'


const GenerateThumbnail = ({
    setImage,
    setImageStorageId,
    image,
    imagePrompt,
    setImagePrompt
}: GenerateThumbnailProps) => {

    const [isAiThumbnail, setIsAiThumbnail] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(false)
    const imageRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast();
    const generateUploadUrl = useMutation(api.files.generateUploadUrl)
    const { startUpload } = useUploadFiles(generateUploadUrl)
    const getImageUrl = useMutation(api.podcasts.getUrl)
    const getImageProcessId = useAction(api.openai.getImageProcessId)

    const handleImage = async (blob: Blob, fileName: string) => {
        setIsImageLoading(true);
        setImage('');
        try {
            const file = new File([blob], fileName, { type: 'image/png' });
            const uploaded = await startUpload([file]);
            const storageId = (uploaded[0].response as any).storageId;
            setImageStorageId(storageId);
            const imageUrl = await getImageUrl({ storageId });
            setImage(imageUrl!);
            setIsImageLoading(false);
            toast({
                title: "Thumbnail generated successfully",
            })
        } catch (e) {
            console.error(e);
            toast({
                title: "error generating thumbnail",
                variant: 'destructive'
            })
        }
    }
    const generateImage = async () => {
        try {
            const processUrl = await getImageProcessId({ prompt: imagePrompt });
            const response = await fetch(processUrl)
            const blob = await response.blob();
            handleImage(blob, `thumbnail-${uuidv4()}.png`);


            // console.log(processUrl);
            // setImage(processUrl);
            // const blob = new Blob([processUrl], { type: 'image/jpeg' });
            // const fileName = `podcast-${uuidv4()}.mp3`;
            // handleImage(blob, fileName);
        } catch (error) {
            console.log(error);
            toast({
                title: "error generating image",
                variant: 'destructive'
            })
        }
    }
    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const files = e.target.files;
            if (!files) return;
            const file = files[0];
            const blob = await file.arrayBuffer()
                .then((ab) => new Blob([ab]));
            handleImage(blob, file.name);
        } catch (e) {
            console.log(e);
            toast({
                title: "error uploading image",
                variant: 'destructive'
            })
        }
    }

    return (
        <>
            <div className='generate_thumbnail'>
                <Button type='button' variant='plain'
                    onClick={() => setIsAiThumbnail(true)}
                    className={cn('', {
                        "bg-black-6": isAiThumbnail
                    })}>
                    Use AI to generate thumbnail
                </Button>
                <Button type='button' variant='plain'
                    onClick={() => setIsAiThumbnail(false)}
                    className={cn('', {
                        "bg-black-6": !isAiThumbnail
                    })}>
                    Upload Custom image
                </Button >
            </div >
            {isAiThumbnail ? (
                <div className='flex flex-col gap-2.5 '>
                    <div className='mt-5 flex flex-col gap-2.5'>
                        <Label className='text-16 font-bold text-white-1' >
                            AI prompt to generate Thumbnail
                        </Label>
                        <Textarea className='input-class font-light focus-visible:ring-offset-orange-1' placeholder='provide text to generate Thumbnail'
                            rows={5}
                            value={imagePrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                        />
                    </div>
                    <div className='w-full max-w-[200px]'>
                        <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1 transition-all duration-500 hover:bg-black-1" onClick={generateImage}>
                            {isImageLoading ? (
                                <>
                                    Generating
                                    <Loader size={20} className="animate-spin ml-2"></Loader>
                                </>
                            ) : (
                                'Generate'
                            )}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className='image_div' onClick={() => imageRef?.current?.click()}>
                    <Input type='file' className='hidden' ref={imageRef} onChange={(e) => uploadImage(e)}>
                    </Input>
                    {!isImageLoading ? (
                        <Image src='/icons/upload-image.svg' width={40} height={40} alt='upload' />
                    ) : (
                        <div className='text-16 flex-center font-medium text-white-1'>
                            Uploading
                            <Loader size={20} className="animate-spin ml-2"></Loader>
                        </div>
                    )}
                    <div className='flex flex-col items-center gap-1'>
                        <h2 className='text-12 font-bold text-orange-1'>Click to upload</h2>
                        <p className='text-12 font-normal text-gray-1'>SVG,PNG,JPG,or GIF(max.1080x1080px)</p>
                    </div>
                </div>
            )}
            {image && (
                <div className='flex-center w-full'>
                    <Image src={image} width={200} height={200} className='mt-5' alt='thumbnail'></Image>
                </div>
            )}
        </>
    )
}

export default GenerateThumbnail
