import { auth } from '@/auth';
import { signIn } from 'next-auth/react';

export default async function Home() {
    const session = await auth();
    console.log(session);
    return (
        <div>
            <p>{JSON.stringify(session?.user, null, 2)}</p>
            <form action={signIn}>
                <button>Sign In</button>
            </form>
        </div>
    );
}
