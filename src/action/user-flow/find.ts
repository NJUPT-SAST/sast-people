'use server';

import { db } from '@/db/drizzle';
import { user, userFlow } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export const findUserFlowId = async (
  studentId: string,
  flowId: number,
) => {
  const result = await db.select()
    .from(userFlow)
    .innerJoin(user, eq(user.id, userFlow.fkUserId))
    .where(and(eq(user.studentId, studentId), eq(userFlow.fkFlowId, flowId)));
  
  if (result.length === 0) {
    return null;
  }
  
  return result[0].user_flow.id;
};