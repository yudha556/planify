import Navbar from "./components/navbar"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      
      {/* Navbar fixed */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Scrollable content */}
      <main className="pt-16 h-full overflow-y-auto custom-scroll">
        {children}
      </main>

    </div>
  )
}
