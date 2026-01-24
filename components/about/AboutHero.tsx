import Image from "next/image";
import Container from "@/components/layout/Container";
import MotionReveal from "@/components/ui/MotionReveal";

// Example image
import photographer from "@/public/img6.jpg";

export default function AboutHero() {
  return (
    <section className="bg-background text-foreground">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 py-24 lg:py-36">
          {/* ===== LEFT: Text Content ===== */}
          <MotionReveal>
            <div className="flex-1 text-center lg:text-left">
              <p className="uppercase tracking-widest text-sm text-muted mb-4">
                About the Photographer
              </p>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Crafting Stories <br /> Through the Lens
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted max-w-xl mb-6">
                I believe photography is not just about images — it’s about
                emotion, authenticity, and moments that deserve to be remembered.
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
          <MotionReveal>
            <div className="flex-1 relative w-full max-w-lg mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={photographer}
                alt="Photographer Portrait"
                className="object-cover w-full h-full"
                placeholder="blur"
                priority
                sizes="(max-width: 1024px) 80vw, 50vw"
              />
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
