import { Button } from '@/components/ui/button';
// import { signIn } from 'next-auth/react';
import { signInOath } from '@/actions';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function Socials() {
    return (
        <div className="flex w-full flex-col items-center gap-y-4">
            <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => signInOath('google')}
            >
                <span>Sign in with google</span>
                <FaGoogle />
            </Button>
            <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => signInOath('github')}
            >
                <span>Sign in with github</span>
                <FaGithub />
            </Button>
        </div>
    );
}
