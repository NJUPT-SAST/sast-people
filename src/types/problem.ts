import { problem } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type insertProblemType = Omit<InferSelectModel<typeof problem>, 'id'>;

export type problemType = {
  [problemClass: string]: Omit<InferSelectModel<typeof problem>, 'class'>[];
};

export type reviewListType = {
  // record the problem id that need to review of each flow
  [flowId: number]: number[];
};
