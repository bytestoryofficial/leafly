import { z } from 'zod';

export const growthStageSchema = z.object({
  name: z.string(),
  order: z.number().int().nonnegative(),
  durationDaysMin: z.number().int().positive(),
  durationDaysMax: z.number().int().positive(),
  requirements: z.object({
    water: z.string(),
    sunlight: z.string(),
  }),
  milestones: z.array(z.string()),
});

export const plantSchema = z.object({
  slug: z.string(),
  commonName: z.string(),
  latinName: z.string(),
  type: z.string(),
  tags: z.array(z.string()),
  care: z.object({
    water: z.number().int().min(0).max(100),
    sunlight: z.string(),
    temperature: z.string(),
    humudity: z.string(),
    soil: z.string(),
  }),
  careTips: z.array(z.string()),
  growthStages: z.array(growthStageSchema),
});

type Plant = z.infer<typeof plantSchema>;
export default Plant;
