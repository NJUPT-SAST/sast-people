import { SelectFlow } from '@/components/recruitment/selectFlow';
import { Button } from '@/components/ui/button';
import { useFlowTypeList } from '@/hooks/useFlowTypeList';
import { ArrowLeftIcon } from 'lucide-react';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { RenderTable } from './renderTable';
import { Loading } from '@/components/loading';

const RegisteredPersonTable = async ({
  params,
}: {
  params: {
    flowTypeId: string;
  };
}) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RenderTable flowTypeId={params.flowTypeId} />
      </Suspense>
    </>
  );
};

export default RegisteredPersonTable;
