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
import { PopoverClose } from '@radix-ui/react-popover';

export default async function Nav() {
    const session = await auth();

    return (
        <header className="py-10">
            <nav className="site-container flex justify-between">
                <Link
                    href="/"
                    className="text-2xl font-light tracking-widest uppercase"
                >
                    Wardrobe Row
                </Link>
                <div className="flex items-center gap-6">
                    <span>Cart</span>
                    <Popover>
                        <PopoverTrigger>
                            <UserIcon />
                        </PopoverTrigger>
                        <PopoverContent
                            side="bottom"
                            align="end"
                            className="rounded-none"
                        >
                            {!session?.user ? (
                                <PopoverClose asChild>
                                    <Link href="/login">
                                        <Button className="w-full hover:cursor-pointer">
                                            <SignInIcon />
                                            Sign In
                                        </Button>
                                    </Link>
                                </PopoverClose>
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
