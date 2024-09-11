ALTER TABLE "user" ADD COLUMN "wechat_open_id" varchar(255);--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_wechat_open_id_unique" UNIQUE("wechat_open_id");