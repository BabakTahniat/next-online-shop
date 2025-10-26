import { loginUser } from '@/actions';
import { signIn } from '@/auth';
import { getUserByEmail, verifyUser } from '@/lib/queries/users';
import {
    deleteVerificationTokenByEmail,
    getVerificationTokenByToken,
} from '@/lib/queries/verification-tokens';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function VerifyEmailPage({
    searchParams,
}: {
    searchParams: Promise<{ token: string }>;
}) {
    const prospectToken = (await searchParams).token;

    if (!prospectToken) {
        return notFound();
    }

    // check if provided token is valid
    // check expiry time of token
    const token = await getVerificationTokenByToken(prospectToken);

    if (!token || token.expires.getTime() < Date.now()) {
        return <h2>Wrong verification code or verification code expired</h2>;
    }

    // get the user based on the token
    // check if email is unverified
    const user = await getUserByEmail(token.email);
    if (user.emailVerified) {
        return <h2>Email already verified</h2>;
    } else {
        verifyUser(token.email);

        deleteVerificationTokenByEmail(token.email);

        return (
            <h2>
                Email verified successfully. You can now{' '}
                <Link href="/login">login</Link>
            </h2>
        );
    }

    // if everything ok, set the user to be email verified
}
