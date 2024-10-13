'use server';
import { db } from '@/db/drizzle';
import { examMap, flowStep, flow, user } from '@/db/schema';
import { and, eq, sum } from 'drizzle-orm';

export const calScore = async (flowTypeID: number) => {
  const examResult = await db
    .select({ flowStepId: examMap.flowStepId, totalScore: sum(examMap.score), uid: flow.uid, name:  user.name, studentId: user.studentId })
    .from(examMap)
    .innerJoin(flowStep, eq(examMap.flowStepId, flowStep.id))
    .innerJoin(flow, and(eq(flow.id, flowStep.flowId), eq(flow.flowTypeId, flowTypeID)))
    .innerJoin(user, eq(flow.uid, user.id))
    .groupBy(examMap.flowStepId, flow.uid, user.studentId, user.name, user.studentId)

  console.log(examResult);

  return examResult;
};
