import Container from "@/components/layout/Container";
import MotionReveal from "@/components/ui/MotionReveal";
import Image from "next/image";
import image from "@/public/img8.jpg"

export default function ContactHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image} // replace with your image
          alt="Contact hero background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
      </div>

      <Container>
        <MotionReveal>
          <div className="relative z-10 max-w-3xl py-28">
            <p className="uppercase tracking-widest text-sm text-neutral-400 mb-4">
              Get in Touch
            </p>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-tight text-white mb-6">
              Let’s Work <br className="hidden sm:block" /> Together
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl">
              Have a project in mind, a special event, or a story you’d like to
              tell? Reach out and let’s create something meaningful together.
            </p>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
