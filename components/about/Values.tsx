import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import MotionReveal from "@/components/ui/MotionReveal";
import { CheckCircle } from "lucide-react";

const values = [
  {
    title: "Authenticity",
    desc: "Capturing moments as they naturally unfold.",
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
  },
  {
    title: "Craftsmanship",
    desc: "Attention to detail in every frame.",
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
  },
  {
    title: "Trust",
    desc: "Building long-lasting relationships with clients.",
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
  },
];

export default function Values() {
  return (
    <Section className="bg-background text-foreground py-24">
      <Container>
        <MotionReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4">
              Core Values
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              The principles that guide every session, ensuring a meaningful and authentic experience for every client.
            </p>
          </div>
        </MotionReveal>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <MotionReveal key={value.title} delay={index * 0.15}>
              <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-muted dark:border-muted shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card dark:bg-card">
                {/* Icon */}
                <div className="mb-4">{value.icon}</div>

                {/* Title */}
                <h3 className="font-heading text-2xl mb-2">{value.title}</h3>

                {/* Description */}
                <p className="text-muted">{value.desc}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
