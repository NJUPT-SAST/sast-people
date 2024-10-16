'use client';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { insertExamMapType } from '@/types/examMap';
import { batchUpsert } from '@/action/exam-map/batchUpsert';
import { upsert } from '@/action/exam-map/upsert';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { RefreshCw, Save } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useLocalProblemList } from '@/hooks/useLocalProblemList';
import { toast } from 'sonner';

export const MarkProblemTable = ({
  points,
  flowStepId,
}: {
  points: Array<insertExamMapType>;
  flowStepId: number;
}) => {
  const studentId = useSearchParams().get('user');

  const [problemPoints, setProblemPoints] =
    useState<Array<insertExamMapType>>(points);
  const problems = useLocalProblemList();
  useEffect(() => {
    const newProblemPoints: Array<insertExamMapType> = [];
    problems.forEach((e) => {
      const index = points.findIndex((p) => p.problemId === e.id);
      newProblemPoints.push({
        flowStepId,
        problemId: e.id,
        score: index === -1 ? 0 : points[index].score,
        judgerId: 0,
        judgeTime: new Date(),
      });
    });
    if (newProblemPoints.length > 0) {
      setProblemPoints(newProblemPoints);
    }
  }, [problems]);

  const handleSave = (problemPoints: Array<insertExamMapType>) => {
    toast.promise(batchUpsert(problemPoints), {
      loading: '保存中...',
      success: '保存成功',
      error: '保存失败',
    });
  };

  const handleUpdate = (index: number, score: number) => {
    toast.promise(upsert(flowStepId, problems[index].id, score, new Date()), {
      loading: '更新中...',
      success: '更新成功',
      error: '更新失败',
    });
  };

  return (
    <div className="space-x-2">
      <Card key={flowStepId}>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <p>正在批改：{studentId}</p>
            <Button
              size="sm"
              onClick={async () => {
                for( let i = 0; i < problemPoints.length; i++) {
                  if (problemPoints[i].score < 0 || problemPoints[i].score > problems[i]?.maxPoint) {
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
                      // min={0}
                      value={problemPoint.score}
                      onChange={(e) => {
                        const newProblemPoints = [...problemPoints];
                        newProblemPoints[index].score = Number(e.target.value);
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
                          if (problemPoints[index].score < 0 || problemPoints[index].score > problems[index]?.maxPoint) 
                            toast.error(`更新失败，${problems[index]?.name}的得分必须在0到${problems[index]?.maxPoint}之间！`);
                          else {
                            handleUpdate(index, problemPoints[index].score)
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
