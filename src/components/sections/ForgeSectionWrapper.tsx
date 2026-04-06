"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ForgeSection from "./ForgeSection";

export default function ForgeSectionWrapper() {
  const [started, setStarted] = useState(false);

  return (
    <section id="forge" className="relative overflow-hidden">
      {/* Section header (shown before start) */}
      {!started && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative py-32 px-6 text-center max-w-5xl mx-auto"
        >
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,10,46,0.6) 0%, transparent 70%)",
          }} />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
              <span className="font-cinzel text-[11px] tracking-[0.5em] uppercase text-gold/50">
                Section II
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
            </div>

            <h2 className="font-cinzel-decorative text-3xl md:text-5xl font-bold text-ivory">
              Forge ton Lore{" "}
              <span className="text-gold-shimmer">avec Kindred</span>
            </h2>

            <p className="font-cinzel text-sm text-ivory/40 max-w-xl mx-auto leading-relaxed tracking-wide">
              Lamb et Wolf te poseront des questions pour forger ton champion.
              <br />
              Une IA génèrera ton lore complet, ton titre et ton illustration.
            </p>

            <div className="rune-divider max-w-sm mx-auto" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
              {[
                { step: "01", label: "Invocation", desc: "Le rituel commence" },
                { step: "02", label: "Questionnaire", desc: "Lamb & Wolf t'interrogent" },
                { step: "03", label: "Génération", desc: "L'IA forge ton lore" },
                { step: "04", label: "Révélation", desc: "Ton champion naît" },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: parseInt(item.step) * 0.1 }}
                  className="flex flex-col items-center gap-2 p-4 border border-ivory/8 bg-slate/20 rounded-sm"
                >
                  <span className="font-cinzel-decorative text-2xl text-gold/30 font-bold">{item.step}</span>
                  <span className="font-cinzel text-xs text-ivory/70 tracking-wide">{item.label}</span>
                  <span className="font-cinzel text-[10px] text-ivory/20 text-center">{item.desc}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => setStarted(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative font-cinzel text-sm tracking-widest uppercase px-10 py-5 overflow-hidden
                border border-gold/50 text-gold hover:text-void transition-all duration-500 rounded-sm mt-4"
            >
              <span className="relative z-10">✦ Entrer dans la Forge ✦</span>
              <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Active forge */}
      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ForgeSection />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
