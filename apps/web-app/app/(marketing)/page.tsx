import Feature from "./components/feature";
import Hero from "./components/hero";

export default function LandingPage() {
  return (
    <div className=" w-full flex flex-col overflow-x-hidden">
        <Hero />
        <Feature />
    </div>
  )
}
