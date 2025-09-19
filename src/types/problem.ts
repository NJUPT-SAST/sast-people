import { problem } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { z } from 'zod';

export type displayProblemType = InferSelectModel<typeof problem>;

export type problemType = {
  [problemClass: string]: Omit<InferSelectModel<typeof problem>, 'class'>[];
};

export const selectProbSchema = z.object({
  flowTypeId: z.number(),
  stepId: z.number(),
  problemList: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      maxPoint: z.number(),
    }),
  ),
});

export type selectProbType = z.infer<typeof selectProbSchema>;
