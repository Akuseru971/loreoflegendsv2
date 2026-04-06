"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "L'Archive", href: "#oracle" },
  { label: "Forge du Destin", href: "#forge" },
  { label: "Premium", href: "#premium" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-obsidian/80 backdrop-blur-md border-b border-gold/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border border-gold/40 rotate-45 rounded-sm group-hover:border-gold/80 transition-colors" />
            <div className="absolute inset-1 border border-gold/20 rotate-12 rounded-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gold text-xs font-cinzel font-bold">L</span>
            </div>
          </div>
          <span className="font-cinzel text-sm font-semibold text-ivory/90 tracking-widest uppercase group-hover:text-gold transition-colors">
            Lore of Legends
          </span>
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-cinzel text-xs tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#forge"
            className="font-cinzel text-xs tracking-widest uppercase px-4 py-2 border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-300 rounded-sm"
          >
            Commence ta Légende
          </a>
        </div>

        {/* Mobile menu btn */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-px bg-ivory block origin-center transition-all"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-px bg-ivory block"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-px bg-ivory block origin-center"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-obsidian/95 backdrop-blur-md border-t border-gold/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-cinzel text-sm tracking-widest uppercase text-ivory/70 hover:text-gold transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#forge"
                className="font-cinzel text-sm tracking-widest uppercase px-4 py-3 border border-gold/40 text-gold text-center hover:bg-gold/10 transition-all rounded-sm mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Commence ta Légende
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
