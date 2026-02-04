import Navbar from "./components/navbar"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      {/* navbar landing */}
      <Navbar />
      {children}
      {/* footer */}
    </div>
  )
}
