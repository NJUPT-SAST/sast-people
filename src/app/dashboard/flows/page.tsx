import { PageTitle } from '@/components/route';
import SubmitRegister from '@/components/flow/submitRegister';
import { useMyFlowList } from '@/hooks/useMyFlowList';
import React, { Suspense } from 'react';
import { useFlowTypeList } from '@/hooks/useFlowTypeList';
import { verifySession } from '@/lib/dal';
import { FlowCard } from '@/components/flow/flowCard';
import { Skeleton } from '@/components/ui/skeleton';
import { FlowList } from './flowList';

const Flows = async () => {
  // const allFlowList = await useFlowTypeList();
  const { uid } = await verifySession();
  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle />
        {/* <SubmitRegister flowList={allFlowList} uid={uid} /> */}
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
