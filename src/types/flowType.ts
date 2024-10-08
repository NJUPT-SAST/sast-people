import { InferColumnsDataTypes, InferSelectModel } from 'drizzle-orm';
import { flowType } from '@/db/schema';
import { fullStepType, stepType } from './step';

export type flowTypeType = Omit<
  InferSelectModel<typeof flowType>,
  'createBy'
> & { createBy: string | number; steps: fullStepType[] };
