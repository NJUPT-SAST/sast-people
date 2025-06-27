import { PageTitle } from '@/components/route';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

const FlowTypes = async () => {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <PageTitle />
        {/* <AddFlowType /> */}
      </div>
      <div>
        <Suspense
          fallback={
            <>
              <Skeleton className="w-full h-[200px]" />
            </>
          }
        >
          {/* <FlowTypeTableServer /> */}
        </Suspense>
      </div>
    </>
  );
};

export default FlowTypes;
