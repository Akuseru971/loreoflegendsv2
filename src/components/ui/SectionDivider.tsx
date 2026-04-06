"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  label?: string;
}

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative px-6 py-16 flex items-center justify-center"
    >
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mx-8" />
      {label && (
        <div className="relative bg-void px-6">
          <div className="flex items-center gap-3">
            <span className="text-gold/20 text-xs">◈</span>
            <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-gold/30">{label}</span>
            <span className="text-gold/20 text-xs">◈</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
