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
CREATE TABLE IF NOT EXISTS "flow" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(1000),
	"owner_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"ended_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flow_step" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(1000),
	"type" "flow_step_type_enum" NOT NULL,
	"order" integer NOT NULL,
	"fk_flow_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problem" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"score" integer NOT NULL,
	"fk_flow_step_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(30) NOT NULL,
	"student_id" varchar(16),
	"email" varchar(254),
	"phone" varchar(16),
	"college" varchar(50),
	"major" varchar(50),
	"department" varchar(50)[] DEFAULT ARRAY[]::text[] NOT NULL,
	"link_openid" varchar(255),
	"feishu_openid" varchar(255),
	"role" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_deleted" boolean DEFAULT false,
	CONSTRAINT "user_student_id_unique" UNIQUE("student_id"),
	CONSTRAINT "user_link_openid_unique" UNIQUE("link_openid"),
	CONSTRAINT "user_feishu_openid_unique" UNIQUE("feishu_openid")
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
	"points" integer NOT NULL,
	CONSTRAINT "user_point_fk_user_flow_id_fk_problem_id_unique" UNIQUE("fk_user_flow_id","fk_problem_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email" ADD CONSTRAINT "email_fk_flow_step_id_flow_step_id_fk" FOREIGN KEY ("fk_flow_step_id") REFERENCES "public"."flow_step"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow" ADD CONSTRAINT "flow_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
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
