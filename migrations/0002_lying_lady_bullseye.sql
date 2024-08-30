DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('pending', 'accepted', 'rejected', 'ongoing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
