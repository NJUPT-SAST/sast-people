ALTER TABLE "flow" ALTER COLUMN "flow_type_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ALTER COLUMN "flow_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ALTER COLUMN "step_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "flow" ADD COLUMN "current_step_id" integer;--> statement-breakpoint
ALTER TABLE "flow" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "flow" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "started_at" timestamp;--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "completed_at" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow" ADD CONSTRAINT "flow_uid_user_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow" ADD CONSTRAINT "flow_current_step_id_steps_id_fk" FOREIGN KEY ("current_step_id") REFERENCES "public"."steps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "flow_step" DROP COLUMN IF EXISTS "label";