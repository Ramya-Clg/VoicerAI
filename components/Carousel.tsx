import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblalCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { CarouselProps } from '@/types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


const EmblaCarousel = ({ fansLikeDetail }: CarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
    const router = useRouter()
    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop

        resetOrStop()
    }, [])

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onNavButtonClick
    )
    const slides = fansLikeDetail && fansLikeDetail?.filter((item: any) => item.totalPodcasts > 0)
    return (
        <section className="flex w-full flex-col gap-4 overflow-hidden " ref={emblaRef} >
            <div className='flex'>
                {slides.slice(0, 5).map((item) =>
                    <figure key={item._id} className='carousel_box' onClick={() => router.push(`/podcasts/${item.podcast[0]?.podcastId}`)}>
                        <Image src={item.imageUrl} alt='card' property='fill' className='absolute size-full rounded-xl border-none' width={40} height={40} />
                        <div className='glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4'>
                            <h2 className='text-14 font-semibold text-white-1'>
                                {item.podcast[0]?.podcastTitle}
                            </h2>
                            <p className='text-12 font-normal text-white-1'>
                                {item.name}
                            </p>
                        </div>
                    </figure>
                )}
            </div>

            <div className="flex justify-center gap-2 ">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        selected={index === selectedIndex}
                        onClick={() => onDotButtonClick(index)}
                    />
                ))}
            </div>
        </section>
    )
}

export default EmblaCarousel
