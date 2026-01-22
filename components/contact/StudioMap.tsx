import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"

export default function StudioMap() {
  return (
    <Section className="bg-white dark:bg-neutral-950">
      <Container>
        <h2 className="font-heading text-4xl text-center mb-12">
          Studio Location
        </h2>

        <div className="aspect-[16/9] rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=Lagos&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </Container>
    </Section>
  )
}
