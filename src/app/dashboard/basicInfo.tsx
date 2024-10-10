import { BasicInfo } from '@/components/userInfo/basic';
import { useCollegeList } from '@/hooks/useCollegeList';
import { useUserInfo } from '@/hooks/useUserInfo';

export const BasicInfoServer = async () => {
  const userInfo = await useUserInfo();
  const collegeList = await useCollegeList();
  return (
    <>
      <BasicInfo initialInfo={userInfo} collegeList={collegeList} />
    </>
  );
};
