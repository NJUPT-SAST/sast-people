"use server";
import { db } from '@/db/drizzle';
import { userPoint } from '@/db/schema';
import { desc, eq, InferSelectModel } from "drizzle-orm";

export const useUserPointList = async (userFlowId: number): Promise<Array<InferSelectModel<typeof userPoint>>> => {
  const userPoints = await db
    .select()
    .from(userPoint)
    .where(eq(userPoint.fkUserFlowId, userFlowId))
    .orderBy(desc(userPoint.fkProblemId));
  return userPoints;
};