import { SelectFlow } from '@/components/recruitment/selectFlow';
import { useFlowList } from '@/hooks/useFlowList';
import React, { Suspense } from 'react';
import { RenderTable } from './renderTable';
import { Loading } from '@/components/loading';

const RegisteredPersonTable = async ({
  params,
}: {
  params: {
    flowId: string;
  };
}) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RenderTable flowId={params.flowId} />
      </Suspense>
    </>
  );
};

export default RegisteredPersonTable;
