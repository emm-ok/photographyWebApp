import Image from "next/image";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import MotionReveal from "@/components/ui/MotionReveal";

// Example image for OurStory
import storyImage from "@/public/img12.jpg";

export default function OurStory() {
  return (
    <Section className="bg-background text-foreground">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 py-24 lg:py-36">
          {/* ===== LEFT: Text Content ===== */}
          <MotionReveal>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                My Story
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-muted mb-6 max-w-xl">
                With over a decade of experience, my journey began with a deep curiosity for people and stories. From weddings and portraits to editorial and commercial projects, my work is driven by honest moments and timeless aesthetics.
              </p>

              <p className="text-base sm:text-lg md:text-xl text-muted mb-6 max-w-xl">
                I focus on natural light, minimal compositions, and real expressions. Every project is approached with intention, collaboration, and respect for the subject.
              </p>

              {/* Optional CTA */}
              {/* <a
                href="/portfolio"
                className="inline-block mt-4 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:scale-105 transition-transform"
              >
                View Portfolio
              </a> */}
            </div>
          </MotionReveal>

          {/* ===== RIGHT: Image ===== */}
          <MotionReveal delay={0.15}>
            <div className="flex-1 relative w-full max-w-lg mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={storyImage}
                alt="Photographer Story Image"
                className="object-cover w-full h-full"
                placeholder="blur"
                priority
                sizes="(max-width: 1024px) 80vw, 50vw"
              />
            </div>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
