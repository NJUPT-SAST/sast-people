'use server';
import { db } from '@/db/drizzle';
import { problem } from '@/db/schema';
import { asc, eq, InferSelectModel } from 'drizzle-orm';

export const useProblems = async (flowStepId: number): Promise<InferSelectModel<typeof problem>[]> => {
  const problems = await db
    .select()
    .from(problem)
    .orderBy(asc(problem.title))
    .where(eq(problem.fkFlowStepId, flowStepId));
  return problems;
};
