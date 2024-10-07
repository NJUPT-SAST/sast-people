import ReviewContent from "@/components/review/reviewContent";
import React from "react";
import { PageTitle } from "@/components/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface MarkingProps {
  user: string;
}
export default function marking({
  searchParams,
}: {
  searchParams: { user: string };
}) {
  return (
    <div>
      <PageTitle />
      <div className="flex items-center justify-between">
        <div className=" text-2xl">{"正在批改：" + searchParams.user}</div>
        <Link href="/dashboard/review">
          <Button>返回</Button>
        </Link>
      </div>
      <ReviewContent />
    </div>
  );
}
