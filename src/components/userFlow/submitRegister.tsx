'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { register } from '@/action/user-flow/register';
import { toast } from 'sonner';
import { displayFlow } from '@/types/flow';
import originalDayjs from '@/lib/dayjs';

const SubmitRegister = ({
  flowList,
  uid,
}: { flowList: displayFlow[]; uid: number }) => {
  const [open, setOpen] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (selectedFlow) {
      setIsSubmitting(true);
      toast.promise(
        (async () => {
          const result = await register(selectedFlow, uid);
          if (!result.success) {
            throw new Error(result.error);
          }
          setOpen(false);
          setSelectedFlow(null);
          setIsSubmitting(false);
        })(),
        {
          loading: '正在提交报名...',
          success: '报名成功',
          error: (error) => {
            setIsSubmitting(false);
            return error instanceof Error ? error.message : "报名失败，请稍后再试";
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">提交报名</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>选择报名流程</DialogTitle>
          <DialogDescription>请选择您要报名的流程</DialogDescription>
        </DialogHeader>
        <Select onValueChange={(value) => setSelectedFlow(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择流程" />
          </SelectTrigger>
          <SelectContent>
            {flowList.map((flow) => {
              const now = new Date();
              const isBeforeStart = now < flow.startedAt;
              const isAfterEnd = now > flow.endedAt;
              const isActive = !isBeforeStart && !isAfterEnd;

              return (
                <SelectItem
                  key={flow.id}
                  value={flow.id.toString()}
                  disabled={!isActive}
                >
                  <div className="flex flex-col">
                    <span className={isActive ? '' : 'text-muted-foreground'}>
                      {flow.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isBeforeStart && `未开始 (${originalDayjs(flow.startedAt).format('MM-DD HH:mm')})`}
                      {isAfterEnd && `已结束 (${originalDayjs(flow.endedAt).format('MM-DD HH:mm')})`}
                      {isActive && `进行中 (${originalDayjs(flow.endedAt).format('MM-DD HH:mm')} 截止)`}
                    </span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            onClick={handleRegister}
            disabled={!selectedFlow || isSubmitting}
            loading={isSubmitting}
          >
            确认报名
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitRegister;
