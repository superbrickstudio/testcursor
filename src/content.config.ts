import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cta = z.object({
  label: z.string(),
  href: z.string(),
});

const industries = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/industries' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    metaDescription: z.string(),
    hero: z.object({
      intro: z.string(),
      primaryCta: cta,
      secondaryCta: cta,
    }),
    caseStudy: z.object({
      quote: z.string(),
      name: z.string(),
      role: z.string(),
      link: cta.optional(),
      stats: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
          }),
        )
        .length(3),
    }),
    callout: z.object({
      heading: z.string(),
      text: z.string(),
      cta,
    }),
    features: z.object({
      heading: z.string(),
      lead: z.string(),
      items: z.array(
        z.object({
          heading: z.string(),
          text: z.string(),
        }),
      ),
    }),
    deployment: z.object({
      heading: z.string(),
      steps: z.array(
        z.object({
          heading: z.string(),
          text: z.string(),
        }),
      ),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      primaryCta: cta,
      secondaryCta: cta,
      checklist: z.array(z.string()),
    }),
  }),
});

export const collections = { industries };
