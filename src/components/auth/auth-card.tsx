import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Socials from '@/components/auth/socials';
import BackButton from '@/components/auth/back-button';

type AuthCardProps = {
    children: React.ReactNode;
    cardTitle: string;
    backButtonHref: string;
    backButtonLabel: string;
    backButtonText?: string;
    showSocials?: boolean;
};

export default function AuthCard({
    children,
    cardTitle,
    backButtonHref,
    backButtonLabel,
    backButtonText,
    showSocials = false,
}: AuthCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <hr className="my-4" />
            {showSocials && (
                <CardFooter>
                    <Socials />
                </CardFooter>
            )}
            <CardFooter className="flex justify-center">
                <BackButton
                    href={backButtonHref}
                    label={backButtonLabel}
                    text={backButtonText}
                />
            </CardFooter>
        </Card>
    );
}
