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
            <div className="flex items-center gap-3">
              <Input placeholder="请输入考生学号" />
              <Link href={'/dashboard/review/marking?user='}>
                <div className="flex-none">
                  <Button size="sm">开始阅卷</Button>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Review;
