import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import MotionReveal from "@/components/ui/MotionReveal";
import { Star, Users, Trophy, Camera } from "lucide-react";

const stats = [
  { value: "10+", label: "Years Experience", icon: <Star className="w-8 h-8 text-primary mb-2" /> },
  { value: "350+", label: "Projects Completed", icon: <Camera className="w-8 h-8 text-primary mb-2" /> },
  { value: "150+", label: "Happy Clients", icon: <Users className="w-8 h-8 text-primary mb-2" /> },
  { value: "20+", label: "Awards & Features", icon: <Trophy className="w-8 h-8 text-primary mb-2" /> },
];

export default function Experience() {
  return (
    <Section className="bg-background text-foreground py-24">
      <Container>
        {/* Section Header */}
        <MotionReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-2">
              Experience & Achievements
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Years of dedication, hundreds of projects, and happy clients who trust my work.
            </p>
          </div>
        </MotionReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <MotionReveal key={stat.label} delay={index * 0.15}>
              <div className="flex flex-col items-center text-center p-6 bg-card dark:bg-card rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Icon */}
                <div>{stat.icon}</div>

                {/* Value */}
                <h3 className="font-heading text-4xl sm:text-5xl md:text-4xl mb-1">{stat.value}</h3>

                {/* Label */}
                <p className="text-muted text-base sm:text-lg">{stat.label}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
