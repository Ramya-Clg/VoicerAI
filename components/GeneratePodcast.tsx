import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid'
import { generateUploadUrl } from '@/convex/files'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { set } from 'react-hook-form'
import { useToast } from "@/hooks/use-toast"
import axios from 'axios'


const useGeneratePodcast = ({
    setAudio,
    setAudioDuration,
    setAudioStorageId,
    voiceType,
    audio,
    voicePrompt,
    setVoicePrompt
}: GeneratePodcastProps) => {
    //logic for podcast generation
    const [isGenerating, setIsGenerating] = useState(false)
    const generateUploadUrl = useMutation(api.files.generateUploadUrl)
    const { startUpload } = useUploadFiles(generateUploadUrl)

    const getPodcastAudio = async ({ voice, input }: any) => {
        console.log('Generating podcast audio')
        const response = await axios.get(`http://api.voicerss.org/?key=${process.env.VOICERSS_API_KEY}&hl=en-us&c=MP3&v=${voice}&src=${input}
`, { responseType: 'blob' })
        return response.data;
    };

    const getAudioUrl = useMutation(api.podcasts.getUrl)

    const { toast } = useToast()

    const generatePodcast = async () => {
        setIsGenerating(true);
        setAudio('');
        if (!voicePrompt) {
            setIsGenerating(false);
            toast({
                title: "Please provide a prompt to generate the podcast",
            })
            return;
        }

        try {
            const blob = await getPodcastAudio({
                voice: voiceType,
                input: voicePrompt
            })
            console.log(blob)
            const fileName = `podcast-${uuidv4()}.mp3`;
            const file = new File([blob], fileName, { type: 'audio/mpeg' });
            const uploaded = await startUpload([file]);
            const storageId = (uploaded[0].response as any).storageId;
            setAudioStorageId(storageId);
            const audioUrl = await getAudioUrl({ storageId });
            setAudio(audioUrl!);
            setIsGenerating(false);
            toast({
                title: "Podcast generated successfully",
            })
        } catch (error) {
            setIsGenerating(false);
            toast({
                title: "Failed to generate podcast",
                variant: 'destructive'
            })
        }
    }

    return {
        isGenerating, generatePodcast
    }
}

const GeneratePodcast = ({
    setAudio,
    setAudioDuration,
    setAudioStorageId,
    voiceType,
    audio,
    voicePrompt,
    setVoicePrompt
}: GeneratePodcastProps) => {
    const { isGenerating, generatePodcast } = useGeneratePodcast({ setAudio, setAudioDuration, setAudioStorageId, voiceType, audio, voicePrompt, setVoicePrompt })

    return (
        <div>
            <div className='flex flex-col gap-2.5'>
                <Label className='text-16 font-bold text-white-1' >
                    AI prompt to generate podcast
                </Label>
                <Textarea className='input-class font-light focus-visible:ring-offset-orange-1' placeholder='provide text to generate audio'
                    rows={5}
                    value={voicePrompt}
                    onChange={(e) => setVoicePrompt(e.target.value)}
                />
            </div>
            <div className='mt-5 w-full max-w-[200px]'>
                <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1 transition-all duration-500 hover:bg-black-1" onClick={generatePodcast}>
                    {isGenerating ? (
                        <>
                            Generating
                            <Loader size={20} className="animate-spin ml-2"></Loader>
                        </>
                    ) : (
                        'Generate'
                    )}
                </Button>
            </div>
            {audio && (
                <audio controls src={audio} autoPlay className="mt-5" onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}></audio>
            )}
        </div>
    )
}

export default GeneratePodcast
