'use server';
import { db } from '@/db/drizzle';
import { problem, step } from '@/db/schema';
import { count, eq, sql } from 'drizzle-orm';

export const useStepWithProblem = async (flowTypeId: number) => {
  // Join steps with problems and get count of problems for each step in one query
  const stepList = await db
    .select({
      id: step.id,
      name: step.name,
      description: step.description,
      flowTypeId: step.flowTypeId,
      order: step.order,
      label: step.label,
      problemCount: sql<number>`COUNT(${problem.id})`,
    })
    .from(step)
    .leftJoin(problem, eq(problem.stepId, step.id))
    .where(eq(step.flowTypeId, flowTypeId))
    .groupBy(step.id);

  // Find the first step with a problem count greater than 0
  const stepWithProblem = stepList.find(step => step.problemCount > 0);

  console.log(stepList, stepWithProblem);
  return {
    stepList,
    stepWithProblemId: stepWithProblem ? stepWithProblem.id : null,
  };
};
