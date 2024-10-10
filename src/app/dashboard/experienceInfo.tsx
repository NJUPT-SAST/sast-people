import { ExperienceInfo } from "@/components/userInfo/experience";
import { useUserInfo } from "@/hooks/useUserInfo";

export const ExperienceInfoServer = async () => {
    const userInfo = await useUserInfo();
  return (
    <>
      <ExperienceInfo initialInfo={userInfo} />
    </>
  );
};