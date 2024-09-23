"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import exp from "constants"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { getEnabledCategories } from "trace_events"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']

const formSchema = z.object({
    podcastTitle: z.string().min(2),
    podcastDescription: z.string().min(2),
})

const CreatePodcast = () => {
    const [imageURL, setImageURL] = useState<string | null>(null)
    const [imagePrompt, setImagePrompt] = useState<string | null>(null)
    const [imageStorageID, setImageStorageId] = useState<Id<"_storage"> | null>(null)
    const [audioURL, setAudioURL] = useState<string | null>(null)
    const [audioDuration, setAudioDuration] = useState<number | null>(null)
    const [audioStorageID, setaudioStorageID] = useState<Id<"_storage"> | null>(null)
    const [voiceType, setVoiceType] = useState<string | null>(null)
    const [voicePrompt, setVoicePrompt] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            podcastTitle: "",
            podcastDescription: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <section className="mt-10 flex flex-col">
            <h1 className="text-20 font-bold text-white-1"> Create Podcast </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                        <FormField
                            control={form.control}
                            name="podcastTitle"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                                    <FormControl>
                                        <Input className="input-class focus-visible: ring-orange-1" placeholder="RS podcast" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col gap-2.5">
                            <Label className="text-16 font-bold text-white-1 ">Select AI voice</Label>
                            <Select onValueChange={(e) => {
                                setVoiceType(e)
                            }}>
                                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1')}>
                                    <SelectValue placeholder="Select AI voice" className="placeholder:text-gray-1" />
                                </SelectTrigger>
                                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1" >
                                    {voiceCategories.map((category) => (
                                        <SelectItem value={category} key={category} className="capitalize focus:bg-orange-1">
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                                {voiceType && (
                                    <audio src={`/${voiceType}.mp3`} autoPlay className="hidden"></audio>
                                )}
                            </Select>
                        </div>
                        <FormField
                            control={form.control}
                            name="podcastDescription"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="input-class focus-visible: ring-orange-1" placeholder="Write a short podcast description" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col pt-10">
                            <GeneratePodcast></GeneratePodcast>
                            <GenerateThumbnail></GenerateThumbnail>
                            <div className="mt-10 w-full ">
                                <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1">
                                    {isSubmitting? (
                                        <>
                                        Submitting
                                        <Loader size={20} className="animate-spin ml-2"></Loader>
                                        </>
                                    ): (
                                        'Submit and publish podcast'
                                    )}
                                </Button>
                            </div>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default CreatePodcast