'use server';
import { db } from '@/db/drizzle';
import { flow, flowStep, user } from '@/db/schema';
import { verifyRole } from '@/lib/dal';
import { eq } from 'drizzle-orm';

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
    .where(eq(user.id, flow.uid))
    .then(res => {
      console.log(res);
      return res[0]?.flowStepId;
    });
    // .where(eq(user.studentId, studentId))
    // .innerJoin(flow, eq(user.id, flow.uid))
    // .innerJoin(flowStep, eq(flow.currentStepId, flowStep.stepId), )
    // .then(res => {
    //   console.log(res);
    //   return res[0]?.flowStepId;
    // });

  if (!flowStepId) {
    throw new Error('您还没有报名流程');
  }

  return flowStepId;
};