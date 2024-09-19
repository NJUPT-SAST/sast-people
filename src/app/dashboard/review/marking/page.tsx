import ReviewContent from "@/components/review/reviewContent";
import React from "react";
import { PageTitle } from "@/components/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const marking: React.FC = () => {
    return (
        <div>
            <PageTitle />
            <div className="flex items-center justify-between">
                <text className=" text-2xl">B21011111</text>
                <Link href="/dashboard/review">
                    <Button>返回</Button>
                </Link>
            </div>
            <ReviewContent/>
        </div>
    );
}
export default marking;