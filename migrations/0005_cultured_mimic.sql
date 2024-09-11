ALTER TABLE "steps" ALTER COLUMN "flow_type_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "problem" ADD COLUMN "class" text NOT NULL;