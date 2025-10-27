ALTER TYPE "public"."user_role" RENAME TO "userRole";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "password_hash" TO "passwordHash";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "email_verified" TO "emailVerified";