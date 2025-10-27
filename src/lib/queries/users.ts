import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { User } from 'next-auth';

export async function getUserByEmail(prospectEmail: string) {
    const normalizedEmail = prospectEmail.toLowerCase().trim();

    const result = await db
        .select()
        .from(users)
        .where(eq(users.email, normalizedEmail))
        .limit(1);

    return result[0] ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

    return result[0] ?? null;
}

export async function createNewUser(
    name: string,
    email: string,
    passwordHash: string,
) {
    await db.insert(users).values({
        name,
        email,
        passwordHash,
    });
}

export async function verifyUser(email: string) {
    await db
        .update(users)
        .set({ emailVerified: new Date(Date.now()) })
        .where(eq(users.email, email));
}
