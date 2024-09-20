import { InferColumnsDataTypes, InferSelectModel } from 'drizzle-orm';
import { flowType } from '@/db/schema';
import { stepType } from './step';

export type flowTypeType = Omit<
  InferSelectModel<typeof flowType>,
  'createBy'
> & { createBy: string; steps: stepType[] };
