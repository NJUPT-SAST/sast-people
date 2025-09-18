'use server';
import { db } from '@/db/drizzle';
import { user, userFlow } from '@/db/schema';
import { verifyRole } from '@/lib/dal';
import { eq } from 'drizzle-orm';

export const useOngoingUserFlow = async (studentId: string) => {
  verifyRole(1);

  const flowId = await db
    .select({
      flowId: userFlow.id,
    })
    .from(userFlow)
    .innerJoin(user, eq(user.id, userFlow.fkUserId))
    .where(eq(user.studentId, studentId))
    .then(res => {
      return res[0]?.flowId;
    });

  if (!flowId) {
    throw new Error('您还没有报名流程');
  }

  return flowId;
};