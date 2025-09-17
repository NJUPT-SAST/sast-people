import { flowStep } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

//步骤相关的类型
export type fullStepType = InferSelectModel<typeof flowStep>;
