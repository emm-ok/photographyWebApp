import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import MotionReveal from "@/components/ui/MotionReveal"

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "350+", label: "Projects Completed" },
  { value: "150+", label: "Happy Clients" },
  { value: "20+", label: "Awards & Features" },
]

export default function Experience() {
  return (
    <Section className="bg-white dark:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <MotionReveal key={stat.label} delay={index * 0.1}>
              <div>
                <h3 className="font-heading text-4xl mb-2">
                  {stat.value}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
