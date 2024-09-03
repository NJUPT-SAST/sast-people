DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('pending', 'accepted', 'rejected', 'ongoing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "college" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "department" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exam_map" (
	"id" serial PRIMARY KEY NOT NULL,
	"flow_step_id" integer,
	"problem_id" integer,
	"score" integer NOT NULL,
	"judger_id" integer NOT NULL,
	"judge_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flow" (
	"id" serial PRIMARY KEY NOT NULL,
	"uid" integer NOT NULL,
	"flow_type_id" integer,
	"is_accepted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flow_step" (
	"id" serial PRIMARY KEY NOT NULL,
	"flow_id" integer,
	"step_id" integer,
	"label" text NOT NULL,
	"status" "status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flow_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"is_deleted" boolean DEFAULT false,
	"create_by" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "major" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problem" (
	"id" serial PRIMARY KEY NOT NULL,
	"step_id" integer,
	"name" text NOT NULL,
	"max_score" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"flow_type_id" integer,
	"order" integer NOT NULL,
	"label" text NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"uid" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"student_id" varchar(20),
	"college" integer,
	"major" text,
	"phone_number" varchar(20),
	"email" varchar(255),
	"github" varchar(255),
	"blog" varchar(255),
	"personal_statement" text,
	"birthday" date,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"department" text,
	"group" text,
	"role" integer DEFAULT 0,
	"feishu_open_id" varchar(255),
	"sast_link_open_id" varchar(255),
	CONSTRAINT "user_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_feishu_open_id_unique" UNIQUE("feishu_open_id"),
	CONSTRAINT "user_sast_link_open_id_unique" UNIQUE("sast_link_open_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exam_map" ADD CONSTRAINT "exam_map_flow_step_id_flow_step_id_fk" FOREIGN KEY ("flow_step_id") REFERENCES "public"."flow_step"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exam_map" ADD CONSTRAINT "exam_map_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problem"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow" ADD CONSTRAINT "flow_flow_type_id_flow_type_id_fk" FOREIGN KEY ("flow_type_id") REFERENCES "public"."flow_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow_step" ADD CONSTRAINT "flow_step_flow_id_flow_id_fk" FOREIGN KEY ("flow_id") REFERENCES "public"."flow"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow_step" ADD CONSTRAINT "flow_step_step_id_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow_type" ADD CONSTRAINT "flow_type_create_by_user_uid_fk" FOREIGN KEY ("create_by") REFERENCES "public"."user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "problem" ADD CONSTRAINT "problem_step_id_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "steps" ADD CONSTRAINT "steps_flow_type_id_flow_type_id_fk" FOREIGN KEY ("flow_type_id") REFERENCES "public"."flow_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_college_college_id_fk" FOREIGN KEY ("college") REFERENCES "public"."college"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_flow_type_order_index" ON "steps" USING btree ("flow_type_id","order");