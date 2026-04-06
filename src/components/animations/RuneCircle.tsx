"use client";

import { motion } from "framer-motion";

interface RuneCircleProps {
  size?: number;
  speed?: number;
  opacity?: number;
  color?: string;
  className?: string;
}

export default function RuneCircle({
  size = 200,
  speed = 20,
  opacity = 0.15,
  color = "#c8972a",
  className = "",
}: RuneCircleProps) {
  const runeSymbols = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ"];
  const count = Math.min(12, runeSymbols.length);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: size, height: size, opacity }}
        fill="none"
      >
        {/* Outer circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
        {/* Inner circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 16}
          stroke={color}
          strokeWidth="0.3"
          strokeDasharray="2 6"
        />
        {/* Rune characters */}
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i / count) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const r = size / 2 - 10;
          const x = size / 2 + r * Math.cos(rad);
          const y = size / 2 + r * Math.sin(rad);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={color}
              fontSize="10"
              style={{ userSelect: "none" }}
            >
              {runeSymbols[i % runeSymbols.length]}
            </text>
          );
        })}
      </svg>
    </motion.div>
  );
}
