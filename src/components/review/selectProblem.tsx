'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import ProbCheckBox from './probCheckBox';
import { useStepWithProblem } from '@/hooks/useStepWithProblem';
import { useProblemList } from '@/hooks/useProblemList';
import { problemType, selectProbSchema, selectProbType } from '@/types/problem';
import { Button } from '../ui/button';
import { z } from 'zod';
import { flowTypeType } from '@/types/flowType';
import { toast } from 'sonner';
import { useLocalProblemList } from '@/hooks/useLocalProblemList';

const SelectProblem = ({
  flowTypes,
}: { flowTypes: Partial<flowTypeType>[] }) => {
  const [probList, setProbList] = useState<problemType | null>(null);
  const [selectedProbs, setSelectedProbs] = useState<
    selectProbType['problemList']
  >([]);
  const [selectedFlow, setSelectedFlow] = useState<string>('');
  const [stepId, setStepId] = useState<number>();
  const initialProbs = useLocalProblemList();

  useEffect(() => {
    if (initialProbs) {
      setSelectedProbs(initialProbs);
    }
  }, [initialProbs]);

  const handleSelectChange = async (value: string) => {
    setSelectedFlow(value);
    const { stepWithProblemId } = await useStepWithProblem(Number(value));
    if (!stepWithProblemId) {
      return;
    }
    setStepId(stepWithProblemId);
    const probList = await useProblemList(stepWithProblemId);
    setProbList(probList);
  };

  const handleUpdateStorageProbs = () => {
    const res = selectProbSchema.safeParse({
      flowTypeId: parseInt(selectedFlow),
      stepId: stepId,
      problemList: selectedProbs,
    });
    if (res.success) {
      localStorage.setItem('people_selectedProbs', JSON.stringify(res.data));
      toast.success('保存成功');
    } else {
      localStorage.removeItem('people_selectedProbs');
      toast.error('保存失败');
    }
  };

  return (
    <div className="mt-3 flex-row">
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="请选择试卷" />
        </SelectTrigger>
        <SelectContent>
          {flowTypes.map((flow) => (
            <SelectItem key={flow.id} value={flow?.id?.toString() || ''}>
              {flow.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {probList ? (
        <ProbCheckBox
          probList={probList}
          selectedProbs={selectedProbs}
          setSelectedProbs={setSelectedProbs}
          handleSave={handleUpdateStorageProbs}
        />
      ) : null}
    </div>
  );
};
export default SelectProblem;
