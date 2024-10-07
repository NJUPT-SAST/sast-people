import { PageTitle } from '@/components/route';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import QRCodeScanner from '@/components/review/qrcodeScanner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SelectProblem from '@/components/review/selectProblem';
import { useFlowTypeList } from '@/hooks/useFlowTypeList';
import useFlowType from '@/hooks/useFlowType';

const Review: React.FC = async () => {
  const flow = await useFlowType();
  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle />
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline">
              设置阅卷范围
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="text-2xl font-semibold">
              <SheetTitle>设置阅卷范围</SheetTitle>
            </SheetHeader>
            <SelectProblem flowTypes={flow} />
          </SheetContent>
        </Sheet>
      </div>
      <QRCodeScanner />
      <div></div>
    </>
  );
};

export default Review;
