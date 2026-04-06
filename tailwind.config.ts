/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Runeterra palette
        void: "#050508",
        obsidian: "#0a0a0f",
        slate: "#12121a",
        ivory: "#f2edd7",
        gold: "#c8972a",
        "gold-light": "#e8b84b",
        "gold-dim": "#8a6520",
        azure: "#4a9eff",
        "azure-glow": "#2d7dd2",
        mystic: "#7c5cbf",
        death: "#1a0a2e",
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cinzel-decorative)", "Georgia", "serif"],
      },
      backgroundImage: {
        "runeterra-gradient": "radial-gradient(ellipse at center, #1a0a2e 0%, #050508 70%)",
        "gold-gradient": "linear-gradient(135deg, #c8972a 0%, #e8b84b 50%, #c8972a 100%)",
        "azure-gradient": "linear-gradient(135deg, #1a3a5c 0%, #2d7dd2 50%, #1a3a5c 100%)",
        "kindred-gradient": "radial-gradient(ellipse at top, #2d1b4e 0%, #050508 60%)",
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(200, 151, 42, 0.4), 0 0 60px rgba(200, 151, 42, 0.1)",
        "azure-glow": "0 0 20px rgba(74, 158, 255, 0.4), 0 0 60px rgba(74, 158, 255, 0.1)",
        "mystic-glow": "0 0 30px rgba(124, 92, 191, 0.5), 0 0 80px rgba(124, 92, 191, 0.2)",
        "card-dark": "0 8px 32px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "write": "write 0.05s steps(1) forwards",
        "flicker": "flicker 4s linear infinite",
        "rune-spin": "rune-spin 20s linear infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(200, 151, 42, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(200, 151, 42, 0.8), 0 0 80px rgba(200, 151, 42, 0.3)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.8" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.9" },
          "97%": { opacity: "1" },
        },
        "rune-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
