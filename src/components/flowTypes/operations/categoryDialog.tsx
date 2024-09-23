'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, PlusIcon } from 'lucide-react';

interface CategoryDialogProps {
  onSubmit: (category: string) => void;
  initialCategory?: string;
  title: string;
  description: string;
  submitText: string;
}

export const CategoryDialog = ({
  onSubmit,
  initialCategory = '',
  title,
  description,
  submitText,
}: CategoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = () => {
    if (category.trim()) {
      onSubmit(category.trim());
      setCategory('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {initialCategory ? (
          <Button size="sm" variant="ghost" className="m-0">
            <Edit size={18} />
          </Button>
        ) : (
          <Button variant="outline">
            添加题目分类 <PlusIcon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              分类名称
            </Label>
            <Input
              id="name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>{submitText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
