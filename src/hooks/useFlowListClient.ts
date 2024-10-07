import axios from 'axios';
import { useState, useEffect } from 'react';
import { useMyFlowList } from './useMyFlowList';
import useSWR, { Fetcher } from 'swr';
import { fetcher } from '@/lib/utils';

export const useFlowListClient = (uid: number) => {
  return useSWR<Awaited<ReturnType<typeof useMyFlowList>>, Error>(
    '/api/flow?uid=' + uid,
    fetcher,
  );
};
