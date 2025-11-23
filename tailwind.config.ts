import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import twAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/lib/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/ui/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        cta: "var(--color-cta)",
        "cta-hover": "var(--color-cta-hover)",
        "warm-accent": "var(--color-warm-accent)",
        success: "var(--color-success)",
        border: "var(--color-border)",
        "text-muted": "var(--color-text-muted)",
        bg: "var(--color-bg)",
        "bg-soft": "var(--color-bg-soft)",
      },
      ringColor: {
        DEFAULT: "var(--color-focus-ring)",
        focus: "var(--color-focus-ring)",
      },
      borderRadius: {
        md: "0.5rem",
      },
    },
  },
  plugins: [forms, twAnimate],
} satisfies Config;

export default config;