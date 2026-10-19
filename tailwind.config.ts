import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: "var(--saffron)",
          hover: "#D07412",
          light: "#FDF4E7",
        },
        marigold: {
          DEFAULT: "var(--marigold)",
          light: "#FEF7E6",
        },
        maroon: {
          DEFAULT: "var(--maroon)",
          hover: "#551623",
          light: "#F9EEF0",
        },
        teal: {
          DEFAULT: "var(--teal)",
          hover: "#0B5555",
          light: "#E7F3F3",
        },
        cream: {
          DEFAULT: "var(--cream)",
          card: "#FFFFFF",
          muted: "#FAF2E4",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "#60504B",
          subtle: "#8A7974",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        card: "var(--radius)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        button: "var(--shadow-button)",
        floating: "0 12px 36px rgba(43, 27, 23, 0.16)",
      },
      fontFamily: {
        sans: ["var(--font-hind)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
