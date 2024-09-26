"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/db/drizzle";
import { flowType, problem, steps } from "@/db/schema";
import { flowTypeType } from "@/types/flowType";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import getProbList from "./getProbList";
import ProbCheckBox from "./probCheckBox";
import { useStepWithProblem } from "@/hooks/useStepWithProblem";
import { useProblemList } from "@/hooks/useProblemList";
import { problemType } from "@/types/problem";

interface SelectProblemProps {
  flow: any;
}
const SelectProblem: React.FC<SelectProblemProps> = ({ flow }) => {
  const [selectedFlow, setSelectedFlow] = useState<number>(0);
  const handleSelectChange = (value: string) => {
    setSelectedFlow(value ? parseInt(value) : 0);
  };
  const [probList, setProbList] = useState<problemType | null>(null);

  useEffect(() => {
    localStorage.setItem("task", selectedFlow.toString());
    const getProbListAsync = async (selectedFlow: number) => {
      const { stepWithProblemId } = await useStepWithProblem(selectedFlow);
      if (!stepWithProblemId) {
        return;
      }
      const probList = await useProblemList(stepWithProblemId);
      setProbList(probList);
    };
    getProbListAsync(selectedFlow);
  }, [selectedFlow]);

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
        <ProbCheckBox probList={probList} task={selectedFlow.toString()} />
      ) : null}
    </div>
  );
};
export default SelectProblem;
