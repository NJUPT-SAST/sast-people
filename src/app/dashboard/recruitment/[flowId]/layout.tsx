import { SelectFlow } from '@/components/recruitment/selectFlow';
import { useFlowList } from '@/hooks/useFlowList';
import React from 'react';

const RegisteredPersonTableLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    flowTypeId: string;
  };
}) => {
  const flowTypes = await useFlowList();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">招新成绩管理</h1>
      </div>
      <div className="space-y-4 mt-4">
        <SelectFlow
          flowTypes={flowTypes}
          defaultFlowTypeId={params.flowTypeId}
        />
        {children}
      </div>
    </>
  );
};

export default RegisteredPersonTableLayout;
