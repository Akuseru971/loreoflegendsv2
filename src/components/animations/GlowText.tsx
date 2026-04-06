"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowTextProps {
  children: React.ReactNode;
  color?: "gold" | "azure" | "mystic" | "ivory";
  shimmer?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const colorMap = {
  gold: "text-gold gold-text-glow",
  azure: "text-azure azure-text-glow",
  mystic: "text-mystic",
  ivory: "text-ivory",
};

export default function GlowText({
  children,
  color = "gold",
  shimmer = false,
  className = "",
  as: Tag = "span",
}: GlowTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ display: "inline" }}
    >
      <Tag
        className={cn(
          shimmer ? "text-gold-shimmer" : colorMap[color],
          className
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
