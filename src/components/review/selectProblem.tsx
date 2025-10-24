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
import { useProblems } from '@/hooks/useProblemList';
import { displayProblemType, selectProbSchema, selectProbType } from '@/types/problem';
import { displayUserFlow } from '@/types/userflow';
import { toast } from 'sonner';
import { useLocalProblemList } from '@/hooks/useLocalProblemList';
import { useStepWithProblem } from '@/hooks/useStepWithProblem';

const SelectProblem = ({
  flowList,
}: { flowList: Partial<displayUserFlow>[] }) => {
  const [probList, setProbList] = useState<displayProblemType[] | null>(null);
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

  const handleSelectChange = async (flowId: string) => {
    setSelectedFlow(flowId);
    const flowSteps = await useStepWithProblem(parseInt(flowId));
    if (!flowSteps) {
      return;
    }
    setStepId(flowSteps.stepWithProblemId || 0);
    const probList = await useProblems(flowSteps.stepWithProblemId || 0);
    setProbList(probList);
    setSelectedProbs([]);
  };

  const handleUpdateStorageProbs = () => {
    const res = selectProbSchema.safeParse({
      flowTypeId: parseInt(selectedFlow),
      stepId: stepId,
      problemList: selectedProbs,
    });
    if (res.success) {
      localStorage.setItem('people_selectedProbs', JSON.stringify(res.data));
      window.dispatchEvent(new Event('reviewRangeUpdated'));
      toast.success('保存成功');
    } else {
      localStorage.removeItem('people_selectedProbs');
      toast.error('保存失败');
    }
  };

  return (
    <div className="mt-3 flex-row">
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="请选择试卷" />
        </SelectTrigger>
        <SelectContent>
          {flowList.map((flow) => (
            <SelectItem key={flow.id} value={flow?.id?.toString() || ''}>
              {flow.title}
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
