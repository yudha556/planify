export default function AuthLayout({
    children,
}: { children: React.ReactNode

}) {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <main>{children}</main>
        </div>
    )
}