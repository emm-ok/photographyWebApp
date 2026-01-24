"use client";

import Section from "../layout/Section";
import Container from "../layout/Container";
import { Easing, motion, Variants } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import image1 from "@/public/img13.jpg";
import image2 from "@/public/img12.jpg";
import image3 from "@/public/img11.jpg";
import image4 from "@/public/img10.jpg";
import image5 from "@/public/img5.jpg";
import image6 from "@/public/img6.jpg";

const images: StaticImageData[] = [image1, image2, image3, image4, image5, image6];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const easeOut: Easing = [0.25, 0.1, 0.25, 1];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: easeOut } },
};

export default function Portfolio() {
  return (
    <Section className="bg-background text-foreground py-24">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <p className="text-muted uppercase tracking-widest text-sm mb-2">
            Portfolio Highlights
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4">
            Selected Work
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A curated selection of my favorite projects showcasing creativity, style, and storytelling through photography.
          </p>
        </div>

        {/* Original Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-2 sm:columns-2 md:columns-3 lg:columns-3 gap-3 mb-20"
        >
          {images.map((img, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-3 break-inside-avoid">
              <div className="relative overflow-hidden rounded-2xl shadow-xl group">
                <Image
                  src={img}
                  alt={`Portfolio project ${index + 1} by PhotoPro`}
                  placeholder="blur"
                  priority={index < 2}
                  sizes="(max-width: 530px) 52vw, (max-width: 1024px) 52vw, 35vw"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== Masonry Carousel #1 ===== */}
        <div className="mb-20">
          <p className="text-center text-muted uppercase tracking-wide text-sm mb-4">
            Featured 
          </p>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.5}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                  <Image
                    src={img}
                    alt={`Carousel project ${idx + 1}`}
                    placeholder="blur"
                    className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ===== Masonry Carousel #2 (Design Variation) ===== */}
        <div>
          <p className="text-center text-muted uppercase tracking-wide text-sm mb-4">
            Latest Projects
          </p>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={1.2}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true }}
            breakpoints={{
              640: { slidesPerView: 2.5, spaceBetween: 16 },
              768: { slidesPerView: 3.5, spaceBetween: 20 },
            }}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative overflow-hidden rounded-xl shadow-md group">
                  <Image
                    src={img}
                    alt={`Latest project ${idx + 1}`}
                    placeholder="blur"
                    className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-xl"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </Section>
  );
}
