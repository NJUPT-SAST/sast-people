'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { problemType } from '@/types/problem';
import { Copy, Edit, PlusIcon, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryDialog } from './categoryDialog';
import { stepType } from '@/types/step';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { steps } from '@/db/schema';
import type { InferSelectModel } from 'drizzle-orm';
import { updateProblems } from '@/action/flow-type/problem/edit';
import { toast } from 'sonner';

const EditProblems = ({
  problems,
  stepList,
  currentStepId,
  flowTypeId,
}: {
  problems: problemType;
  stepList: InferSelectModel<typeof steps>[];
  currentStepId: number;
  flowTypeId: number;
}) => {
  const [localProblems, setLocalProblems] = useState(problems);
  const [currentStep, setCurrentStep] = useState(currentStepId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addProblem = (category: string) => {
    setLocalProblems((prev) => {
      const existingProblems = prev[category] || [];
      return {
        ...prev,
        [category]: [
          ...existingProblems,
          {
            id: -Date.now(), // 使用负数作为临时ID
            name: '新题目',
            maxScore: 0,
            class: category,
            stepId: currentStep,
          },
        ],
      };
    });
  };

  const deleteCategory = (category: string) => {
    setLocalProblems((prev) => {
      const newProblems = { ...prev };
      delete newProblems[category];
      return newProblems;
    });
  };

  const updateProblem = (
    category: string,
    problemId: number,
    updates: Partial<problemType[string][number]>,
  ) => {
    setLocalProblems((prev) => ({
      ...prev,
      [category]: prev[category].map((p) =>
        p.id === problemId ? { ...p, ...updates } : p,
      ),
    }));
  };

  const duplicateProblem = (category: string, index: number) => {
    const problem = localProblems[category][index];
    const newProblem = {
      ...problem,
      id: -Date.now(), // 使用负数作为临时ID
      name: problem.name.replace(/\d+/, (match) => String(Number(match) + 1)),
    };
    setLocalProblems((prev) => ({
      ...prev,
      [category]: [
        ...prev[category].slice(0, index + 1),
        newProblem,
        ...prev[category].slice(index + 1),
      ],
    }));
  };

  const deleteProblem = (category: string, problemId: number) => {
    setLocalProblems((prev) => ({
      ...prev,
      [category]: prev[category].filter((p) => p.id !== problemId),
    }));
  };

  const addCategory = (newCategory: string) => {
    if (newCategory && !localProblems[newCategory]) {
      setLocalProblems((prev) => ({
        ...prev,
        [newCategory]: [],
      }));
    }
  };

  const editCategory = (oldCategory: string, newCategory: string) => {
    if (
      newCategory &&
      newCategory !== oldCategory &&
      !localProblems[newCategory]
    ) {
      setLocalProblems((prev) => {
        const { [oldCategory]: problemsToMove, ...rest } = prev;
        return {
          ...rest,
          [newCategory]: problemsToMove,
        };
      });
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    toast.promise(
      updateProblems(currentStep, localProblems, flowTypeId).finally(() => {
        setIsSubmitting(false);
      }),
      {
        loading: '正在保存问题...',
        success: '问题已成功保存',
        error: '保存问题时出错',
      },
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
                {step.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="space-x-2">
          <CategoryDialog
            onSubmit={addCategory}
            title="添加新的题目分类"
            description="请输入新的题目分类名称。"
            submitText="确认添加"
          />
          <Button
            onClick={handleSave}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            保存 <Save className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {Object.entries(localProblems).map(([category, problems]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                {category}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="m-0"
                    onClick={() => addProblem(category)}
                    disabled={isSubmitting}
                  >
                    <PlusIcon size={18} />
                  </Button>
                  <CategoryDialog
                    onSubmit={(newCategory: string) =>
                      editCategory(category, newCategory)
                    }
                    initialCategory={category}
                    title="编辑题目分类"
                    description="请输入新的题目分类名称。"
                    submitText="确认修改"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="m-0"
                    onClick={() => deleteCategory(category)}
                    disabled={isSubmitting}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>{problems.length} 道题目</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {problems.map((problem, index) => (
                  <fieldset key={problem.id} className="border p-4 rounded-lg">
                    <legend className="px-2 text-sm font-medium text-muted-foreground">
                      {problem.name || '新题目'}
                    </legend>
                    <div className="flex flex-col gap-2">
                      <div>
                        <Label htmlFor={`problem-name-${problem.id}`}>
                          题目名称
                        </Label>
                        <Input
                          id={`problem-name-${problem.id}`}
                          value={problem.name}
                          onChange={(e) =>
                            updateProblem(category, problem.id, {
                              name: e.target.value,
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
                          value={problem.maxScore}
                          onChange={(e) =>
                            updateProblem(category, problem.id, {
                              maxScore: Number(e.target.value),
                            })
                          }
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => duplicateProblem(category, index)}
                          disabled={isSubmitting}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => deleteProblem(category, problem.id)}
                          disabled={isSubmitting}
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
        ))}
      </div>
    </div>
  );
};

export { EditProblems };
