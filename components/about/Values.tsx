import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import MotionReveal from "@/components/ui/MotionReveal"

const values = [
  {
    title: "Authenticity",
    desc: "Capturing moments as they naturally unfold.",
  },
  {
    title: "Craftsmanship",
    desc: "Attention to detail in every frame.",
  },
  {
    title: "Trust",
    desc: "Building long-lasting relationships with clients.",
  },
]

export default function Values() {
  return (
    <Section className="bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <MotionReveal>
          <h2 className="font-heading text-4xl text-center mb-16">
            Core Values
          </h2>
        </MotionReveal>

        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <MotionReveal key={value.title} delay={index * 0.15}>
              <div className="p-8 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                <h3 className="font-heading text-2xl mb-4">
                  {value.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {value.desc}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
