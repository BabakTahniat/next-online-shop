import Link from 'next/link';
import { Button } from '../ui/button';

type BackButtonProps = {
    href: string;
    label: string;
    text?: string;
};
export default function BackButton({ href, label, text }: BackButtonProps) {
    return (
        <div className="flex items-center gap-x-2">
            {text ? <span className="text-md">{text}</span> : null}

            <Button variant="link" size="lg" className="p-0" asChild>
                <Link href={href} aria-label={label}>
                    {label}
                </Link>
            </Button>
        </div>
    );
}
