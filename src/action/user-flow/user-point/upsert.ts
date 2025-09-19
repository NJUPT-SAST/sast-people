import { db } from "@/db/drizzle";
import { userPoint } from "@/db/schema";
import { verifyRole, verifySession } from "@/lib/dal";
import { InferInsertModel, sql } from "drizzle-orm";

export const upsertPoint = async (userFlowId: number, problemId: number, point: number) => {
  await verifyRole(1);
  const user = await verifySession();
  console.log(user.name, "upsertPoint", userFlowId, problemId, point);

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

export const batchUpsertPoint = async (values: Array<InferInsertModel<typeof userPoint>>) => {
  await verifyRole(1);
  const user = await verifySession();
  console.log(user.name, "batchUpsertPoint", values);

  await db.insert(userPoint).values(values).onConflictDoUpdate({
    target: [userPoint.fkUserFlowId, userPoint.fkProblemId],
    set: {
      points: sql`excluded.points`
    },
  });

};