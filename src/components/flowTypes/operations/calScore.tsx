'use client'
import { calScore } from '@/action/exam-map/calScore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { flowTypeType } from '@/types/flowType';
import { useState } from 'react';
import { toast } from 'sonner';

const CalScore = ({ data }: { data: flowTypeType }) => {
  const [openCalScore, setOpenCalScore] = useState(false);

  return (
    <Dialog open={openCalScore} onOpenChange={setOpenCalScore}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-black">
          计算分数
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确定要计算分数吗？</DialogTitle>
          <DialogDescription>
            计算分数操作无法撤回，请确保你要这样做。
          </DialogDescription>
          <DialogFooter className="gap-2 mt-3">
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <Button
              variant="default"
              onClick={async () => {
                setOpenCalScore(false);
                toast.promise(calScore(data.id), {
                  loading: '计算中...',
                  success: '计算成功',
                  error: '计算失败',
                });
              }}
            >
              计算
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export { CalScore };