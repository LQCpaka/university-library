ALTER TABLE "users" RENAME COLUMN "university_id" TO "university_idd";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_university_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_university_idd_unique" UNIQUE("university_idd");