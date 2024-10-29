'use client'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import Header from './Header';
import Carousel from './Carousel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const RightSidebar = () => {
    const user = useUser();
    const topPodcasters = useQuery(api.users.getTopUserByPodcastCount)
    const router = useRouter()
    return (
        <section className='right_sidebar text-white-1'>
            <SignedIn >
                <Link href={`/profile/${user?.user?.id}`} />
                <UserButton />

            </SignedIn>
            <section className='mt-4'>
                <Header headerTitle = "Fans like you" />
                {topPodcasters && <Carousel fansLikeDetail={topPodcasters} />}
            </section>
            <section className='flex flex-col gap-8 pt-12'>
                <Header headerTitle = "Top podcasters" />
                <div className='flex flex-col gap-6'>
                    {topPodcasters?.slice(0,4).map((item)=>(
                        <div key={item._id} className='flex cursor-pointer  justify-between' onClick={()=>router.push(`/profile/${item.clerkId}`)}>
                            <figure className='flex items-center gap-2'>
                            <Image className='rounded-lg' src={item.imageUrl} alt={item.name} 
                            width={44}
                            height={44}></Image>
                            <h2 className='text-14 font-semibold text-white-1'>
                                {item.name}
                            </h2>
                            </figure>
                            < div className='flex items-center'>
                                <p className='text-12 font-'>
                                    {item.totalPodcasts} podcasts
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}

export default RightSidebar
