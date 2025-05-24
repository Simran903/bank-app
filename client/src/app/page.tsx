"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Accordion from "@/components/FAQs";
import { Features } from "@/components/Features";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";

const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div>
      <div className="relative w-full flex items-center justify-center">
        <Navbar />
      </div>

      <section id="home">
        <RevealOnScroll>
          <HomePage />
        </RevealOnScroll>
      </section>

      <section id="features">
        <RevealOnScroll>
          <Features />
        </RevealOnScroll>
      </section>

      <section id="accordion">
        <RevealOnScroll>
          <Accordion />
        </RevealOnScroll>
      </section>

      <section id="footer">
        <RevealOnScroll>
          <Footer />
        </RevealOnScroll>
      </section>
    </div>
  );
}