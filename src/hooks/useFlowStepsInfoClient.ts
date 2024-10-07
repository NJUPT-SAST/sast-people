import axios from 'axios';
import { useState, useEffect } from 'react';
import { useFlowStepsInfo } from './useFlowStepsInfo';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';

export const useFlowStepsInfoClient = (flowId: number) => {
  return useSWR<Awaited<ReturnType<typeof useFlowStepsInfo>>, Error>(
    `/api/flow/${flowId}`,
    fetcher,
  );
};