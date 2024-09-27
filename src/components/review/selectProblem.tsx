"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ProbCheckBox from "./probCheckBox";
import { useStepWithProblem } from "@/hooks/useStepWithProblem";
import { useProblemList } from "@/hooks/useProblemList";
import { problemType } from "@/types/problem";

interface SelectProblemProps {
  flow: any;
}
const SelectProblem: React.FC<SelectProblemProps> = ({ flow }) => {
  const [probList, setProbList] = useState<problemType | null>(null);
  const [selectedProbs, setSelectedProbs] = useState<string[]>([]);

  const handleSelectChange = async (value: string) => {
    const { stepWithProblemId } = await useStepWithProblem(Number(value));
    if (!stepWithProblemId) {
      return;
    }
    const probList = await useProblemList(stepWithProblemId);
    setProbList(probList);
  };

  return (
    <div className="mt-3 flex-row">
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="请选择试卷" />
        </SelectTrigger>
        <SelectContent>
          {flow.map(
            (flow: {
              id: number;
              name: string;
              isDeleted: boolean | null;
              createdAt: Date;
              updatedAt: Date;
              description: string | null;
              createBy: number;
            }) => (
              <SelectItem key={flow.id} value={flow.id.toString()}>
                {flow.name}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
      {probList ? (
        <ProbCheckBox
          probList={probList}
          selectedProbs={selectedProbs}
          setSelectedProbs={setSelectedProbs}
        />
      ) : null}
    </div>
  );
};
export default SelectProblem;
