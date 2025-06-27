import { db } from '@/db/drizzle';
import { flowType } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

// TODO: v2 db 
// export const useFlowTypeInfo = async (id: number) => {
//   const flowTypeInfo = await db
//     .select()
//     .from(flowType)
//     .where(and(eq(flowType.id, id), eq(flowType.isDeleted, false)));
//   return flowTypeInfo[0];
// };
