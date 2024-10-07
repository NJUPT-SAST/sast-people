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

  const [problemPoints, setProblemPoints] = useState<Array<insertExamMapType>>(points);
  const problems = useLocalProblemList();
  useEffect(() => {
    if (problems.length === problemPoints.length) {
      return;
    }
    const newProblemPoints: Array<insertExamMapType> = [];
    problems.forEach(e => {
      const index = points.findIndex(p => p.problemId === e.id);
      newProblemPoints.push({
        flowStepId,
        problemId: e.id,
        score: index === -1 ? 0 : points[index].score,
        judgerId: 0,
        judgeTime: new Date(),
      })
    });
    if (newProblemPoints.length > 0) {
      setProblemPoints(newProblemPoints);
    };
  });


  const handleSave = async () => {
    await batchUpsert(points);
  };

  const handleUpdate = (index: number, score: number) => {
    console.log('update', index, score);
    upsert(flowStepId, problems[index].id, score, new Date());
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
                try {
                  await handleSave();
                  toast.success('已保存所有得分');
                }
                catch (e) {
                  toast.error('保存失败，请重试！');
                }
              }}
            >
              保存 <Save className="w-4 h-4 ml-2" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {problemPoints.map((problemPoint, index) => (
              <fieldset key={index} className="border p-4 rounded-lg">
                <legend className="px-2 text-sm font-medium text-muted-foreground">
                  {problems[index]?.name}
                </legend>
                <div className="flex flex-col gap-2">
                  <div>
                    <Label htmlFor={`problem-maxScore-${problems[index]?.id}`}>
                    得分 (满分{problems[index]?.maxPoint}分)
                    </Label>
                    <Input
                      id={`problem-maxScore-${problems[index]?.id}`}
                      type="number"
                      value={problemPoint.score}
                      onChange={(e) => {
                        console.log(e.target.value);
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
                            toast.success(`已更新 ${problems[index]?.name} 的得分`);
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
