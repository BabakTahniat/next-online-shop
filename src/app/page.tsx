import { signIn } from 'next-auth/react';

export default async function Home() {
    return (
        <div>
            <form action={signIn}>
                <button>Sign In</button>
            </form>
        </div>
    );
}
