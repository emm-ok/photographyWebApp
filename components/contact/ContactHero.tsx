import Container from "@/components/layout/Container"
import MotionReveal from "@/components/ui/MotionReveal"

export default function ContactHero() {
  return (
    <section className="min-h-[50vh] flex items-center bg-neutral-50 dark:bg-neutral-900">
      <>
        <MotionReveal>
          <div className="py-28 px-10 bg-neutral-950 text-white w-screen">
            <p className="uppercase tracking-widest text-sm text-neutral-500 mb-4">
              Contact
            </p>
            <h1 className="font-heading text-5xl md:text-6xl mb-6">
              Let’s Work Together
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-300">
              Have a project in mind, a special event, or a story you’d like to
              tell? I’d love to hear from you.
            </p>
          </div>
        </MotionReveal>
      </>
    </section>
  )
}
