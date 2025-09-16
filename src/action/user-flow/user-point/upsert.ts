import { db } from "@/db/drizzle";
import { userPoint } from "@/db/schema";
import { verifyRole, verifySession } from "@/lib/dal";

export const upsertPoint = async (userFlowId: number, problemId: number, point: number) => {
  await verifyRole(1);

  await db.insert(userPoint).values({
    fkUserFlowId: userFlowId,
    fkProblemId: problemId,
    points: point,
  }).onConflictDoUpdate({
    target: [userPoint.fkUserFlowId, userPoint.fkProblemId],
    set: {
      points: point,
    },
  });
};