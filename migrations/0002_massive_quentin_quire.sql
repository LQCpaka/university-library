ALTER TABLE "users" RENAME COLUMN "university_idd" TO "university_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_university_idd_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_university_id_unique" UNIQUE("university_id");