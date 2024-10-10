'use server';

import { Loader2 } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center gap-5 min-h-20">
      <Loader2 className="animate-spin h-10 w-10 text-primary" />
    </div>
  );
};
