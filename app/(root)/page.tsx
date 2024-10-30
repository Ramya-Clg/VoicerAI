"use client";
import PodcastCard from "@/components/PodcastCard";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Home = () => {
    const trendingPodcast = useQuery(api.podcasts.getTrendingPodcasts);
    return <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
        <section className="flex flex-col gap-5">
            <h1 className="text-20 font-bold text-white-1">
                Trending podcasts
            </h1>

            <div className="podcast_grid">
                {trendingPodcast?.map((podcast) => {
                    return <PodcastCard key={podcast._id} imgURL={podcast.imageUrl!} description={podcast.podcastDescription} title={podcast.podcastTitle} podcastId={podcast._id} />
                })}
            </div>
        </section>
    </div>;
}

export default Home;