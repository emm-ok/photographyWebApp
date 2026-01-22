import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import MotionReveal from "@/components/ui/MotionReveal"

const info = [
  { label: "Email", value: "hello@photography.com" },
  { label: "Phone", value: "+1 (234) 567-890" },
  { label: "Location", value: "Available Worldwide" },
]

export default function ContactInfo() {
  return (
    <Section className="bg-white dark:bg-neutral-950">
      <Container>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {info.map((item, i) => (
            <MotionReveal key={item.label} delay={i * 0.15}>
              <div>
                <h3 className="font-heading text-xl mb-2">
                  {item.label}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {item.value}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
