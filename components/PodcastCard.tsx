import React from 'react'
import Image from 'next/image'
import { Id } from '@/convex/_generated/dataModel'
import { useRouter } from 'next/navigation'

const PodcastCard = ({ imgURL, title, description, podcastId }: {
    imgURL: string,
    title: string,
    description: string,
    podcastId: Id<"podcasts">
}) => {

    const router=useRouter()
    const handlViews = ()=>{
        router.push(`/podcast/${podcastId}`,{
            scroll:true
        })
    }

    return (
        <div className='cursor-pointer' onClick={handlViews}>
            <figure className='flex flex-col gap-2'>
                <Image src={imgURL} width={174} height={174} alt={title} className='aspect-square w-full h-fit rounded-xl 2xl:size-[200px]'></Image>
            </figure>
            <div className='flex flex-col'>
                <h1 className='text-16 truncate  font-bold text-white-1'>
                    {title}
                </h1>
                <h2 className='text-12 truncate font-normal capitalize text-white-4'>
                    {description}
                </h2>
            </div>
        </div>
    )
}

export default PodcastCard
