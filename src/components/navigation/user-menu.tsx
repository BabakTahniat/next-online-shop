'use client';

// import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import type { User } from 'next-auth';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import { Spinner } from '../ui/spinner';
import { signOut } from '@/actions';

export default function UserMenu({ user }: { user: User }) {
    return (
        <form action={signOut} className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-1 bg-slate-300 p-4">
                <span className="overflow-hidden rounded-full bg-slate-50">
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
            <ul className="flex flex-col justify-center space-y-4">
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
        <Button className="w-full hover:cursor-pointer" disabled={pending}>
            {pending ? <Spinner /> : label}
        </Button>
    );
}
