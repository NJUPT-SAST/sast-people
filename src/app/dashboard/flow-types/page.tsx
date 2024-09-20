import { AddFlowType } from '@/components/flowTypes/add';
import {
  FlowTypeTable,
  FlowTypeTableColumns,
} from '@/components/flowTypes/table';
import { PageTitle } from '@/components/route';
import { Button } from '@/components/ui/button';
import { useFlowTypeList } from '@/hooks/useFlowTypeList';
import React from 'react';

const FlowTypes = async () => {
  const data = await useFlowTypeList();
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <PageTitle />
        <AddFlowType />
      </div>
      <div>
        <FlowTypeTable columns={FlowTypeTableColumns} data={data} />
      </div>
    </>
  );
};

export default FlowTypes;
