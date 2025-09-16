ALTER TABLE "user_point" ADD COLUMN "points" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_point" DROP COLUMN IF EXISTS "point";