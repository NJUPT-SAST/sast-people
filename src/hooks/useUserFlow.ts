import useSWR from 'swr';
import { fetcher } from '@/lib/utils';

export const useUserFlowId = (studentId: string, flowId: number) => {
  return useSWR<{ success: boolean; userFlowId: number | null }, Error>(
    studentId && flowId ? `/api/user-flow?studentId=${studentId}&flowId=${flowId}` : null,
    fetcher,
  );
};
