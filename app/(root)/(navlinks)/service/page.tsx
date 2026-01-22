import ServicesHero from "@/components/services/ServicesHero"
import ServicesGrid from "@/components/services/ServicesGrid"
import ProcessSection from "@/components/services/ProcessSection"
import PricingSection from "@/components/services/PricingSection"
import ServicesCTA from "@/components/services/ServicesCTA"

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <PricingSection />
      <ServicesCTA />
    </>
  )
}
