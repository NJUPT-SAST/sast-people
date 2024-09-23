import ReviewContent from "@/components/review/reviewContent";
import React from "react";
import { PageTitle } from "@/components/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
interface MarkingProps {
    user: string;
}
const marking: React.FC <MarkingProps> = (searchParams) => {
    return (
        <div>
            <PageTitle />
            <div className="flex items-center justify-between">
                <text className=" text-2xl">{"正在批改："+user}</text>
                <Link href="/dashboard/review">
                    <Button>返回</Button>
                </Link>
            </div>
            <ReviewContent/>
        </div>
    );
}
export default marking;