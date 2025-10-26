import { auth } from '@/auth';
import SignInForm from '@/components/auth/signin-form';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const session = await auth();
    if (session?.user) {
        redirect('/');
    }
    return <SignInForm />;
}
