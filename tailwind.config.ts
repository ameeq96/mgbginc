import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#071423",
        navy: "#0B1F33",
        teal: "#1F9A8A",
        tealDark: "#11675E",
        gold: "#C8A44D",
        mist: "#F4F7F8",
        paper: "#FBFCFC",
        graphite: "#25313F"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(7, 20, 35, 0.12)",
        lift: "0 18px 45px rgba(7, 20, 35, 0.16)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease both",
        "soft-pulse": "softPulse 6s ease-in-out infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        softPulse: {
          "0%, 100%": { opacity: "0.74" },
          "50%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};

export default config;
