import React from "react";
import Container from "../layout/Container";
import MotionFade from "../ui/MotionFade";
import Section from "../layout/Section";

const Testimonials = () => {
  return (
    <Section className="py-24 bg-white">
      <Container>
        <MotionFade>
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="font-heading text-4xl mb-12">What Clients Say</h2>

            <blockquote className="text-xl text-neutral-700 leading-relaxed mb-6">
              “Alex captured our wedding perfectly. Every photo tells a story.
              We couldn’t have asked for a better photographer.”
            </blockquote>

            <p className="text-neutral-500">— Sarah & Daniel</p>
          </div>
        </MotionFade>
      </Container>
    </Section>
  );
};

export default Testimonials;
