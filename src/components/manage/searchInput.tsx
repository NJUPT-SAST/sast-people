'use client';

import React, {
  useState,
  useTransition,
  useEffect,
  useDeferredValue,
} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchInputProps {
  defaultValue: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ defaultValue }) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (deferredSearchTerm !== defaultValue) {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        if (deferredSearchTerm) {
          params.set('search', deferredSearchTerm);
        } else {
          params.delete('search');
        }
        params.set('page', '1'); // 重置页码
        router.push(`${pathname}?${params.toString()}`);
      });
    }
  }, [deferredSearchTerm, defaultValue, router, pathname, searchParams]);

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="搜索用户..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-64"
      />
      <Button disabled={isPending} variant="default" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};
