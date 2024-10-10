import { PageTitle } from '@/components/route';
import { BasicInfo } from '@/components/userInfo/basic';
import { ExperienceInfo } from '@/components/userInfo/experience';
import { useUserInfo } from '../../hooks/useUserInfo';
import { useCollegeList } from '../../hooks/useCollegeList';
import originalDayjs from '@/lib/dayjs';
import { ShowQrCode } from '@/components/userInfo/showQrCode';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { Loading } from '@/components/loading';
import { BasicInfoServer } from './basicInfo';
import { ExperienceInfoServer } from './experienceInfo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    start: string;
  };
}) {
  const userInfo = await useUserInfo();
  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-center h-10 flex-col">
          <PageTitle />
          <div className="text-sm text-muted-foreground">
            上次更新时间：
            {userInfo.updatedAt &&
              originalDayjs(userInfo.updatedAt).format('YYYY-MM-DD HH:mm')}
          </div>
        </div>
        {userInfo.phoneNumber && (
          <div className="flex items-center">
            <ShowQrCode uid={userInfo.id.toString()} />
          </div>
        )}
      </div>
      {userInfo.phoneNumber === null && !searchParams.start ? (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Welcome to SAST Pass
            </h3>
            <p className="text-sm text-muted-foreground">
              看起来是新同学呢，在报名之前介绍一下你自己吧！
            </p>
            <Link href="/dashboard?start=true">
              <Button className="mt-4">开始编辑资料</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>基本信息</CardTitle>
                  <CardDescription>个人基本信息</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Skeleton className="w-[100px] h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                </CardContent>
              </Card>
            }
          >
            <BasicInfoServer />
          </Suspense>
          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>我的能力</CardTitle>
                  <CardDescription>
                    请与我们分享你目前的兴趣与能力，以便找到最合适的部门
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Skeleton className="w-[100px] h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                </CardContent>
              </Card>
            }
          >
            <ExperienceInfoServer />
          </Suspense>
        </div>
      )}
    </>
  );
}
