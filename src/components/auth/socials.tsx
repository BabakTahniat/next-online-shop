import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function Socials() {
    return (
        <div className="flex flex-col items-center w-full gap-y-2">
            <Button
                size="lg"
                className="w-full"
                onClick={() => signIn('google')}
            >
                Sign in with google
            </Button>
            <Button
                size="lg"
                className="w-full"
                onClick={() => signIn('github')}
            >
                Sign in with github
            </Button>
        </div>
    );
}
