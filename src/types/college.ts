import { InferColumnsDataTypes, InferSelectModel } from "drizzle-orm";
import { college } from "@/db/schema";

export type collegeType = InferSelectModel<typeof college>;
