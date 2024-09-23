import { db } from '@/db/drizzle';
import { problem, steps } from '@/db/schema';
import { count, eq } from 'drizzle-orm';

export const useStepWithProblem = async (flowTypeId: number) => {
  const stepList = await db
    .select()
    .from(steps)
    .where(eq(steps.flowTypeId, flowTypeId));

  let stepWithProblemId: number | null = null;

  for (const step of stepList) {
    const problemCount = await db
      .select({
        count: count(),
      })
      .from(problem)
      .where(eq(problem.stepId, step.id));

    if (problemCount[0].count > 0) {
      stepWithProblemId = step.id;
      break;
    }
  }

  return { stepList, stepWithProblemId };
};
