import { auth, signIn } from '@/auth';

export default async function Home() {
    const session = await auth();
    console.log(session);
    return (
        <div>
            <p>{JSON.stringify(session?.user, null, 2)}</p>
            <form
                action={async () => {
                    'use server';
                    await signIn();
                }}
            >
                <button>Sign In</button>
            </form>
        </div>
    );
}
