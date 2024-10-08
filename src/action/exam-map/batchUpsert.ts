'use server';
import { db } from '@/db/drizzle';
import { sql } from 'drizzle-orm';
import { examMap } from '@/db/schema';
import { verifyRole } from '@/lib/dal';
import { insertExamMapType } from '@/types/examMap';

export const batchUpsert = async (values: Array<insertExamMapType>) => {
  const adjudicatorId = (await verifyRole(1)).uid;
  values.forEach(e => {
    e.judgerId = adjudicatorId;
  });
  await db
    .insert(examMap)
    .values(values)
    .onConflictDoUpdate({
      target: [examMap.flowStepId, examMap.problemId],
      set: {
        score: sql.raw('excluded.score'),
        judgerId: sql.raw('excluded.judger_id'),
        judgeTime: sql.raw('excluded.judge_time'),
      },
    });
}