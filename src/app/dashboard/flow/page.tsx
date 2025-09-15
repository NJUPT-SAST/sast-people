import { PageTitle } from '@/components/route';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { AddFlow } from '@/components/flow/add';
import { FlowTableServer } from './flowTable';

const FlowPage = async () => {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <PageTitle />
        <AddFlow />
      </div>
      <div>
        <Suspense
          fallback={
            <>
              <Skeleton className="w-full h-[200px]" />
            </>
          }
        >
          <FlowTableServer />
        </Suspense>
      </div>
    </>
  );
};

export default FlowPage;
