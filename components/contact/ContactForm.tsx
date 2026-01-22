"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import ContactButton from "@/components/ui/ContactButton";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import MotionFade from "../ui/MotionFade";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section className="bg-neutral-100 dark:bg-neutral-900">
      <Container>
        <MotionFade>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl text-center mb-12">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              <Input
                label="Name"
                {...register("name")}
                placeholder="Your Name"
                className="input"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}

              <Input
                label="Email"
                {...register("email")}
                placeholder="Email Address"
                className="input"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}

              <Textarea
                label="Message"
                {...register("message")}
                rows={5}
                placeholder="Message..."
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}

              <ContactButton type="submit">
                {status === "loading" ? "Sending..." : "Send Message"}
              </ContactButton>
            </form>

            {/* Success / Error Feedback */}
            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-green-600 text-center mt-6"
                >
                  Message sent successfully!
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-center mt-6"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </MotionFade>
      </Container>
    </Section>
  );
}
