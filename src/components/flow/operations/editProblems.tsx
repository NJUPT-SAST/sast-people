"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, PlusIcon, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProblems } from "@/action/flow/problem/edit";
import { toast } from "sonner";

type Problem = {
  id: number;
  title: string;
  score: number;
  fkFlowStepId: number;
};

const EditProblems = ({
  problems,
  stepList,
  currentStepId,
  flowTypeId,
}: {
  problems: Problem[];
  stepList: {
    id: number;
    title: string;
    description: string | null;
    fkFlowId: number;
    order: number;
    problemCount: number;
  }[];
  currentStepId: number;
  flowTypeId: number;
}) => {
  const [localProblems, setLocalProblems] = useState<Problem[]>(problems);
  const [currentStep, setCurrentStep] = useState(currentStepId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addProblem = () => {
    const newProblem: Problem = {
      id: -Date.now(), // 使用负数作为临时ID
      title: "新题目",
      score: 0,
      fkFlowStepId: currentStep,
    };
    setLocalProblems((prev) => [...prev, newProblem]);
  };

  const updateProblem = (problemId: number, updates: Partial<Problem>) => {
    setLocalProblems((prev) =>
      prev.map((p) => (p.id === problemId ? { ...p, ...updates } : p))
    );
  };

  const duplicateProblem = (index: number) => {
    const problem = localProblems[index];
    const newProblem: Problem = {
      ...problem,
      id: -Date.now(), // 使用负数作为临时ID
      title: problem.title.replace(/\d+/, (match) => String(Number(match) + 1)),
    };
    setLocalProblems((prev) => [
      ...prev.slice(0, index + 1),
      newProblem,
      ...prev.slice(index + 1),
    ]);
  };

  const deleteProblem = (problemId: number) => {
    setLocalProblems((prev) => prev.filter((p) => p.id !== problemId));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    // 转换为原有的problemType格式以兼容现有的updateProblems函数
    const problemsForSave = {
      default: localProblems.map((problem) => ({
        id: problem.id,
        title: problem.title,
        score: problem.score,
        fkFlowStepId: currentStep,
      })),
    };

    toast.promise(
      updateProblems(currentStep, problemsForSave, flowTypeId).finally(() => {
        setIsSubmitting(false);
      }),
      {
        loading: "正在保存问题...",
        success: "问题已成功保存",
        error: "保存问题时出错",
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Select
          value={currentStep.toString()}
          onValueChange={(value) => setCurrentStep(Number(value))}
          disabled={isSubmitting}
        >
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="选择步骤" />
          </SelectTrigger>
          <SelectContent>
            {stepList.map((step) => (
              <SelectItem key={step.id} value={step.id.toString()}>
                {step.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="space-x-2 flex items-center">
          <Button
            onClick={addProblem}
            variant="outline"
            disabled={isSubmitting}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            添加题目
          </Button>
          <Button
            onClick={handleSave}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            保存 <Save className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>题目列表</CardTitle>
          <CardDescription>{localProblems.length} 道题目</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localProblems.map((problem, index) => (
              <fieldset key={problem.id} className="border p-4 rounded-lg">
                <legend className="px-2 text-sm font-medium text-muted-foreground">
                  {problem.title || "新题目"}
                </legend>
                <div className="flex flex-col gap-2">
                  <div>
                    <Label htmlFor={`problem-name-${problem.id}`}>
                      题目名称
                    </Label>
                    <Input
                      id={`problem-name-${problem.id}`}
                      value={problem.title}
                      onChange={(e) =>
                        updateProblem(problem.id, {
                          title: e.target.value,
                        })
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`problem-maxScore-${problem.id}`}>
                      最高分数
                    </Label>
                    <Input
                      id={`problem-maxScore-${problem.id}`}
                      type="number"
                      value={problem.score}
                      onChange={(e) =>
                        updateProblem(problem.id, {
                          score: Number(e.target.value),
                        })
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => duplicateProblem(index)}
                      disabled={isSubmitting}
                      title="复制题目"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => deleteProblem(problem.id)}
                      disabled={isSubmitting}
                      title="删除题目"
                    >
                      <Trash2 className="w-4 h-4" />
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

export { EditProblems };
