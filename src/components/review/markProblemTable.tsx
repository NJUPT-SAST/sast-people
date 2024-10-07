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

export const MarkProblemTable = ({
  points,
  flowStepId,
}: {
  points: Array<insertExamMapType>;
  flowStepId: number;
}) => {
  const studentId = useSearchParams().get('user');

  const [problemPoints, setProblemPoints] = useState<Array<insertExamMapType>>([]);
  const problems = useLocalProblemList();
  useEffect(() => {
    const problemPoints: Array<insertExamMapType> = [];
    console.log('points', points);
    console.log('problems', problems);
    problems.forEach(e => {
      const index = points.findIndex(p => p.problemId === e.id);
      console.log('index', index);
      if (index <= 0) {
        // problemPoints.push({
        //   flowStepId,
        //   problemId: e.id,
        //   score: 0,
        //   judgerId: 0,
        //   judgeTime: new Date(),
        // });
      }
    });
    if (problemPoints.length > 0) {
      setProblemPoints(problemPoints);
    };
  });


  const handleSave = () => {
    batchUpsert(points);
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
              onClick={() => {
                handleSave();
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
                  {problems[index].name}
                </legend>
                <div className="flex flex-col gap-2">
                  <div>
                    <Label htmlFor={`problem-maxScore-${problems[index].id}`}>
                      得分
                    </Label>
                    <Input
                      id={`problem-maxScore-${problems[index].id}`}
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
                      onClick={() => handleUpdate(index, problemPoints[index].score)}
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
