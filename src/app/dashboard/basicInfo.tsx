import { BasicInfo } from '@/components/userInfo/basic';
import { useUserInfo } from '@/hooks/useUserInfo';

export const BasicInfoServer = async () => {
  const userInfo = await useUserInfo();
  return (
    <>
      <BasicInfo initialInfo={userInfo} />
    </>
  );
};
