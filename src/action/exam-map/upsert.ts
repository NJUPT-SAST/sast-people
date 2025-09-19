'use server';
import { db } from '@/db/drizzle';
import { userPoint } from '@/db/schema';
import { verifyRole } from '@/lib/dal';

export const upsert = async (
  userFlowId: number,
  fkProblemId: number,
  score: number,
  judgeTime: Date,
) => {
  const adjudicatorName = (await verifyRole(1)).name;
  console.log(adjudicatorName, "upsert", userFlowId, fkProblemId, score, judgeTime);

  await db
    .insert(userPoint)
    .values({
      fkUserFlowId: userFlowId,
      fkProblemId: fkProblemId,
      points: score,
    })
    .onConflictDoUpdate({
      target: [userPoint.fkUserFlowId, userPoint.fkProblemId],
      set: {
        points: score,
      },
    });
}