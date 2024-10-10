import { PageTitle } from '@/components/route';
import { Button } from '@/components/ui/button';
import React, { Suspense } from 'react';
import QRCodeScanner from '@/components/review/qrcodeScanner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MannualInput } from '@/components/review/mannualInput';
import { SelectProblemServer } from './selectProblem';
import { Loading } from '@/components/loading';

const Review: React.FC = async () => {
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
            <Suspense fallback={<Loading />}>
              <SelectProblemServer />
            </Suspense>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <Card>
          <CardHeader>
            <p className="text-muted-foreground text-sm">
              使用摄像头或手动输入
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <QRCodeScanner />
            </div>
            <MannualInput />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Review;
