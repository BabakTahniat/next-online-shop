'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import type { User } from 'next-auth';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import Loading from '@/app/loading';

export default function UserMenu({ user }: { user: User }) {
    return (
        <form action={signOut} className="flex flex-col gap-4">
            <div className="bg-slate-300 p-4 flex flex-col gap-1 justify-center items-center">
                <span className="rounded-full overflow-hidden">
                    <Image
                        width={64}
                        height={64}
                        src={user.image || ''}
                        alt={user.name || ''}
                    />
                </span>
                <span>{user.name}</span>
                <span>{user.email}</span>
            </div>
            <ul className="flex flex-col space-y-4 justify-center">
                <li>My Orders</li>
                <li>Wish List</li>
                <li>Settings</li>
                <li>Theme</li>
                <li>
                    <SubmitButton label="Sign Out" />
                </li>
            </ul>
        </form>
    );
}

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <Button
            className="w-full rounded-none hover:cursor-pointer"
            disabled={pending}
        >
            {pending ? <Loading /> : label}
        </Button>
    );
}
