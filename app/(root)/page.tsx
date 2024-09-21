import { Button } from "@/components/ui/button";
import exp from "constants";
import React from "react";

const Home = () => {
    return <div className="mt-9 flex flex-col gap-9">
        <section className="flex flex-col gap-5">
            <h1 className="text-20 font-bold text-white-1">
                Trending podcasts
            </h1>
            <Button className="text-white-1 bg-orange-1">Button</Button>
        </section>
    </div>;
}

export default Home;