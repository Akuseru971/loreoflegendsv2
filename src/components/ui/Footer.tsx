"use client";

import { motion } from "framer-motion";
import KindredLogo from "@/components/ui/KindredLogo";

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
              <KindredLogo variant="nav" />
              <span className="font-cinzel text-sm font-semibold text-ivory/80 tracking-widest uppercase">
                Lore of Legends
              </span>
            </div>
            <p className="font-serif text-xs text-ivory/30 italic leading-relaxed">
              A narrative experience diving into the forbidden archives of Runeterra. Guided by Kindred, forged by your imagination.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-gold/40">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: "The Oracle", href: "#oracle" },
                { label: "The Forge", href: "#forge" },
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
            <h4 className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-gold/40">Legal</h4>
            <p className="font-serif text-xs text-ivory/20 italic leading-relaxed">
              Lore of Legends is a fan-made project not affiliated with Riot Games. League of Legends, Runeterra and all associated characters are the property of Riot Games, Inc.
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
            "All things meet Kindred… but few choose how."
          </p>
          <p className="font-cinzel text-[10px] text-ivory/10 mt-2">
            © 2026 Lore of Legends — Fan Project
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
