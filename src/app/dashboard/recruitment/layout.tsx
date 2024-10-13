import { SelectFlow } from '@/components/recruitment/selectFlow';
import { PageTitle } from '@/components/route';
import { useFlowTypeList } from '@/hooks/useFlowTypeList';

const RecruitmentLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <>
      {children}
    </>
  );
};

export default RecruitmentLayout;
