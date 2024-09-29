import { v } from "convex/values";
import { action } from "./_generated/server";
import monsterApi from '@api/monster-api';
import axios from "axios";
import { promise } from "zod";
import { AArrowDown } from "lucide-react";

export const getImageProcessId = action({
    args: {
        prompt: v.string(),
    },
    handler: async (_, { prompt }) => {
        const key = process.env.MONSTER_API_KEY;
        const response = await axios.post('https://api.monsterapi.ai/v1/generate/txt2img', {
            safe_filter: true,
            prompt: prompt,
            samples: 1,
            seed: 2020,
            style: "digital-art",
            guidance_scale: 7.5
        }, {
            headers: {
                Authorization: `Bearer ${key}`,
            }
        });


        const data = await response.data;
        const processId = data.process_id;
        
        var response2 = await axios.get(`https://api.monsterapi.ai/v1/status/${processId}`, {
            headers: {
                Authorization: `Bearer ${key} `,
            }
        });
        
        while(response2.data.status != "COMPLETED"){
            response2 = await axios.get(`https://api.monsterapi.ai/v1/status/${processId}`, {
                headers: {
                    Authorization: `Bearer ${key} `,
                }
            });
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        const processUrl = response2.data.result.output[0];

        return processUrl;


        // const response = await axios.get(`https://pollinations.ai/p/${prompt}`,{
        //     responseType: 'arraybuffer'
        // });
        // return response.data;

    },
});

