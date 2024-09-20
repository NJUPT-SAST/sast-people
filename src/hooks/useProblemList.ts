import { db } from '@/db/drizzle';
import { problem } from '@/db/schema';
import { problemType } from '@/types/problem';
import { asc, eq } from 'drizzle-orm';

export const useProblemList = async (stepId: number): Promise<problemType> => {
  const problems = await db
    .select()
    .from(problem)
    .orderBy(asc(problem.name))
    .where(eq(problem.stepId, stepId));
  const classedProblems: problemType = {};
  problems.forEach((problem) => {
    if (problem.class in classedProblems) {
      classedProblems[problem.class].push(problem);
    } else {
      classedProblems[problem.class] = [problem];
    }
  });
  return classedProblems;
};
