import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const getUrl = mutation({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, { storageId }) => {
        return await ctx.storage.getUrl(storageId);
    }
})


export const createPodcast = mutation({
    args: {
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        audioUrl: v.string(),
        audioDuration: v.number(),
        imageUrl: v.string(),
        voiceType: v.string(),
        imagePrompt: v.string(),
        voicePrompt: v.string(),
        views: v.number(),
        audioStorageId: v.id("_storage"),
        imageStorageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        const id = await ctx.auth.getUserIdentity();
        if (!id) {
            throw new ConvexError("User not authenticated")
        }
        const user = await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field('email'), id.email))
            .collect();
        if (!user) {
            throw new ConvexError("User not found")
        }

        return await ctx.db.insert("podcasts", {
            ...args,
            user: user[0]._id,
            author: user[0].name,
            authorId: user[0].clerkId,
            authorImageUrl: user[0].imageUrl,
        });
    }
})