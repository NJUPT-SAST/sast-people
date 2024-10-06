import { useCollegeList } from "@/hooks/useCollegeList"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    const colleges = await useCollegeList()
    return NextResponse.json(colleges)
}