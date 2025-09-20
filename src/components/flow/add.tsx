'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createInsertSchema } from 'drizzle-zod';
import { flow } from '@/db/schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { addFlow } from '@/action/flow/add';
import { DateTimeInput } from '../ui/datetime-input';

export const fullFlowSchema = createInsertSchema(flow, {
  title: z.string().min(1, '请输入流程名称').trim(),
  description: z.string().min(1, '请输入流程描述').trim(),
  startedAt: z.date({ required_error: '请选择开始时间' }),
  endedAt: z.date({ required_error: '请选择结束时间' }),
});

export const addFlowSchema = fullFlowSchema.pick({
  title: true,
  description: true,
  startedAt: true,
  endedAt: true,
})
.superRefine((data, ctx) => {
  // 若任一缺失，单独报错（required_error已覆盖，superRefine兜底）
  if (!data.startedAt) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: '请选择开始时间', path: ['startedAt'] });
  }
  if (!data.endedAt) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: '请选择结束时间', path: ['endedAt'] });
  }

  if (data.startedAt && data.endedAt) {
    // 按毫秒比较，允许同一天同一时刻或结束晚于开始
    if (data.endedAt.getTime() < data.startedAt.getTime()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: '结束时间不能早于开始时间', path: ['endedAt'] });
    }
  }
});

export const AddFlow = () => {
  const addFlowForm = useForm<z.infer<typeof addFlowSchema>>({
    resolver: zodResolver(addFlowSchema),
    mode: "onChange",
    defaultValues: {
      title: '',
      description: '',
      startedAt: undefined,
      endedAt: undefined,
    },
  });
  const { isSubmitting } = addFlowForm.formState;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">添加流程</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加流程</DialogTitle>
          <DialogDescription>
            添加新的流程类型，比如"2023 校科协软研招新笔试"
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...addFlowForm}>
            <FormField
              control={addFlowForm.control}
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
              control={addFlowForm.control}
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
              control={addFlowForm.control}
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
              control={addFlowForm.control}
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
          </Form>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            // loading={isSubmitting}
            disabled={isSubmitting}
            onClick={addFlowForm.handleSubmit(async () => {
              toast.promise(
                async () => {
                  console.log(addFlowForm.getValues());
                  console.log(typeof addFlowForm.getValues().startedAt);
                  await addFlow(addFlowForm.getValues()).then(() => {
                    setOpen(false);
                    addFlowForm.reset();
                  });
                },
                {
                  loading: '正在添加',
                  success: `${addFlowForm.getValues().title} 已添加成功`,
                  error: '添加的时候出现了问题，稍后重试',
                },
              );
            })}
          >
            确认添加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
