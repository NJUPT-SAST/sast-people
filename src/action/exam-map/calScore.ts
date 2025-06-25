'use server';
import { db } from '@/db/drizzle';
import { examMap, flowStep, flow, user, problem, step } from '@/db/schema';
import { and, desc, eq, sum } from 'drizzle-orm';

export const calScore = async (flowTypeID: number) => {
  const examResult = await db
    .select({
      uid: user.id,
      name: user.name,
      studentId: user.studentId,
      phoneNumber: user.phoneNumber,
      totalScore: sum(examMap.score),
      stepId: step.id,
    })
    .from(examMap)
    .innerJoin(flowStep, eq(examMap.flowStepId, flowStep.id))
    .innerJoin(flow, eq(flow.id, flowStep.flowId))
    .innerJoin(problem, eq(examMap.problemId, problem.id))
    .innerJoin(user, eq(flow.uid, user.id))
    .innerJoin(
      step,
      and(eq(problem.stepId, step.id), eq(step.flowTypeId, flowTypeID)),
    )
    .groupBy(
      problem.stepId,
      user.phoneNumber,
      user.studentId,
      user.name,
      user.id,
      flowStep.id,
      step.id,
    )
    .orderBy(desc(sum(examMap.score)));

  return examResult;
};
