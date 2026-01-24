import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import MotionReveal from "@/components/ui/MotionReveal";
import { Mail, Phone, MapPin } from "lucide-react";

const info = [
  {
    label: "Email",
    value: "hello@photography.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+1 (234) 567-890",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Available Worldwide",
    icon: MapPin,
  },
];

export default function ContactInfo() {
  return (
    <Section className="bg-background">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {info.map((item, i) => {
            const Icon = item.icon;

            return (
              <MotionReveal key={item.label} delay={i * 0.15}>
                <div
                  className="
                    group
                    h-full
                    rounded-2xl
                    bg-card
                    p-8
                    text-center
                    shadow-sm
                    shadow-muted
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      mx-auto
                      mb-4
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-muted
                      text-foreground
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    <Icon size={22} />
                  </div>

                  {/* Label */}
                  <h3 className="font-heading text-lg mb-2 text-foreground">
                    {item.label}
                  </h3>

                  {/* Value */}
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {item.value}
                  </p>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
