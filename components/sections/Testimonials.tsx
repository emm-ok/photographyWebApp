"use client";

import React, { useState, useEffect } from "react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import MotionFade from "../ui/MotionFade";
import Image, { StaticImageData } from "next/image";
import { useSwipeable } from "react-swipeable";

// Testimonial images
import person1 from "@/public/testimonials/img13.jpg";
import person2 from "@/public/testimonials/img5.jpg";
import person3 from "@/public/testimonials/img9.jpg";

type Testimonial = {
  name: string;
  role?: string;
  comment: string;
  image: StaticImageData;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Bride",
    comment:
      "Alex captured our wedding perfectly. Every photo tells a story. We couldn’t have asked for a better photographer.",
    image: person1,
  },
  {
    name: "Michael Lee",
    role: "Entrepreneur",
    comment:
      "The portrait session exceeded my expectations. Alex has a great eye for detail and creativity.",
    image: person2,
  },
  {
    name: "Emily Davis",
    role: "Creative Director",
    comment:
      "Editorial and branding photos were outstanding. The images perfectly conveyed our brand’s story.",
    image: person3,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrent((prev) => (prev + 1) % testimonials.length),
    onSwipedRight: () =>
      setCurrent((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      ),
    trackMouse: true,
  });

  return (
    <Section className="py-24 bg-gray-50">
      <Container>
        {/* Heading */}
        <MotionFade>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl">
              What Clients Say
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Hear from some of our happy clients who trusted us to capture
              their most important moments.
            </p>
          </div>
        </MotionFade>

        {/* Mobile Carousel */}
        <div className="sm:hidden" {...swipeHandlers}>
          <MotionFade>
            <div className="bg-white text-gray-900 rounded-3xl shadow-md p-6 flex flex-col items-center text-center transition-transform duration-300">
              {/* Avatar */}
              <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden ring-2 ring-gray-200">
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Comment */}
              <p className="italic mb-4 text-sm sm:text-base">
                &ldquo;{testimonials[current].comment}&rdquo;
              </p>

              {/* Name & Role */}
              <p className="font-semibold text-gray-900">
                {testimonials[current].name}
              </p>
              {testimonials[current].role && (
                <p className="text-gray-500 text-sm sm:text-base">
                  {testimonials[current].role}
                </p>
              )}

              {/* Navigation Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full transition ${
                      i === current ? "bg-gray-900" : "bg-gray-300"
                    } cursor-pointer`}
                    onClick={() => setCurrent(i)}
                  />
                ))}
              </div>
            </div>
          </MotionFade>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <MotionFade key={i} delay={i * 0.15}>
              <div className="bg-background text-foreground rounded-3xl shadow-md p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
                {/* Avatar */}
                <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden ring-2 ring-gray-200">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>

                {/* Comment */}
                <p className="italic mb-4 text-sm sm:text-base">
                  &ldquo;{t.comment}&rdquo;
                </p>

                {/* Name & Role */}
                <p className="font-semibold">{t.name}</p>
                {t.role && (
                  <p className="text-gray-500 text-sm sm:text-base">{t.role}</p>
                )}
              </div>
            </MotionFade>
          ))}
        </div>
      </Container>
    </Section>
  );
}
