import { AddFlowType } from '@/components/flowTypes/add';
import {
  FlowTypeTable,
  FlowTypeTableColumns,
} from '@/components/flowTypes/table';
import { PageTitle } from '@/components/route';
import { Button } from '@/components/ui/button';
import { useFlowTypeList } from '@/hooks/useFlowTypeList';
import React, { Suspense } from 'react';
import { FlowTypeTableServer } from './flowTypeTable';
import { Skeleton } from '@/components/ui/skeleton';

const FlowTypes = async () => {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <PageTitle />
        <AddFlowType />
      </div>
      <div>
        <Suspense
          fallback={
            <>
              <Skeleton className="w-full h-[200px]" />
            </>
          }
        >
          <FlowTypeTableServer />
        </Suspense>
      </div>
    </>
  );
};

export default FlowTypes;
