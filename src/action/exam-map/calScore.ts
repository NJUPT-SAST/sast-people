'use server';
import { db } from '@/db/drizzle';
// TODO: v2 db import { examMap, flowStep, flow, user, problem, step } from '@/db/schema';
import { and, desc, eq, sum } from 'drizzle-orm';

// TODO: v2 db 
// export const calScore = async (flowTypeID: number) => {
//   const examResult = await db
//     .select({
//       uid: user.id,
//       name: user.name,
//       studentId: user.studentId,
//       phoneNumber: user.phone,
//       totalScore: sum(examMap.score),
//       stepId: step.id,
//     })
//     .from(examMap)
//     .innerJoin(flowStep, eq(examMap.flowStepId, flowStep.id))
//     .innerJoin(flow, eq(flow.id, flowStep.flowId))
//     .innerJoin(problem, eq(examMap.problemId, problem.id))
//     // TODO: v2 db .innerJoin(user, eq(flow.userId, user.id))
//     .innerJoin(
//       step,
//       and(eq(problem.stepId, step.id), eq(step.flowTypeId, flowTypeID)),
//     )
//     .groupBy(
//       problem.stepId,
//       user.phone,
//       user.studentId,
//       user.name,
//       user.id,
//       flowStep.id,
//       step.id,
//     )
//     .orderBy(desc(sum(examMap.score)));

//   return examResult;
// };
