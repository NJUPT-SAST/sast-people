"use server";

import { db } from "@/db/drizzle";
import { problem } from "@/db/schema";
import { verifyRole } from "@/lib/dal";
import { problemType } from "@/types/problem";
import { eq, and, notInArray, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// 定义问题类型
type ProblemType = typeof problem.$inferInsert;

export const updateProblems = async (
  stepId: number,
  problems: problemType,
  flowTypeId: number
) => {
  await verifyRole(1);

  // 获取当前步骤的所有问题
  const existingProblems = await db
    .select()
    .from(problem)
    .where(eq(problem.stepId, stepId));

  // 准备新的问题列表
  const newProblems = Object.entries(problems).flatMap(
    ([category, categoryProblems]) =>
      categoryProblems.map((p) => ({
        id: p.id,
        stepId,
        class: category,
        name: p.name,
        maxScore: p.maxScore,
      }))
  );

  // 找出需要更新的现有问题
  const problemsToUpdate = newProblems.filter((p) =>
    existingProblems.some((ep) => ep.id === p.id)
  );

  // 批量更新现有问题
  for (const p of problemsToUpdate) {
    await db
      .update(problem)
      .set({ stepId, class: p.class, name: p.name, maxScore: p.maxScore })
      .where(eq(problem.id, p.id));
  }

  // 找出需要插入的新问题
  const problemsToInsert = newProblems
    .filter((p) => p.id < 0)
    .map(({ id, ...rest }) => rest); // 移除 id 字段

  // 插入新问题并获取插入后的问题（包括新的 ID）
  let insertedProblems: ProblemType[] = [];
  if (problemsToInsert.length > 0) {
    insertedProblems = await db
      .insert(problem)
      .values(problemsToInsert)
      .returning();
    console.log("插入的新问题：", insertedProblems);
  }

  // 更新其他步骤中的问题
  const existingProblemIds = newProblems
    .map((p) => p.id)
    .filter((id) => id > 0);
  await db
    .update(problem)
    .set({ stepId })
    .where(
      and(
        inArray(problem.id, existingProblemIds),
        notInArray(problem.stepId, [stepId])
      )
    );

  // 删除不再存在的问题
  const problemIdsToKeep = [
    ...newProblems.map((p) => p.id).filter((id) => id > 0),
    ...insertedProblems.map((p) => p.id),
  ];
  await db
    .delete(problem)
    .where(
      and(
        eq(problem.stepId, stepId),
        notInArray(problem.id, problemIdsToKeep as number[])
      )
    );

  revalidatePath(`/dashboard/flow-types/edit-exam?id=${flowTypeId}`);
};
