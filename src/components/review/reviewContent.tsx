'use client';
import { Input } from '../ui/input';
import getProbList from './getProbList';
import { useEffect, useState } from 'react';
interface ReviewDialogProps {
  task: string;
}
interface ReviewDialogProps {
  name: string;
  id: number;
  maxScore: number;
}
const ReviewContent: React.FC = () => {
  const task = localStorage.getItem('task');
  const [probList, setProbList] = useState<ReviewDialogProps[]>([]);
  if (task && parseInt(task) === 0) {
    return (
      <div>
        <text>请先选择阅卷范围</text>
      </div>
    );
  }

  useEffect(() => {
    if (probList)
      getProbList(parseInt(task ?? '0')).then((probList) => {
        if (probList.length === 0) {
          return;
        }
        setProbList(probList as ReviewDialogProps[]);
      });
   }, [task]);

  return probList.map((prob: ReviewDialogProps) => {
    if (localStorage.getItem(task ?? '' + prob.id)) return;
    <div className="mt-3 flex-row">
      <text>{prob.name + localStorage.getItem(task ?? '' + prob.id)}</text>
      <Input
        className=""
        id={prob.id.toString()}
        placeholder={'满分' + prob.maxScore + '分'}
      />
    </div>;
    return null;
  });
};

export default ReviewContent;
