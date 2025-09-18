'use server';
import { db } from '@/db/drizzle';
import { problem } from '@/db/schema';
import { problemType } from '@/types/problem';
import { asc, eq, InferSelectModel } from 'drizzle-orm';

export const useProblems = async (flowStepId: number): Promise<InferSelectModel<typeof problem>[]> => {
  const problems = await db
    .select()
    .from(problem)
    .orderBy(asc(problem.title))
    .where(eq(problem.fkFlowStepId, flowStepId));
  return problems;
};

export const useProblemList = async (flowStepId: number): Promise<problemType> => {
  const problems = await db
    .select()
    .from(problem)
    .orderBy(asc(problem.title))
    .where(eq(problem.fkFlowStepId, flowStepId));
  const classedProblems: problemType = {};
  problems.forEach((problem) => {
    if (problem.fkFlowStepId in classedProblems) {
      classedProblems[problem.fkFlowStepId].push(problem);
    } else {
      classedProblems[problem.fkFlowStepId] = [problem];
    }
  });
  return classedProblems;
};
