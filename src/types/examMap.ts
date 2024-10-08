import { InferColumnsDataTypes, InferSelectModel } from 'drizzle-orm';
import { examMap } from '@/db/schema';

export type examMapType = InferSelectModel<typeof examMap>;

export type insertExamMapType = Omit<examMapType, 'id'>;