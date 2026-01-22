import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import MotionReveal from "@/components/ui/MotionReveal"

export default function OurStory() {
  return (
    <Section className="bg-white dark:bg-neutral-950">
      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <MotionReveal>
            <h2 className="font-heading text-4xl mb-6">
              My Story
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              With over a decade of experience, my journey began with a deep
              curiosity for people and stories. From weddings and portraits to
              editorial and commercial projects, my work is driven by honest
              moments and timeless aesthetics.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I focus on natural light, minimal compositions, and real
              expressions. Every project is approached with intention,
              collaboration, and respect for the subject.
            </p>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  )
}
