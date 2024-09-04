ALTER TABLE "flow_type" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_type" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_type" ALTER COLUMN "create_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET NOT NULL;