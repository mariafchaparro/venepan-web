import { defineCollection, z } from "astro:content";

const products = defineCollection({
    schema: z.object({
        name: z.string(),
        weight: z.string(),
        image: z.string(),
        benefits: z.array(z.string()),
        description: z.string(),
    })
})

const reviews = defineCollection({
    schema: z.object({
        name: z.string(),
        date: z.string(),
        content: z.string(),
        stars: z.number().min(1).max(5),
    })
})

export const collections = { products, reviews };