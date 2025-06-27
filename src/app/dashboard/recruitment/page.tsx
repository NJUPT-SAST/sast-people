import { SelectFlow } from '@/components/recruitment/selectFlow';
import { PageTitle } from '@/components/route';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { college } from '@/db/schema';
import { useFlowTypeList } from '@/hooks/useFlowTypeList';
import { redirect } from 'next/navigation';

const Recruitment = async () => {
  // const flowTypes = await useFlowTypeList();

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle />
      </div>
      <div className="space-y-4 mt-4">
        {/* <SelectFlow flowTypes={flowTypes} /> */}
      </div>
    </>
  );
};

export default Recruitment;
