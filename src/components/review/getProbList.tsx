'use server';
import { db } from '@/db/drizzle';
import { problem, step } from '@/db/schema';
import { eq } from 'drizzle-orm';

const getProbList = async (selectedFlow: number) => {
  try {
    const stepId = await db
      .select()
      .from(step)
      .where(eq(step.flowTypeId, selectedFlow));
    if (stepId.length === 0) {
      return [];
    }

    return await db
      .select()
      .from(problem)
      .where(eq(problem.stepId, stepId[0].id))
      .orderBy(problem.name);
  } catch (e) {
    console.error(e);
    return [{}];
  }
};
export default getProbList;
