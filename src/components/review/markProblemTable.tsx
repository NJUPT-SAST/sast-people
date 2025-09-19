'use client';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { RefreshCw, Save } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useLocalProblemList } from '@/hooks/useLocalProblemList';
import { toast } from 'sonner';
import { userPoint } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export const MarkProblemTable = ({
  points,
  flowId,
}: {
  points: Array<InferSelectModel<typeof userPoint>>;
  flowId: number;
}) => {
  const studentId = useSearchParams().get('user');

  const [problemPoints, setProblemPoints] =
    useState<Array<InferSelectModel<typeof userPoint>>>(points);
  const problems = useLocalProblemList();
  useEffect(() => {
    const newProblemPoints: Array<InferSelectModel<typeof userPoint>> = [];
    problems.forEach((e) => {
      const index = points.findIndex((p) => p.fkProblemId === e.id);
      newProblemPoints.push({
        id: 0,
        fkUserFlowId: flowId,
        fkProblemId: e.id,
        points: index === -1 ? 0 : points[index].points,
      });
    });
    if (newProblemPoints.length > 0) {
      setProblemPoints(newProblemPoints);
    }
  }, [problems]);

  const batchUpsertPoint = async (values: Array<InferSelectModel<typeof userPoint>>) => {
    const response = await fetch('/api/user-point', {
      method: 'POST',
      body: JSON.stringify({
        action: 'batch',
        data: values,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '批量更新失败');
    }

    return response.json();
  };

  const upsertPoint = async (userFlowId: number, problemId: number, point: number) => {
    const response = await fetch('/api/user-point', {
      method: 'POST',
      body: JSON.stringify({
        action: 'single',
        data: { userFlowId, problemId, point },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '更新失败');
    }

    return response.json();
  };

  const handleSave = (problemPoints: Array<InferSelectModel<typeof userPoint>>) => {
    toast.promise(batchUpsertPoint(problemPoints), {
      loading: '保存中...',
      success: '保存成功',
      error: '保存失败',
    });
  };

  const handleUpdate = (index: number, score: number) => {
    toast.promise(upsertPoint(flowId, problems[index].id, score), {
      loading: '更新中...',
      success: '更新成功',
      error: '更新失败',
    });
  };

  return (
    <div className="space-x-2">
      <Card key={flowId}>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <p>正在批改：{studentId}</p>
            <Button
              size="sm"
              onClick={async () => {
                for( let i = 0; i < problemPoints.length; i++) {
                  if (problemPoints[i].points < 0 || problemPoints[i].points > problems[i]?.maxPoint) {
                    toast.error(`更新失败，${problems[i]?.name}的得分必须在0到${problems[i]?.maxPoint}之间！`);
                    return;
                  }
                }
                handleSave(problemPoints);
              }}
            >
              保存 <Save className="w-4 h-4 ml-2" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
            {problemPoints.map((problemPoint, index) => (
              <fieldset key={index} className="border p-4 rounded-lg w-full">
                <legend className="px-2 text-sm font-medium text-muted-foreground">
                  {problems[index]?.name}
                </legend>
                <div className="flex flex-col gap-2">
                  <div>
                    <Label htmlFor={`problem-maxScore-${problems[index]?.id}`}>
                    得分 (满分{problems[index]?.maxPoint}分)
                    </Label>
                    <Input
                      id={`problem-score-${problems[index]?.id}`}
                      type="number"
                      max={problems[index]?.maxPoint}
                      min={0}
                      value={problemPoint.points}
                      onChange={(e) => {
                        const newProblemPoints = [...problemPoints];
                        newProblemPoints[index].points = Number(e.target.value);
                        setProblemPoints(newProblemPoints);
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={
                        () => {
                          if (problemPoints[index].points < 0 || problemPoints[index].points > problems[index]?.maxPoint)
                            toast.error(`更新失败，${problems[index]?.name}的得分必须在0到${problems[index]?.maxPoint}之间！`);
                          else {
                            handleUpdate(index, problemPoints[index].points)
                          }
                        }
                      }
                    >
                      更新 <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </fieldset>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
