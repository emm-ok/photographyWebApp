import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"

export default function Booking() {
  return (
    <Section className="bg-neutral-900 text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl mb-6">
            Book a Session
          </h2>
          <p className="text-neutral-300 mb-10">
            Schedule a consultation or photography session instantly.
          </p>

          <iframe
            src="https://calendly.com/your-calendly-link"
            className="w-full h-[700px] rounded-2xl"
          />
        </div>
      </Container>
    </Section>
  )
}
