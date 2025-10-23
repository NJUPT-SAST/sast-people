'use client';
// import { batchUpdate } from '@/action/user-flow/edit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { fullFlowSchema } from '@/components/flow/add';
import { fullStepType } from '@/types/step';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, Navigation, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { updateFlowStep } from '@/action/flow/flow-step/update';
import { updateFlow } from '@/action/flow/update';
import { displayFlow } from '@/types/flow';
import { useFlowStepsInfoClient } from '@/hooks/useFlowStepsInfoClient';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateTimeInput } from '@/components/ui/datetime-input';
import { batchUpdate } from '@/action/user-flow/edit';

export const EditSteps = ({ data }: { data: displayFlow }) => {
  const editFlowForm = useForm<z.infer<typeof fullFlowSchema>>({
    resolver: zodResolver(fullFlowSchema),
    defaultValues: {
      title: data.title || '',
      description: data.description || '',
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      id: data.id,
    },
  });

  const { isSubmitting } = editFlowForm.formState;
  const [openEdit, setOpenEdit] = useState(false);
  const { data: stepsData } = useFlowStepsInfoClient(data.id);
  const [stepList, setStepList] = useState<fullStepType[]>([]);

  useEffect(() => {
    if (stepsData) {
      setStepList(stepsData);
    }
  }, [stepsData]);

  return (
    <Sheet open={openEdit} onOpenChange={setOpenEdit}>
      <SheetTrigger asChild>
        <Button size={'sm'} variant={'ghost'}>
          编辑流程
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-3/4 overflow-scroll">
        <SheetHeader>
          <SheetTitle>流程编辑</SheetTitle>
          <SheetDescription>
            在下方编辑流程的基本信息与流程的步骤
          </SheetDescription>
        </SheetHeader>
        <Form {...editFlowForm}>
          <div className="grid gap-4 py-4">
            <FormField
              control={editFlowForm.control}
              name="title"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>流程名称</FormLabel>
                  <FormControl>
                    <Input placeholder="填写展示的流程名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editFlowForm.control}
              name="description"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>流程描述</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="填写展示的流程描述"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editFlowForm.control}
              name="startedAt"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>开始时间</FormLabel>
                  <FormControl>
                    <DateTimeInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editFlowForm.control}
              name="endedAt"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>结束时间</FormLabel>
                  <FormControl>
                    <DateTimeInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 保存流程元数据按钮 */}
            <div className="flex justify-end mt-4 gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => {
                  const values = editFlowForm.getValues();
                  toast.promise(
                    updateFlow(values.id!, values),
                    {
                      loading: '正在保存流程信息',
                      success: `${values.title} 的基本信息已保存`,
                      error: '保存流程信息时出现问题，请稍后重试',
                    },
                  );
                }}
              >
                保存流程信息
              </Button>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setStepList((prev) => [
                    ...prev,
                    {
                      title: '',
                      type: "registering",
                      order: prev.length + 1,
                      description: null,
                      id: 0,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      isDeleted: false,
                      fkFlowId: data.id,
                    },
                  ]);
                }}
              >
                <Plus size={18} />
                添加步骤
              </Button>
            </div>
            {stepList.map((step, index) => {
              return (
                <fieldset
                  className="grid gap-6 rounded-lg border p-4"
                  key={`step${index}`}
                >
                  <legend className="-ml-1 px-1 text-sm font-medium text-muted-foreground">
                    步骤 {index + 1}
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor={`step-${index}-type`}>
                      步骤类型
                    </Label>
                    <Select
                      value={step.type}
                      onValueChange={(value) => {
                        setStepList((prev) => [
                          ...prev.slice(0, index),
                          {
                            ...prev[index],
                            type: value as any,
                          },
                          ...prev.slice(index + 1),
                        ]);
                      }}
                    >
                      <SelectTrigger id={`step-${index}-type`}>
                        <SelectValue placeholder="选择步骤类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="registering">报名</SelectItem>
                        <SelectItem value="checking">审核</SelectItem>
                        <SelectItem value="judging">评分</SelectItem>
                        <SelectItem value="email">邮件</SelectItem>
                        <SelectItem value="finished">完成</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor={`step-${index}-name`}>步骤名称</Label>
                    <Input
                      id={`step-${index}-name`}
                      placeholder="填写展示的步骤名称"
                      className="w-full"
                      defaultValue={step.title}
                      onChange={(e) => {
                        setStepList((prev) => [
                          ...prev.slice(0, index),
                          {
                            ...prev[index],
                            title: e.target.value,
                          },
                          ...prev.slice(index + 1),
                        ]);
                      }}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor={`step-${index}-description`}>步骤描述</Label>
                    <Textarea
                      id={`step-${index}-description`}
                      placeholder="填写展示的步骤名称"
                      className="w-full"
                      defaultValue={step.description || ''}
                      onChange={(e) => {
                        setStepList((prev) => [
                          ...prev.slice(0, index),
                          {
                            ...prev[index],
                            description: e.target.value,
                          },
                          ...prev.slice(index + 1),
                        ]);
                      }}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="m-0"
                      onClick={() => {
                        const stepData = stepList[index] as fullStepType;
                        toast.promise(
                          batchUpdate(stepData.fkFlowId, stepData.order),
                          {
                            loading: '正在将所有人设置到该步骤',
                            success: '所有人已设置到该步骤',
                            error: '将所有人设置到该步骤时出错',
                          },
                        );
                      }}
                    >
                      <Navigation size={18} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="m-0"
                      onClick={() => {
                        // duplicate the step
                        setStepList((prev) => [
                          ...prev.slice(0, index + 1),
                          {
                            ...prev[index],
                            order: prev.length + 1,
                          },
                          ...prev.slice(index + 1),
                        ]);
                      }}
                    >
                      <Copy size={18} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="m-0"
                      onClick={() => {
                        setStepList((prev) => prev.filter((_, i) => i !== index));
                      }}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </fieldset>
              );
            })}
          </div>
          <SheetFooter>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting || stepList.length === 0}
              onClick={() => {
                const values = editFlowForm.getValues();
                const typedStepList = stepList.map(step => ({
                  ...step,
                  type: step.type as any
                })) as fullStepType[];
                console.debug(typedStepList);
                toast.promise(
                  async () => {
                    await updateFlowStep(values.id!, typedStepList);
                    setOpenEdit(false);
                    editFlowForm.reset();
                  },
                  {
                    loading: '正在保存步骤',
                    success: `流程步骤已保存成功`,
                    error: '保存步骤时出现了问题，请稍后重试',
                  },
                );
              }}
            >
              保存步骤
            </Button>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
