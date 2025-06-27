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
import { register } from '@/action/flow/register';
import { toast } from 'sonner';
import { flowTypeType } from '@/types/flowType';

const SubmitRegister = ({
  // flowList,
  uid,
// }: { flowList: flowTypeType[]; uid: number }) => {
}: {uid: number }) => {
  const [open, setOpen] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (selectedFlow) {
      setIsSubmitting(true);
      toast.promise(
        (async () => {
          try {
            await register(selectedFlow, uid);
            setOpen(false);
            setSelectedFlow(null);
          } catch (error) {
            if (error instanceof Error) {
              throw new Error(error.message);
            } else {
              throw new Error("报名失败，请稍后再试");
            }
          } finally {
            setIsSubmitting(false);
          }
        })(),
        {
          loading: '正在提交报名...',
          success: '报名成功',
          error: (error) => {
            // 这里我们可以根据错误信息来显示不同的提示
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
          {/* <SelectContent>
            {flowList.map((flow) => (
              <SelectItem key={flow.id} value={flow.id.toString()}>
                {flow.name}
              </SelectItem>
            ))}
          </SelectContent> */}
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
