import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
// import { EditProblemsServer } from "./editProblems";

export default async function EditExamPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const awaitedSearchParams = await searchParams;
  // const flowTypeInfo = await useFlowTypeInfo(Number(awaitedSearchParams.id));
  return (
    <>
      <div className="flex items-center justify-between">
        <Link href="/dashboard/flow">
          <Button variant="ghost">
            <h1 className="text-lg font-semibold md:text-2xl inline-flex items-center gap-2">
              <ArrowLeftIcon className="w-5 h-5" /> 编辑考试
            </h1>
          </Button>
        </Link>
        {/* <p className="text-sm text-muted-foreground">{flowTypeInfo.name}</p> */}
      </div>
      <div>
        <Suspense fallback={<Loading />}>
          {/* <EditProblemsServer id={awaitedSearchParams.id} /> */}
        </Suspense>
      </div>
    </>
  );
}
