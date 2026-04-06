"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 overflow-hidden border-t border-gold/10">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(10,8,20,0.9) 0%, #050508 70%)",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 border border-gold/40 rotate-45 rounded-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gold text-xs font-cinzel font-bold">L</span>
                </div>
              </div>
              <span className="font-cinzel text-sm font-semibold text-ivory/80 tracking-widest uppercase">
                Lore of Legends
              </span>
            </div>
            <p className="font-serif text-xs text-ivory/30 italic leading-relaxed">
              Une expérience narrative plongeant dans les archives interdites de Runeterra. Guidé par Kindred, forgé par ton imagination.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-gold/40">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: "L'Oracle", href: "#oracle" },
                { label: "La Forge", href: "#forge" },
                { label: "Premium", href: "#premium" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-cinzel text-xs text-ivory/30 hover:text-gold transition-colors tracking-wide">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-gold/40">Légal</h4>
            <p className="font-serif text-xs text-ivory/20 italic leading-relaxed">
              Lore of Legends est un projet fan-made non affilié à Riot Games. League of Legends, Runeterra et tous les personnages associés sont la propriété de Riot Games, Inc.
            </p>
          </div>
        </div>

        <div className="rune-divider" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="font-cinzel text-[10px] tracking-widest uppercase text-ivory/15">
            "Tous rencontrent Kindred… mais peu choisissent la manière."
          </p>
          <p className="font-cinzel text-[10px] text-ivory/10 mt-2">
            © 2026 Lore of Legends — Fan Project
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
