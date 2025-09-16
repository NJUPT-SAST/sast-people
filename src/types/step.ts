import { flowStep, flowStepTypeEnum } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type stepType = Exclude<
  { title: string; type: typeof flowStepTypeEnum; order: number; description: string | null },
  InferSelectModel<typeof flowStep>
>;

export type fullStepType = InferSelectModel<typeof flowStep>;
