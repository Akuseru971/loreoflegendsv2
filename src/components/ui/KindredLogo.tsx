"use client";

import { motion } from "framer-motion";

interface KindredLogoProps {
  variant: "oracle-seal" | "fate-icon" | "champion-tease" | "nav";
  className?: string;
  animate?: boolean;
}

/**
 * KindredLogo — Reimagined floating Kindred emblems to replace placeholder schemas.
 *
 * Variants:
 *   oracle-seal     — Lamb's iconic mask with bow arc, for the Oracle activation portal
 *   fate-icon       — Wolf's glowing eyes in a hexagonal frame, for the Fate & Power step
 *   champion-tease  — Full Kindred portrait (Wolf behind, Lamb in foreground), for premium tease
 *   nav             — Minimal diamond + mask, for the navigation logo
 */
export default function KindredLogo({
  variant,
  className = "",
  animate: shouldAnimate = true,
}: KindredLogoProps) {
  // ── Oracle Seal: Lamb's mask floating ──
  if (variant === "oracle-seal") {
    return (
      <motion.div
        className={`relative flex items-center justify-center ${className}`}
        animate={shouldAnimate ? { y: [0, -7, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          {/* Outer dashed rune ring */}
          <circle cx="40" cy="40" r="38" stroke="#c8972a" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />
          {/* Mid ring */}
          <circle cx="40" cy="40" r="27" stroke="#c8972a" strokeWidth="0.7" opacity="0.15" />

          {/* Bow arc behind the mask */}
          <path d="M18 34 Q40 16 62 34" stroke="#c8972a" strokeWidth="1.5" fill="none" opacity="0.9" />
          {/* Vertical bow stave */}
          <line x1="40" y1="16" x2="40" y2="30" stroke="#c8972a" strokeWidth="1" />
          {/* Arrow nock */}
          <path d="M35 23 L40 16 L45 23" stroke="#e8b84b" strokeWidth="0.9" fill="none" />
          {/* Bowstring subtle */}
          <path d="M18 34 Q18 46 21 56" stroke="#c8972a" strokeWidth="0.4" fill="none" opacity="0.3" />
          <path d="M62 34 Q62 46 59 56" stroke="#c8972a" strokeWidth="0.4" fill="none" opacity="0.3" />

          {/* Mask body — ivory oval */}
          <ellipse cx="40" cy="46" rx="15" ry="19" fill="#f2edd7" fillOpacity="0.93" stroke="#c8972a" strokeWidth="0.9" />

          {/* Gold triangle eye markings (Kindred characteristic) */}
          <path d="M33 42 L30 35.5 L36 35.5 Z" fill="#c8972a" />
          <path d="M47 42 L44 35.5 L50 35.5 Z" fill="#c8972a" />

          {/* Pupils */}
          <circle cx="33" cy="40" r="1.8" fill="#050508" />
          <circle cx="47" cy="40" r="1.8" fill="#050508" />

          {/* Subtle nose */}
          <path d="M38 50 L40 47.5 L42 50" stroke="#c8972a" strokeWidth="0.6" fill="none" opacity="0.55" />

          {/* Chin wisps */}
          <path d="M34 61 Q40 65 46 61" stroke="#c8972a" strokeWidth="0.4" fill="none" opacity="0.3" />

          {/* Bottom death-orb glow */}
          <circle cx="40" cy="68" r="8" fill="#c8972a" opacity="0.07" />
        </svg>

        {shouldAnimate && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 12px rgba(200,151,42,0.1)",
                "0 0 30px rgba(200,151,42,0.35)",
                "0 0 12px rgba(200,151,42,0.1)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}
      </motion.div>
    );
  }

  // ── Fate Icon: Wolf eyes in a hexagon ──
  if (variant === "fate-icon") {
    return (
      <motion.div
        className={`relative flex items-center justify-center ${className}`}
        animate={shouldAnimate ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          {/* Hexagon border */}
          <polygon
            points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5"
            stroke="#4a9eff"
            strokeWidth="0.9"
            fill="rgba(10,20,40,0.85)"
            strokeOpacity="0.55"
          />
          {/* Inner hexagon subtle */}
          <polygon
            points="32,9 51,20 51,44 32,55 13,44 13,20"
            stroke="#4a9eff"
            strokeWidth="0.3"
            fill="none"
            strokeOpacity="0.2"
          />

          {/* Wolf left eye */}
          <circle cx="21" cy="32" r="7" fill="#4a9eff" opacity="0.88" />
          {/* Wolf right eye */}
          <circle cx="43" cy="32" r="7" fill="#4a9eff" opacity="0.88" />

          {/* Pupils */}
          <ellipse cx="21" cy="32" rx="3.8" ry="4.5" fill="#030309" />
          <ellipse cx="43" cy="32" rx="3.8" ry="4.5" fill="#030309" />

          {/* Slit highlight */}
          <line x1="21" y1="28" x2="21" y2="36" stroke="#4a9eff" strokeWidth="0.4" opacity="0.4" />
          <line x1="43" y1="28" x2="43" y2="36" stroke="#4a9eff" strokeWidth="0.4" opacity="0.4" />

          {/* Outer glow rings */}
          <circle cx="21" cy="32" r="9" stroke="#4a9eff" strokeWidth="0.4" fill="none" opacity="0.3" />
          <circle cx="43" cy="32" r="9" stroke="#4a9eff" strokeWidth="0.4" fill="none" opacity="0.3" />

          {/* Bridge between eyes */}
          <path d="M28 30 Q32 27 36 30" stroke="#4a9eff" strokeWidth="0.5" fill="none" opacity="0.35" />
        </svg>

        {shouldAnimate && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              filter: [
                "drop-shadow(0 0 4px rgba(74,158,255,0.1))",
                "drop-shadow(0 0 14px rgba(74,158,255,0.4))",
                "drop-shadow(0 0 4px rgba(74,158,255,0.1))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    );
  }

  // ── Champion Tease: Full Kindred portrait (Wolf + Lamb) ──
  if (variant === "champion-tease") {
    return (
      <svg
        viewBox="0 0 300 400"
        fill="none"
        className={`w-full h-full ${className}`}
      >
        <defs>
          <radialGradient id="wolfGlow" cx="50%" cy="22%" r="42%">
            <stop offset="0%" stopColor="#4a9eff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4a9eff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lambGlow" cx="50%" cy="76%" r="38%">
            <stop offset="0%" stopColor="#c8972a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#c8972a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bg" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#12091e" stopOpacity="1" />
            <stop offset="100%" stopColor="#050508" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="300" height="400" fill="url(#bg)" />

        {/* Wolf atmospheric glow (top half) */}
        <ellipse cx="150" cy="95" rx="140" ry="100" fill="url(#wolfGlow)" />

        {/* Wolf ears */}
        <path d="M80 68 L55 18 L108 55 Z" fill="#0a0a18" stroke="#4a9eff" strokeWidth="0.9" opacity="0.75" />
        <path d="M220 68 L245 18 L192 55 Z" fill="#0a0a18" stroke="#4a9eff" strokeWidth="0.9" opacity="0.75" />
        {/* Inner ear glow */}
        <path d="M83 65 L64 28 L106 54 Z" fill="#4a9eff" opacity="0.08" />
        <path d="M217 65 L236 28 L194 54 Z" fill="#4a9eff" opacity="0.08" />

        {/* Wolf skull silhouette */}
        <path
          d="M65 130 Q85 98 115 88 Q150 78 185 88 Q215 98 235 130 Q255 165 245 195 Q195 165 150 168 Q105 165 55 195 Q45 165 65 130 Z"
          fill="#0a0a14"
          stroke="#4a9eff"
          strokeWidth="0.6"
          opacity="0.55"
        />

        {/* Wolf left eye */}
        <circle cx="112" cy="85" r="20" fill="#4a9eff" opacity="0.1" />
        <circle cx="112" cy="85" r="13" fill="#4a9eff" opacity="0.58" />
        <ellipse cx="112" cy="85" rx="7.5" ry="9" fill="#030309" />
        <circle cx="112" cy="85" r="17" stroke="#4a9eff" strokeWidth="0.5" fill="none" opacity="0.22" />

        {/* Wolf right eye */}
        <circle cx="188" cy="85" r="20" fill="#4a9eff" opacity="0.1" />
        <circle cx="188" cy="85" r="13" fill="#4a9eff" opacity="0.58" />
        <ellipse cx="188" cy="85" rx="7.5" ry="9" fill="#030309" />
        <circle cx="188" cy="85" r="17" stroke="#4a9eff" strokeWidth="0.5" fill="none" opacity="0.22" />

        {/* Wolf teeth suggestion */}
        <path d="M130 130 L133 140 L137 130 L141 140 L145 130 L149 140 L153 130 L157 140 L161 130 L165 140 L169 130"
          stroke="#4a9eff" strokeWidth="0.7" fill="none" opacity="0.25" />

        {/* Lamb atmospheric glow (lower half) */}
        <ellipse cx="150" cy="310" rx="110" ry="90" fill="url(#lambGlow)" />

        {/* Lamb robe/body flowing */}
        <path
          d="M108 385 Q125 295 150 262 Q175 295 192 385 Z"
          fill="#12121e"
          stroke="#c8972a"
          strokeWidth="0.9"
          opacity="0.85"
        />
        {/* Robe hem detail */}
        <path d="M112 375 Q150 378 188 375" stroke="#c8972a" strokeWidth="0.5" fill="none" opacity="0.4" />

        {/* Torso */}
        <ellipse cx="150" cy="265" rx="20" ry="30" fill="#1a1a2e" stroke="#c8972a" strokeWidth="0.9" />

        {/* Head */}
        <circle cx="150" cy="218" r="26" fill="#12121e" stroke="#c8972a" strokeWidth="0.9" />

        {/* Lamb ears */}
        <ellipse cx="131" cy="200" rx="7" ry="12" fill="#c8972a" opacity="0.65" transform="rotate(-18 131 200)" />
        <ellipse cx="169" cy="200" rx="7" ry="12" fill="#c8972a" opacity="0.65" transform="rotate(18 169 200)" />
        {/* Inner ear */}
        <ellipse cx="131" cy="200" rx="4" ry="7" fill="#e8b84b" opacity="0.25" transform="rotate(-18 131 200)" />
        <ellipse cx="169" cy="200" rx="4" ry="7" fill="#e8b84b" opacity="0.25" transform="rotate(18 169 200)" />

        {/* Mask face */}
        <ellipse cx="150" cy="221" rx="17" ry="21" fill="#f2edd7" fillOpacity="0.95" stroke="#c8972a" strokeWidth="0.9" />

        {/* Mask triangle eyes */}
        <path d="M142 217 L138 210 L146 210 Z" fill="#c8972a" />
        <path d="M158 217 L154 210 L162 210 Z" fill="#c8972a" />
        <circle cx="142" cy="215" r="2.5" fill="#030309" />
        <circle cx="158" cy="215" r="2.5" fill="#030309" />

        {/* Nose */}
        <path d="M147 226 L150 223 L153 226" stroke="#c8972a" strokeWidth="0.7" fill="none" opacity="0.5" />

        {/* Bow arc across body */}
        <path d="M100 243 Q150 212 200 243" stroke="#c8972a" strokeWidth="2.2" fill="none" />
        <line x1="150" y1="212" x2="150" y2="268" stroke="#c8972a" strokeWidth="1.1" />
        {/* Arrow */}
        <path d="M143 218 L150 209 L157 218" stroke="#e8b84b" strokeWidth="1.3" fill="none" />

        {/* Death orb / fate light */}
        <circle cx="150" cy="318" r="22" fill="#c8972a" opacity="0.12" stroke="#c8972a" strokeWidth="0.7" strokeDasharray="2 4" />
        <circle cx="150" cy="318" r="13" fill="#c8972a" opacity="0.22" />
        <circle cx="150" cy="318" r="7" fill="#e8b84b" opacity="0.45" />
        <circle cx="150" cy="318" r="3" fill="#f5d07a" opacity="0.8" />

        {/* Rune circle around orb */}
        <circle cx="150" cy="318" r="40" stroke="#c8972a" strokeWidth="0.6" strokeDasharray="3 7" fill="none" opacity="0.35" />

        {/* Floating rune particles */}
        {([
          [78, 158, 1.5, "#c8972a", 0.3],
          [222, 143, 1.5, "#c8972a", 0.28],
          [62, 295, 2, "#4a9eff", 0.22],
          [238, 285, 2, "#4a9eff", 0.22],
          [96, 355, 1.5, "#c8972a", 0.25],
          [204, 348, 1.5, "#c8972a", 0.25],
          [150, 162, 1.2, "#c8972a", 0.2],
          [125, 342, 1.2, "#c8972a", 0.18],
          [175, 335, 1.2, "#c8972a", 0.18],
          [58, 175, 2.5, "#4a9eff", 0.15],
          [242, 195, 2.5, "#4a9eff", 0.15],
        ] as [number, number, number, string, number][]).map(([x, y, r, color, opacity], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={opacity} />
        ))}

        {/* Connector line between Wolf and Lamb (the bond) */}
        <line x1="150" y1="168" x2="150" y2="190" stroke="#c8972a" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.35" />
      </svg>
    );
  }

  // ── Nav icon: minimal Lamb + diamond ──
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={className}>
      {/* Diamond outer frame */}
      <rect
        x="3.5"
        y="3.5"
        width="21"
        height="21"
        stroke="#c8972a"
        strokeWidth="0.9"
        fill="rgba(200,151,42,0.04)"
        transform="rotate(45 14 14)"
        strokeOpacity="0.65"
      />
      {/* Inner diamond */}
      <rect
        x="7"
        y="7"
        width="14"
        height="14"
        stroke="#c8972a"
        strokeWidth="0.4"
        fill="none"
        transform="rotate(45 14 14)"
        strokeOpacity="0.25"
      />
      {/* Mask face */}
      <ellipse cx="14" cy="15.5" rx="5.5" ry="7" fill="#f2edd7" fillOpacity="0.88" stroke="#c8972a" strokeWidth="0.6" />
      {/* Triangle eyes */}
      <path d="M11.5 14.2 L10 11.5 L13 11.5 Z" fill="#c8972a" />
      <path d="M16.5 14.2 L15 11.5 L18 11.5 Z" fill="#c8972a" />
    </svg>
  );
}
