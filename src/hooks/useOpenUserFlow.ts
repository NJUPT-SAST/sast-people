'use server';
import { db } from '@/db/drizzle';
import { user, userFlow } from '@/db/schema';
import { verifyRole } from '@/lib/dal';
import { eq, inArray, and } from 'drizzle-orm';

export const useOpenUserFlow = async (studentId: string) => {
  verifyRole(1);

  const flowId = await db
    .select({
      flowId: userFlow.id,
    })
    .from(userFlow)
    .innerJoin(user, eq(user.id, userFlow.fkUserId))
    .where(and(eq(user.studentId, studentId), inArray(userFlow.status, ['pending', 'ongoing'])))
    .then(res => {
      return res.map(v => v.flowId);
    });

  if (!flowId) {
    throw new Error('您还没有报名流程');
  }

  return flowId;
};