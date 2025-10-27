ALTER TABLE "verification_token" RENAME TO "verificationToken";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "provider_account_id" TO "providerAccountId";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "session_token" TO "sessionToken";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "two_factor_enabled" TO "twoFactorEnabled";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP CONSTRAINT "verification_token_email_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "verificationToken" DROP CONSTRAINT "verification_token_email_user_email_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_email_user_email_fk" FOREIGN KEY ("email") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_email_unique" UNIQUE("email");