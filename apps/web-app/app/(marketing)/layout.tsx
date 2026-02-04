import Navbar from "./components/navbar"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-screen flex flex-col overflow-x-hidden">
      {/* navbar landing */}
      <Navbar />
      {children}
      {/* footer */}
    </div>
  )
}
