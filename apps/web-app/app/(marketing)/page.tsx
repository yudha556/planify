import Feature from "./components/feature";
import Footer from "./components/footer";
import Hero from "./components/hero";
import HowItWorks from "./components/howitworks";
import PlanningSection from "./components/planningSection";
import Pricing from "./components/pricing";

export default function LandingPage() {
  return (
    <div className=" w-full flex flex-col overflow-x-hidden">
        <Hero />
        <Feature />
        <HowItWorks />
        <Pricing />
        <PlanningSection />
        <Footer />
    </div>
  )
}
