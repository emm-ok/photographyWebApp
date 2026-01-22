import Section from "../layout/Section";
import Container from "../layout/Container";
import MotionFade from "../ui/MotionFade";
import Image from "next/image";
import image2 from "@/public/img10.jpg";
import image3 from "@/public/img13.jpg";
import image4 from "@/public/img12.jpg";
import Link from "next/link";
import ContactButton from "../ui/ContactButton";

const services = [
  {
    title: "Wedding Photography",
    desc: "Timeless, emotional storytelling crafted with intention and artistry.",
    img: image2,
  },
  {
    title: "Portrait Sessions",
    desc: "Refined lifestyle and studio portraits that feel natural and cinematic.",
    img: image3,
  },
  {
    title: "Editorial & Branding",
    desc: "Luxury visuals designed to elevate brands, creatives, and campaigns.",
    img: image4,
  },
];

export default function Services() {
  return (
    <section>
      <Section>
        <Container>
          {/* Section Heading */}
          <MotionFade>
            <div className="text-center mb-20">
              <p className="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-4">
                What I Offer
              </p>
              <h2 className="font-heading text-4xl md:text-5xl">Services</h2>
            </div>
          </MotionFade>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-12">
            {services.map((service, i) => (
              <MotionFade key={service.title} delay={i * 0.15}>
                <article className="group relative h-[460px] rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  {/* Background Image */}
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    priority={i === 0}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-10">
                    <h3 className="font-heading text-2xl text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/85 leading-relaxed max-w-[90%]">
                      {service.desc}
                    </p>

                    {/* Editorial underline */}
                    {/* <span className="mt-6 block w-10 h-px bg-white/60 group-hover:w-16 transition-all duration-500" /> */}
                    <Link href="/bookSession" className="mt-6">
                      <ContactButton color variants="secondary">Book Session</ContactButton>
                    </Link>
                  </div>
                </article>
              </MotionFade>
            ))}
          </div>
        </Container>
      </Section>
    </section>
  );
}
