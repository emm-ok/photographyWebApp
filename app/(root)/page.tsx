import CTA from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <section className="">
      {/* ================= HERO ================= */}
      <Hero />

      {/* ================= SERVICES ================= */}
      <Services />

      {/* ================= PORTFOLIO ================= */}
      <Portfolio />

      {/* ================= TESTIMONIALS ================= */}
      <Testimonials />

      {/* ================= CTA ================= */}
      <CTA />

    </section>
  );
}
