import { defineCollection, z } from "astro:content";
// z -> zod schema

const books = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    img: z.string(),
    readtime: z.number(),
    description: z.string(),
    buy: z.object({
      spain: z.string().url(),
      usa: z.string().url(),
    }),
  })
})

const coinsCollection = defineCollection({
  schema: z.object({
    country: z.string(),
    countrySlug: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    reason: z.string(),
    year: z.number(),
  }),
});

export const collections = { books, coins: coinsCollection }