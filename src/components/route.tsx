'use client';
import { usePathname, useRouter } from 'next/navigation';
import {
  UserPen,
  Workflow,
  FilePenLine,
  Users,
  SquareChartGantt,
  TicketsPlane,
} from 'lucide-react';
import Link from 'next/link';
import { createElement, useMemo } from 'react';
import { SheetClose } from './ui/sheet';

const menuItems = [
  {
    title: '我的资料',
    icon: UserPen,
    path: '',
  },
  {
    title: '我的流程',
    icon: Workflow,
    path: '/flows',
  },
  {
    title: '试卷批改',
    icon: FilePenLine,
    path: '/review',
  },
  {
    title: '招新管理',
    icon: Users,
    path: '/manage',
  },
  {
    title: '流程类别管理',
    icon: SquareChartGantt,
    path: '/flow-types',
  },
];

export const Header = ({
  type,
  role,
}: {
  type: 'pc' | 'mobile';
  role: number;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);
  const authRoutes = useMemo(() => {
    if (!role) {
      return menuItems.slice(0, 2);
    }
    return menuItems;
  }, [role]);
  switch (type) {
    case 'pc':
      return (
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {authRoutes.map((item, index) => (
              <Link
                key={item.title}
                href={`/dashboard${item.path}`}
                className={
                  // handle empty string path
                  (!item.path && pathname === `/dashboard`) ||
                  (item.path && pathname.includes(`/dashboard${item.path}`))
                    ? 'flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary'
                    : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                }
              >
                {createElement(item.icon, {
                  className: 'h-4 w-4',
                })}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      );
    case 'mobile':
      return (
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <TicketsPlane className="h-6 w-6" />
            <span className="sr-only">SAST Pass 招新系统</span>
          </Link>
          {authRoutes.map((item, index) => (
            <SheetClose key={item.title} asChild>
              <Link
                key={item.title}
                href={`/dashboard${item.path}`}
                className={
                  (!item.path && pathname === `/dashboard`) ||
                  (item.path && pathname.includes(`/dashboard${item.path}`))
                    ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
                    : 'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                }
              >
                {createElement(item.icon, {
                  className: 'h-5 w-5',
                })}
                {item.title}
              </Link>
            </SheetClose>
          ))}
        </nav>
      );
  }
};

export const PageTitle = () => {
  const pathname = usePathname();
  return (
    <h1 className="text-lg font-semibold md:text-2xl">
      {menuItems.find((item) => `/dashboard${item.path}` === pathname)?.title}
    </h1>
  );
};
