export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="mx-auto max-w-lg space-y-8">{children}</div>;
}
