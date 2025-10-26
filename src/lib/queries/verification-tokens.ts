import { db } from '@/db';
import { verificationTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function createVerificationTokenByEmail(email: string) {
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 48); // 24 hours

    await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.email, email));

    const newToken = await db
        .insert(verificationTokens)
        .values({
            email,
            token,
            expires,
        })
        .returning();
    console.log('Verification token saved to db');

    return newToken[0];
}

export async function deleteVerificationTokenByEmail(email: string) {
    await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.email, email));
}

export async function getVerificationTokenByEmail(email: string) {
    const token = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.email, email));

    return token[0] ?? null;
}

export async function getVerificationTokenByToken(prospectToken: string) {
    const token = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, prospectToken));

    return token[0] ?? null;
}
