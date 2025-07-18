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

export const collections = { products };