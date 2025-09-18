import { SelectFlow } from '@/components/recruitment/selectFlow';
import { PageTitle } from '@/components/route';
import { useFlowList } from '@/hooks/useFlowList';

const Recruitment = async () => {
  const flowTypes = await useFlowList();

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle />
      </div>
      <div className="space-y-4 mt-4">
        <SelectFlow flowTypes={flowTypes} />
      </div>
    </>
  );
};

export default Recruitment;
