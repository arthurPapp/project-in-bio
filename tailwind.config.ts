import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-primary": "#050505",
        "background-secondary": "#0F0F10",
        "background-tertiary": "#19191A",
        "content-heading": "#FFFFFF",
        "content-body": "#CDCBCC",
        "content-placeholder": "#827D7F",
        "content-headline": "#B2B2B2",
        "border-primary": "#19191A",
        "border-secundary": "#323234",
        "border-tertiary": "#97979B",
        "accent-purple": "#4B2DBB",
        "accent-green": "#87BB2D",
        "accent-blue": "#30B9E3",
        "accent-pink": "#B5446B",
        "accent-yellow": "#DCCB2E",
        "accent-purple-dark": "#171031",
        "accent-blue-dark": "#102831",
        "accent-green-dark": "#222D26",
        "accent-pink-dark": "#2C1A22",
        "accent-yellow-dark": "#282A0F",
      },
    },
  },
  plugins: [],
} satisfies Config;

