import Container from "@/components/layout/Container"
import MotionReveal from "@/components/ui/MotionReveal"

export default function AboutHero() {
  return (
    <section className="min-h-[60vh]flex w-screen items-center bg-neutral-50 dark:bg-neutral-900">
      <>
        <MotionReveal>
          <div className="py-28 px-10 bg-neutral-950 text-white">
            <p className="uppercase tracking-widest text-sm text-neutral-500 mb-4">
              About the Photographer
            </p>
            <h1 className="font-heading text-5xl md:text-6xl leading-tight mb-6">
              Crafting Stories <br /> Through the Lens
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              I believe photography is not just about images — it’s about
              emotion, authenticity, and moments that deserve to be remembered.
            </p>
          </div>
        </MotionReveal>
      </>
    </section>
  )
}
