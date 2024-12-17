import { v } from "convex/values";
import { action } from "./_generated/server";
import axios from "axios";

export const getImageProcessId = action({
    args: {
        prompt: v.string(),
    },
    handler: async (_, { prompt }) => {
        async function query(data: { inputs: string }) {
            try {
                const response = await axios.post(
                    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        responseType: "arraybuffer", // Binary data
                    }
                );
                return response.data; // Raw binary data
            } catch (error) {
                console.error("Error fetching data from the API:", error);
                throw new Error("Failed to fetch image data");
            }
        }

        try {
            const binaryData = await query({ inputs: prompt });

            // Manually encode ArrayBuffer into Base64
            const base64Image = btoa(
                String.fromCharCode(...new Uint8Array(binaryData))
            );

            // Return as a data URL
            return `data:image/png;base64,${base64Image}`;
        } catch (error) {
            console.error("Error generating image:", error);
            throw new Error("Failed to generate image");
        }
    },
});

export const getPodcastAudio = action({
    args: {
        voice: v.string(),
        prompt: v.string(),
    },
    handler: async (_, { voice, prompt }) => {
        try {
            const url = `https://api.voicerss.org/?key=${process.env.NEXT_PUBLIC_VOICERSS_API_KEY}&hl=en-us&c=MP3&v=${voice}&src=${prompt}`
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const base64Image = btoa(
                String.fromCharCode(...new Uint8Array(response.data))
            );

            // Return as a data URL
            return `data:image/png;base64,${base64Image}`;
        } catch (error) {
            console.error("Error generating audio:", error);
            throw new Error("Failed to generate audio");
        }
    },
});
