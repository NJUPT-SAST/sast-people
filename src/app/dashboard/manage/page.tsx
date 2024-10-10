import { ManageTable } from '@/components/manage/manageTable';
import { PageTitle } from '@/components/route';
import React, { Suspense } from 'react';
import { useUserList } from '@/hooks/useUserList';
import { ManageTableServer } from './manageTable';
import { Skeleton } from '@/components/ui/skeleton';

const Manage = async ({
  searchParams,
}: { searchParams: { page?: string; pageSize?: string; search?: string } }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle />
      </div>
      <div>
        <Suspense
          fallback={
            <div>
              <Skeleton className="w-[300px] h-[50px]" />
              <Skeleton className="w-full h-[220px] mt-3" />
            </div>
          }
        >
          <ManageTableServer {...searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default Manage;
