DO $$ BEGIN
 CREATE TYPE "public"."flow_step_type_enum" AS ENUM('registering', 'checking', 'judging', 'email', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_flow_status_enum" AS ENUM('pending', 'accepted', 'rejected', 'ongoing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"fk_flow_step_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_flow" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "user_flow_status_enum" DEFAULT 'pending' NOT NULL,
	"current_step_order" integer NOT NULL,
	"fk_flow_id" integer NOT NULL,
	"fk_user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_point" (
	"id" serial PRIMARY KEY NOT NULL,
	"fk_user_flow_id" integer NOT NULL,
	"fk_problem_id" integer NOT NULL,
	"point" "point" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "user_phone_number_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "user_email_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "user_feishu_open_id_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "user_sast_link_open_id_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "user_wechat_open_id_unique";--> statement-breakpoint
ALTER TABLE "flow" DROP CONSTRAINT IF EXISTS "flow_uid_user_uid_fk";
--> statement-breakpoint
ALTER TABLE "flow" DROP CONSTRAINT IF EXISTS "flow_flow_type_id_flow_type_id_fk";
--> statement-breakpoint
ALTER TABLE "flow" DROP CONSTRAINT IF EXISTS "flow_current_step_id_steps_id_fk";
--> statement-breakpoint
ALTER TABLE "flow_step" DROP CONSTRAINT IF EXISTS "flow_step_flow_id_flow_id_fk";
--> statement-breakpoint
ALTER TABLE "flow_step" DROP CONSTRAINT IF EXISTS "flow_step_step_id_steps_id_fk";
--> statement-breakpoint
ALTER TABLE "problem" DROP CONSTRAINT IF EXISTS "problem_step_id_steps_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "user_college_college_id_fk";
--> statement-breakpoint
DROP TABLE IF EXISTS "college";--> statement-breakpoint
DROP TABLE IF EXISTS "department";--> statement-breakpoint
DROP TABLE IF EXISTS "exam_map";--> statement-breakpoint
DROP TABLE IF EXISTS "flow_type";--> statement-breakpoint
DROP TABLE IF EXISTS "group";--> statement-breakpoint
DROP TABLE IF EXISTS "major";--> statement-breakpoint
DROP TABLE IF EXISTS "steps";
--> statement-breakpoint
ALTER TABLE "flow" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE varchar(30);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "student_id" SET DATA TYPE varchar(16);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "college" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "major" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE varchar(254);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "department" SET DATA TYPE varchar(50)[];--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "department" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "department" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flow" ADD COLUMN "title" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "flow" ADD COLUMN "description" varchar(1000);--> statement-breakpoint
ALTER TABLE "flow" ADD COLUMN "started_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "flow" ADD COLUMN "ended_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "flow" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "title" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "description" varchar(1000);--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "type" "flow_step_type_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "order" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "fk_flow_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "flow_step" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "problem" ADD COLUMN "title" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "problem" ADD COLUMN "score" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "problem" ADD COLUMN "fk_flow_step_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" varchar(16);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "link_openid" varchar(255);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "feishu_openid" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email" ADD CONSTRAINT "email_fk_flow_step_id_flow_step_id_fk" FOREIGN KEY ("fk_flow_step_id") REFERENCES "public"."flow_step"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_flow" ADD CONSTRAINT "user_flow_fk_flow_id_flow_id_fk" FOREIGN KEY ("fk_flow_id") REFERENCES "public"."flow"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_flow" ADD CONSTRAINT "user_flow_fk_user_id_user_id_fk" FOREIGN KEY ("fk_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_point" ADD CONSTRAINT "user_point_fk_user_flow_id_user_flow_id_fk" FOREIGN KEY ("fk_user_flow_id") REFERENCES "public"."user_flow"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_point" ADD CONSTRAINT "user_point_fk_problem_id_problem_id_fk" FOREIGN KEY ("fk_problem_id") REFERENCES "public"."problem"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow_step" ADD CONSTRAINT "flow_step_fk_flow_id_flow_id_fk" FOREIGN KEY ("fk_flow_id") REFERENCES "public"."flow"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "problem" ADD CONSTRAINT "problem_fk_flow_step_id_flow_step_id_fk" FOREIGN KEY ("fk_flow_step_id") REFERENCES "public"."flow_step"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "flow" DROP COLUMN IF EXISTS "uid";--> statement-breakpoint
ALTER TABLE "flow" DROP COLUMN IF EXISTS "flow_type_id";--> statement-breakpoint
ALTER TABLE "flow" DROP COLUMN IF EXISTS "current_step_id";--> statement-breakpoint
ALTER TABLE "flow" DROP COLUMN IF EXISTS "is_accepted";--> statement-breakpoint
ALTER TABLE "flow_step" DROP COLUMN IF EXISTS "flow_id";--> statement-breakpoint
ALTER TABLE "flow_step" DROP COLUMN IF EXISTS "step_id";--> statement-breakpoint
ALTER TABLE "flow_step" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "flow_step" DROP COLUMN IF EXISTS "started_at";--> statement-breakpoint
ALTER TABLE "flow_step" DROP COLUMN IF EXISTS "completed_at";--> statement-breakpoint
ALTER TABLE "problem" DROP COLUMN IF EXISTS "step_id";--> statement-breakpoint
ALTER TABLE "problem" DROP COLUMN IF EXISTS "class";--> statement-breakpoint
ALTER TABLE "problem" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "problem" DROP COLUMN IF EXISTS "max_score";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "uid";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "phone_number";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "github";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "blog";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "personal_statement";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "birthday";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "group";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "role";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "feishu_open_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "sast_link_open_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "wechat_open_id";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_student_id_unique" UNIQUE("student_id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_link_openid_unique" UNIQUE("link_openid");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_feishu_openid_unique" UNIQUE("feishu_openid");