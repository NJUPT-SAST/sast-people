import { InferColumnsDataTypes, InferSelectModel } from "drizzle-orm";
import { flowType } from "@/db/schema";

export type flowTypeType = Omit<
	InferSelectModel<typeof flowType>,
	"createBy"
> & { createBy: string };
