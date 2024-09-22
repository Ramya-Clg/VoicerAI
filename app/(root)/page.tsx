import PodcastCard from "@/components/PodcastCard";
import { Button } from "@/components/ui/button";
import { podcastData } from "@/constants";
import exp from "constants";
import React from "react";

const Home = () => {
    return <div className="mt-9 flex flex-col gap-9">
        <section className="flex flex-col gap-5">
            <h1 className="text-20 font-bold text-white-1">
                Trending podcasts
            </h1>
            <div className="podcast_grid">
            {podcastData.map((podcast) => {
                return <PodcastCard key={podcast.id} imgURL={podcast.imgURL} description={podcast.description} title={podcast.title} podcastID = {podcast.id} />
            })}
            </div>
        </section>
    </div>;
}

export default Home;