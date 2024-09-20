import { user } from '@/db/schema';
import { InferColumnsDataTypes, InferSelectModel } from 'drizzle-orm';

export type userType = Extract<InferSelectModel<typeof user>, { id: number }>;
