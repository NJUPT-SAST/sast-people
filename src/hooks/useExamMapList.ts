"use server";
import { db } from '@/db/drizzle';
import { examMap } from '@/db/schema';
import { insertExamMapType } from '@/types/examMap';
import { desc, eq } from "drizzle-orm";

export const useExamMapList = async (flowStepId: number): Promise<Array<insertExamMapType>> => {
  const examMaps = await db
    .select()
    .from(examMap)
    .where(eq(examMap.flowStepId, flowStepId))
    .orderBy(desc(examMap.problemId));
  return examMaps;
};