import { flow } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type insertFlowType = Omit<InferSelectModel<typeof flow>, "id">;

export type displayFlowType = Omit<
  InferSelectModel<typeof flow>,
  "flowTypeId"
>;
