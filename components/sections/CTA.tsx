import Section from "../layout/Section";
import Container from "../layout/Container";
import Button from "../ui/Button";
import MotionFade from "../ui/MotionFade";
import Link from "next/link";

export default function CTA() {
  return (
    <Section className="bg-background text-foreground py-20 sm:py-28">
      <Container>
        <MotionFade>
          <div className="text-center max-w-3xl mx-auto px-6">
            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Let’s Create Something Beautiful
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl mb-10">
              I’m available for weddings, portraits, and editorial projects.
              Let’s craft visuals that tell your story.
            </p>

            {/* Primary CTA Button */}
            <Link href="/bookSession">
              <Button
                variant="secondary"
              >
                Book Session
              </Button>
            </Link>

            {/* Optional Secondary CTA */}
            <Link href="/portfolio">
              <Button
                variant="primary"
              >
                View Portfolio
              </Button>
            </Link>
          </div>
        </MotionFade>
      </Container>
    </Section>
  );
}
