import Feature from "./components/feature";
import Footer from "./components/footer";
import Hero from "./components/hero";
import HowItWorks from "./components/howitworks";
import PlanningSection from "./components/planningSection";
import Pricing from "./components/pricing";

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col overflow-x-hidden scroll-smooth scroll-smoth">
      
      <section id="hero">
        <Hero />
      </section>

      <section id="features">
        <Feature />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="planning">
        <PlanningSection />
      </section>

      <Footer />
    </div>
  );
}
