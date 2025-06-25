import { step } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type stepType = Exclude<
  { name: string; label: string; order: number; description: string | null },
  InferSelectModel<typeof step>
>;

export type fullStepType = InferSelectModel<typeof step>;
