import { problem } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { z } from 'zod';

export type insertProblemType = Omit<InferSelectModel<typeof problem>, 'id'>;

export type problemType = {
  [problemClass: string]: Omit<InferSelectModel<typeof problem>, 'class'>[];
};

export type reviewListType = {
  // record the problem id that need to review of each flow
  [flowId: number]: number[];
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
