'use server';
import { db } from '@/db/drizzle';
import { user, userFlow } from '@/db/schema';
import { userPoint } from '@/db/schema';
import { desc, eq, sum } from 'drizzle-orm';

export const calScore = async (flowId: number) => {
  const examResult = await db.select({
      uid: user.id,
      name: user.name,
      studentId: user.studentId,
      phoneNumber: user.phone,
      totalScore: sum(userPoint.points),
    })
    .from(userFlow)
    .innerJoin(userPoint, eq(userPoint.fkUserFlowId, userFlow.id))
    .innerJoin(user, eq(userFlow.fkUserId, user.id))
    .where(eq(userFlow.fkFlowId, flowId))
    .groupBy(user.phone, user.studentId, user.name, user.id)
    .orderBy(desc(sum(userPoint.points)));

  return examResult;
};
