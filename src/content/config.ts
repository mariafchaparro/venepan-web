import { defineCollection, z } from "astro:content";

const reviews = defineCollection({
    schema: z.object({
        name: z.string(),
        date: z.string(),
        image: z.string(),
        content: z.string()
    })
})

const recipes = defineCollection({
    schema: z.object({
        name: z.string(),
        image: z.string(),
        preparationTime: z.number().int(),
        servings: z.number().int(),
        stars: z.number().int(),
        ingredients: z.array(z.string()),
        steps: z.array(z.string())
    })
})

export const collections = { reviews, recipes };