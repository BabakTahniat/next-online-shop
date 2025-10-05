import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { auth } from '@/auth';
import { SignInIcon, UserIcon } from '@phosphor-icons/react/dist/ssr';
import UserMenu from './user-menu';
import Link from 'next/link';
import { Button } from '../ui/button';

export default async function Nav() {
    const session = await auth();

    return (
        <header className=" bg-slate-200 py-4 px-8">
            <nav className="flex justify-between site-container">
                <Link
                    href="/"
                    className="text-2xl font-light uppercase tracking-widest"
                >
                    Wardrobe Row
                </Link>
                <div className="flex gap-6 items-center">
                    <span>Cart</span>
                    <Popover>
                        <PopoverTrigger>
                            <div className="hover:cursor-pointer ">
                                <UserIcon />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent
                            side="bottom"
                            align="end"
                            className="rounded-none"
                        >
                            {!session?.user ? (
                                <Link href="/auth/login">
                                    <Button className="w-full hover:cursor-pointer rounded-none">
                                        <SignInIcon />
                                        Sign In
                                    </Button>
                                </Link>
                            ) : (
                                <UserMenu user={session.user} />
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </nav>
        </header>
    );
}
