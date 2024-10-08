'use server';
import { db } from '@/db/drizzle';
import { flow, flowStep, user } from '@/db/schema';
import { verifyRole } from '@/lib/dal';
import { and, eq } from 'drizzle-orm';

export const useOngoingFlowStep = async (studentId: string) => {
  verifyRole(1);

  // 单条SQL查询获取flowStepId
  const flowStepId = await db
    .select({
      flowStepId: flowStep.id,
      uid: flow.uid,
    })
    .from(flow)
    .innerJoin(user, eq(user.studentId, studentId))
    .innerJoin(flowStep, eq(flow.currentStepId, flowStep.stepId))
    .where(and(eq(user.id, flow.uid), eq(flow.id, flowStep.flowId)))
    .then(res => {
      return res[0]?.flowStepId;
    });

  if (!flowStepId) {
    throw new Error('您还没有报名流程');
  }

  return flowStepId;
};