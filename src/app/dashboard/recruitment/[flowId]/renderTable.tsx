import { calScore } from '@/action/exam-map/calScore';
import { columns } from '@/components/recruitment/columns';
import { DataTable } from '@/components/recruitment/table';
import React from 'react';

export const RenderTable = async ({ flowId }: { flowId: string }) => {
  const data = await calScore(parseInt(flowId));
  console.log(data);
  return (
    <>
      <p className="text-muted-foreground">
        总人数：{data.length} &nbsp; 平均分：
        {(
          data.reduce(
            (acc: number, cur: any) =>
              acc + parseInt(cur.totalScore as unknown as string, 10),
            0,
          ) / data.length
        ).toFixed(2)}
      </p>
      <DataTable
        columns={columns}
        data={data}
        flowTypeId={parseInt(flowId)}
      />
    </>
  );
};
