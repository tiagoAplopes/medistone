import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "#B8860B",       // Cor dourada para a logo e menu
        goldLight: "#D4AF37",  // Variação mais clara para hover
        goldDark: "#8B6914",   // Variação mais escura
      },
    },
  },
  plugins: [],
} satisfies Config;
