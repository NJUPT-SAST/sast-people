import { user } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

//用户管理相关的信息
export type userType = InferSelectModel<typeof user>;

