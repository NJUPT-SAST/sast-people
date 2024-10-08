'use server';
import { db } from '@/db/drizzle';
import { examMap } from '@/db/schema';
import { verifyRole } from '@/lib/dal';

export const upsert = async (
  flowStepId: number,
  problemId: number,
  score: number,
  judgeTime: Date,
) => {
  console.log("upsert", flowStepId, problemId, score, judgeTime);

  const adjudicatorId = (await verifyRole(1)).uid;
  await db
    .insert(examMap)
    .values({
      flowStepId: flowStepId,
      problemId: problemId,
      score: score,
      judgerId: adjudicatorId,
      judgeTime: judgeTime,
    })
    .onConflictDoUpdate({
      target: [examMap.flowStepId, examMap.problemId],
      set: {
        score: score,
        judgerId: adjudicatorId,
        judgeTime: judgeTime,
      },
    });
}