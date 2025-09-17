import { PageTitle } from '@/components/route';
import SubmitRegister from '@/components/userFlow/submitRegister';
import React, { Suspense } from 'react';
import { useFlowList } from '@/hooks/useFlowList';
import { verifySession } from '@/lib/dal';
import { FlowCard } from '@/components/userFlow/flowCard';
import { Skeleton } from '@/components/ui/skeleton';
import { FlowList } from './flowList';

const Flows = async () => {
  const { uid } = await verifySession();
  const allFlowList = await useFlowList();
  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle />
        <SubmitRegister flowList={allFlowList} uid={uid} />
      </div>
      <div className="space-y-4 mt-4">
        <Suspense
          fallback={
            <div className="flex flex-col gap-3">
              <Skeleton className="w-full h-[220px]" />
              <Skeleton className="w-full h-[220px]" />
              <Skeleton className="w-full h-[220px]" />
            </div>
          }
        >
          <FlowList />
        </Suspense>
      </div>
    </>
  );
};

export default Flows;
