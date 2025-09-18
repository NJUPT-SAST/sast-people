import { Button } from "../../ui/button";
import { displayFlow } from "@/types/flow";
import { EditSteps } from "./editSteps";
import { Delete } from "./delete";
import Link from "next/link";

export const Operations = ({ data }: { data: displayFlow }) => {
  return (
    <>
      <EditSteps data={data} />
      <Link href={`/dashboard/flow/edit-exam?id=${data.id}`}>
        <Button variant={"ghost"}>编辑笔试</Button>
      </Link>
      <Delete data={data} />
    </>
  );
};
