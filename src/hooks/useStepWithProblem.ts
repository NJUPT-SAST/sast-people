'use server';
import { db } from '@/db/drizzle';
import { problem, steps } from '@/db/schema';
import { count, eq, sql } from 'drizzle-orm';

export const useStepWithProblem = async (flowTypeId: number) => {
  // Join steps with problems and get count of problems for each step in one query
  const stepList = await db
    .select({
      id: steps.id,
      name: steps.name,
      description: steps.description,
      flowTypeId: steps.flowTypeId,
      order: steps.order,
      label: steps.label,
      problemCount: sql<number>`COUNT(${problem.id})`,
    })
    .from(steps)
    .leftJoin(problem, eq(problem.stepId, steps.id))
    .where(eq(steps.flowTypeId, flowTypeId))
    .groupBy(steps.id);

  // Find the first step with a problem count greater than 0
  const stepWithProblem = stepList.find(step => step.problemCount > 0);

  console.log(stepList, stepWithProblem);
  return {
    stepList,
    stepWithProblemId: stepWithProblem ? stepWithProblem.id : null,
  };
};
