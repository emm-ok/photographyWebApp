import Section from "../layout/Section"
import Container from "../layout/Container"
import Button from "../ui/Button"
import MotionFade from "../ui/MotionFade"
import Link from "next/link"

export default function CTA() {
  return (
    <Section className="bg-neutral-900 text-white">
      <Container>
        <MotionFade>
          <div className="text-center">
            <h2 className="font-heading text-4xl mb-6">
              Let’s Create Something Beautiful
            </h2>
            <p className="text-neutral-300 mb-10">
              Available for weddings, portraits, and editorial projects.
            </p>
            <Link href="/bookSession">
                <Button variant="secondary">Book Session</Button>
              </Link>
          </div>
        </MotionFade>
      </Container>
    </Section>
  )
}
