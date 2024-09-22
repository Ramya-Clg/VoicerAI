import { defineSchema, defineTable } from "convex/server";
import { v, VString } from "convex/values";

export default defineSchema({
    podcasts: defineTable({
        audioStorageID: v.optional(v.id('_storage')),
        imageStorageID: v.optional(v.id('_storage')),
        users: v.id('users'),
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        audioURL: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        author: v.string(),
        authorId: v.string(),
        authorImageUrl: v.string(),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        audioDuration: v.number(),
        views: v.number(),
    }).searchIndex('search_author', { searchField: 'author' })
        .searchIndex('search_title', { searchField: 'podcastTitle' })
        .searchIndex('search_body', { searchField: 'podcastDescription' }),
    users: defineTable({
        email: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        name: v.string(),
    })
})