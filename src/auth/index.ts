import { db } from '@/db';
import { getUserByEmail } from '@/lib/queries/users';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { AuthError } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GITHUB_CLIENT_ID ||
    !process.env.GITHUB_CLIENT_SECRET ||
    !process.env.AUTH_SECRET
) {
    throw new Error(
        'Missing required environment variables for authentication.',
    );
}

const providers: Provider[] = [
    Credentials({
        credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
        },

        async authorize(credentials) {
            if (!credentials) return null;
            const { email, password } = credentials;

            if (
                typeof email !== 'string' ||
                !email ||
                typeof password !== 'string' ||
                !password
            ) {
                console.log('DEBUG: Missing email or password');
                return null;
            }

            try {
                const user = await getUserByEmail(email);
                console.log('🧑:', user);
                if (!user) {
                    console.log('DEBUG: User not found');
                    return null;
                }
                if (!user.passwordHash) {
                    console.log('DEBUG: User has no password (OAuth user)');
                    return null;
                }

                const isMatched = await bcrypt.compare(
                    password,
                    user.passwordHash,
                );
                if (!isMatched) {
                    console.log('DEBUG: Wrong password');
                    return null;
                }
                if (!user.emailVerified) {
                    console.log('DEBUG: Email not verified');
                    throw new Error('EmailNotVerified');
                }

                console.log('DEBUG: Auth successful');
                return user;
            } catch (err) {
                if (
                    err instanceof Error &&
                    err.message === 'EmailNotVerified'
                ) {
                    throw err;
                }
                console.log('DEBUG: Unknown error in authorize', err);
                return null;
            }
        },
    }),
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 30 }, // maxAge in seconds (default 30 days)
    providers,
});
