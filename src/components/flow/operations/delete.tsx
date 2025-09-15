'use client';
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

// const Delete = ({ data }: { data: flowTypeType }) => {
const Delete = () => {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-destructive">
          删除
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确定要删除吗？</DialogTitle>
          <DialogDescription>
            删除操作无法撤回，请确保你要这样做。
          </DialogDescription>
          <DialogFooter className="gap-2 mt-3">
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={async () => {
                setOpenDelete(false);
                // TODO: v2 db 
                // toast.promise(deleteFlowType(data.id), {
                //   loading: '删除中...',
                //   success: '删除成功',
                //   error: '删除失败',
                // });
              }}
            >
              删除
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { Delete };
