import { flow } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

//添加流程类别的管理
export type insertFlowType = Omit<InferSelectModel<typeof flow>, "id">;

// 展示流程类别列表
export type displayFlow = InferSelectModel<typeof flow>;
