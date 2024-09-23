import { PageTitle } from '@/components/route';
import SubmitRegister from '@/components/flow/submitRegister';
import { useMyFlowList } from '@/hooks/useMyFlowList';
import React from 'react';
import { useFlowTypeList } from '@/hooks/useFlowTypeList';
import { verifySession } from '@/lib/dal';
import { FlowCard } from '@/components/flow/flowCard';

const Flows = async () => {
  const myFlowList = await useMyFlowList();
  const allFlowList = await useFlowTypeList();
  const { uid } = await verifySession();
  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle />
        <SubmitRegister flowList={allFlowList} uid={uid} />
      </div>
      <div className="space-y-4 mt-4">
        {myFlowList.map((flow) => (
          <FlowCard key={flow.id} flow={flow} />
        ))}
      </div>
    </>
  );
};

export default Flows;
