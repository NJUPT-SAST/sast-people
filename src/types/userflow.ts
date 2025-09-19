import { userFlow } from '@/db/schema';
import { fullStepType } from '@/types/step';
import { InferSelectModel } from 'drizzle-orm';

//用户关联的流程
export type displayUserFlow = InferSelectModel<typeof userFlow>&{title: string, steps: fullStepType[]};


