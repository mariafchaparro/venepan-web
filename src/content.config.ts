import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const reviews = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/reviews" }),
    schema: z.object({
        name: z.string(),
        date: z.string(),
        image: z.string(),
        content: z.string(),
    }),
});

const recipes = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
    schema: z.object({
        name: z.string(),
        image: z.string(),
        preparationTime: z.number().int(),
        servings: z.number().int(),
        stars: z.number().int(),
        ingredients: z.array(z.string()),
        steps: z.array(z.string()),
    }),
});

export const collections = { reviews, recipes };
