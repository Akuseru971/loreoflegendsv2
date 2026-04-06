"use client";

import { motion, AnimatePresence } from "framer-motion";

interface KindredAvatarProps {
  speaker?: "lamb" | "wolf" | "both";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export default function KindredAvatar({
  speaker = "both",
  size = "md",
  animate: shouldAnimate = true,
}: KindredAvatarProps) {
  const sizeMap = {
    sm: { container: "w-16 h-16", svg: 64 },
    md: { container: "w-24 h-24", svg: 96 },
    lg: { container: "w-40 h-40", svg: 160 },
  };

  const { container, svg } = sizeMap[size];
  const s = svg;

  return (
    <div className={`relative ${container} flex items-center justify-center`}>
      {(speaker === "both" || speaker === "lamb") && (
        <motion.div
          animate={shouldAnimate ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute"
          style={{ left: speaker === "both" ? "0%" : "50%", transform: "translateX(-50%)" }}
        >
          {/* Lamb SVG */}
          <svg width={s * 0.7} height={s * 0.9} viewBox="0 0 70 90" fill="none">
            {/* Body */}
            <ellipse cx="35" cy="58" rx="18" ry="22" fill="#1a1a2e" stroke="#c8972a" strokeWidth="0.8" />
            {/* Head */}
            <circle cx="35" cy="28" r="16" fill="#12121a" stroke="#c8972a" strokeWidth="0.8" />
            {/* Mask */}
            <ellipse cx="35" cy="30" rx="10" ry="12" fill="#f2edd7" fillOpacity="0.9" stroke="#c8972a" strokeWidth="0.5" />
            {/* Eyes */}
            <circle cx="31" cy="27" r="2" fill="#c8972a" />
            <circle cx="39" cy="27" r="2" fill="#c8972a" />
            <circle cx="31.5" cy="26.5" r="0.7" fill="#050508" />
            <circle cx="39.5" cy="26.5" r="0.7" fill="#050508" />
            {/* Bow */}
            <path d="M20 45 Q35 35 50 45" stroke="#c8972a" strokeWidth="1.5" fill="none" />
            <line x1="35" y1="35" x2="35" y2="75" stroke="#c8972a" strokeWidth="0.8" />
            {/* Arrow */}
            <path d="M30 35 L35 30 L40 35" stroke="#e8b84b" strokeWidth="1" fill="none" />
            {/* Tail/Robe */}
            <path d="M17 68 Q25 80 35 80 Q45 80 53 68" fill="#1a1a2e" stroke="#c8972a" strokeWidth="0.5" />
            {/* Glow orb */}
            <circle cx="35" cy="50" r="5" fill="none" stroke="#c8972a" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
          </svg>
        </motion.div>
      )}

      {(speaker === "both" || speaker === "wolf") && (
        <motion.div
          animate={shouldAnimate ? { y: [0, 4, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute"
          style={{
            right: speaker === "both" ? "-10%" : "auto",
            left: speaker === "wolf" ? "50%" : "auto",
            transform: speaker === "wolf" ? "translateX(-50%)" : "none",
            bottom: 0,
          }}
        >
          {/* Wolf SVG */}
          <svg width={s * 0.85} height={s * 0.8} viewBox="0 0 85 80" fill="none">
            {/* Body */}
            <ellipse cx="43" cy="52" rx="28" ry="20" fill="#0a0a14" stroke="#4a9eff" strokeWidth="0.8" />
            {/* Neck + Head */}
            <path d="M30 45 Q43 25 56 45" fill="#0a0a14" stroke="#4a9eff" strokeWidth="0.8" />
            <ellipse cx="43" cy="32" rx="15" ry="14" fill="#0a0a14" stroke="#4a9eff" strokeWidth="0.8" />
            {/* Snout */}
            <path d="M36 35 Q43 42 50 35" fill="#12121a" stroke="#4a9eff" strokeWidth="0.5" />
            {/* Eyes - glowing */}
            <circle cx="38" cy="28" r="3" fill="#4a9eff" opacity="0.9" />
            <circle cx="48" cy="28" r="3" fill="#4a9eff" opacity="0.9" />
            <circle cx="38" cy="28" r="4" fill="none" stroke="#4a9eff" strokeWidth="0.5" opacity="0.4" />
            <circle cx="48" cy="28" r="4" fill="none" stroke="#4a9eff" strokeWidth="0.5" opacity="0.4" />
            <circle cx="38.5" cy="27.5" r="1.2" fill="#050508" />
            <circle cx="48.5" cy="27.5" r="1.2" fill="#050508" />
            {/* Ears */}
            <path d="M31 22 L27 8 L37 18" fill="#0a0a14" stroke="#4a9eff" strokeWidth="0.8" />
            <path d="M55 22 L59 8 L49 18" fill="#0a0a14" stroke="#4a9eff" strokeWidth="0.8" />
            {/* Teeth */}
            <path d="M39 38 L41 42 L43 38 L45 42 L47 38" stroke="#4a9eff" strokeWidth="0.6" fill="none" opacity="0.6" />
            {/* Tail */}
            <path d="M70 48 Q80 35 75 55 Q68 65 58 58" stroke="#4a9eff" strokeWidth="1" fill="none" opacity="0.7" />
            {/* Legs */}
            <path d="M20 65 L18 78" stroke="#4a9eff" strokeWidth="1.5" fill="none" />
            <path d="M35 68 L33 78" stroke="#4a9eff" strokeWidth="1.5" fill="none" />
            <path d="M51 68 L53 78" stroke="#4a9eff" strokeWidth="1.5" fill="none" />
            <path d="M66 65 L68 78" stroke="#4a9eff" strokeWidth="1.5" fill="none" />
          </svg>
        </motion.div>
      )}

      {/* Ambient glow */}
      {shouldAnimate && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px rgba(200,151,42,0.1), 0 0 40px rgba(74,158,255,0.05)",
              "0 0 40px rgba(200,151,42,0.2), 0 0 80px rgba(74,158,255,0.1)",
              "0 0 20px rgba(200,151,42,0.1), 0 0 40px rgba(74,158,255,0.05)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}
    </div>
  );
}
