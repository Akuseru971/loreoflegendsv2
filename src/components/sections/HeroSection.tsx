"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import KindredAvatar from "@/components/ui/KindredAvatar";
import RuneCircle from "@/components/animations/RuneCircle";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-runeterra-gradient" />
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(26,10,46,0.8) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 40% 30% at 30% 70%, rgba(74,158,255,0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 40% 30% at 70% 30%, rgba(200,151,42,0.05) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Decorative rune circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <RuneCircle size={600} speed={40} opacity={0.06} color="#c8972a" />
        <div className="absolute">
          <RuneCircle size={400} speed={25} opacity={0.08} color="#4a9eff" />
        </div>
        <div className="absolute">
          <RuneCircle size={200} speed={15} opacity={0.1} color="#c8972a" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-4xl mx-auto"
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="font-cinzel text-xs tracking-[0.4em] uppercase text-gold/70">
            Forbidden Archive
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* Kindred avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          <KindredAvatar size="lg" speaker="both" />
        </motion.div>

        {/* Main title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-cinzel-decorative text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
          >
            <span className="text-gold-shimmer block">Lore of</span>
            <span className="text-ivory block mt-1">Legends</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="rune-divider max-w-xl mx-auto"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-cinzel text-base md:text-lg text-ivory/60 tracking-wide max-w-2xl mx-auto leading-relaxed"
          >
            The archives of Runeterra await you.
            <br />
            <span className="text-gold/80">Kindred</span> has carved your name in the book of fates.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <a
            href="#forge"
            className="group relative font-cinzel text-sm tracking-widest uppercase px-8 py-4 bg-gold/10 border border-gold/50 text-gold hover:bg-gold/20 hover:border-gold transition-all duration-300 rounded-sm overflow-hidden"
          >
            <span className="relative z-10">Forge your Champion</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="#oracle"
            className="font-cinzel text-sm tracking-widest uppercase px-8 py-4 border border-ivory/20 text-ivory/60 hover:text-ivory hover:border-ivory/40 transition-all duration-300 rounded-sm"
          >
            Consult the Oracle
          </a>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="font-cinzel text-xs md:text-sm italic text-gold/40 max-w-lg mx-auto mt-4 leading-relaxed"
        >
          "All things meet Kindred… but few choose how."
        </motion.blockquote>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-gold/30">
          Descend
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
