import type { Metadata } from 'next';
import { Menu, TicketsPlane } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/route';
import { UserCard } from '../../components/userCard';
import { verifySession } from '@/lib/dal';
import { Suspense } from 'react';
import { Loading } from '@/components/loading';

export const metadata: Metadata = {
  title: 'SAST 招新',
  description: '南京邮电大学大学生科学技术协会招新平台',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <TicketsPlane className="h-6 w-6" />
              <span className="">SAST 招新</span>
            </Link>
          </div>
          <Header type={'pc'} role={session.role} />
          <div className="mt-auto p-4">
            <UserCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:overflow-y-auto md:h-screen w-screen md:w-full">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/80 backdrop-blur-lg px-4 lg:hidden md:hidden sticky top-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">点击打开菜单</span>
              </Button>
            </SheetTrigger>
            <SheetTitle>SAST Pass</SheetTitle>
            <SheetContent side="left" className="flex flex-col">
              <Header type={'mobile'} role={session.role} />
              <UserCard />
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
