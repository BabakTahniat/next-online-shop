import { loginUser } from '@/actions';
import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
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
    const tentativeToken = (await searchParams).token;

    if (!tentativeToken) {
        return notFound();
    }

    // check if provided token is valid
    // check expiry time of token
    const token = await getVerificationTokenByToken(tentativeToken);

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
                Email verified successfully. You can now
                <Button asChild variant="link">
                    <Link href="/login">login here</Link>
                </Button>
                .
            </h2>
        );
    }

    // if everything ok, set the user to be email verified
}
