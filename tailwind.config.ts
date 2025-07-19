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
      fontFamily: {
        raleway: ["var(--font-raleway)", "sans-serif"],
        josefin: ["var(--font-josefin-sans)", "sans-serif"],
      },
      fontWeight: {
        'josefin-light': '300',
        'josefin-normal': '400',
        'josefin-medium': '500',
        'josefin-semibold': '600',
        'josefin-bold': '700',
      },
    },
  },
  plugins: [],
} satisfies Config;
