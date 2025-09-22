import React from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';
import { verifySession } from '@/lib/dal';
import Link from 'next/link';

export const UserCard: React.FC = async () => {
  const session = await verifySession();
  return (
    <div className="mt-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            {session?.name ? (session.name as string) : '未知用户'}
          </CardTitle>
          <CardDescription>
            {session.role == 0 ? '😸️ 新同学你好' : '讲师'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/api/auth/logout" prefetch={false}>
            <Button
              size="sm"
              className="w-full"
              variant={'outline'}
              type="submit"
            >
              退出登录
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
