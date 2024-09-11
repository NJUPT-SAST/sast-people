import { steps } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type stepType = Exclude<
	{ name: string; label: string; order: number; description: string | null },
	InferSelectModel<typeof steps>
>;
