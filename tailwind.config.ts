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
        healthcare: {
          teal: "#087E8B",
          tealHover: "#066772",
          tealPale: "#E7F4F3",
          navy: "#123047",
          navyLight: "#1C4566",
          bgPrimary: "#FFFFFF",
          bgSecondary: "#F3F7F8",
          textPrimary: "#243746",
          textSecondary: "#647480",
          border: "#DDE5E9",
          success: "#18794E",
          warning: "#A15C00",
          error: "#B42318",
          emergency: "#B42318",
        },
        navy: {
          DEFAULT: "var(--navy-headings)",
          light: "#1C4566",
        },
        saffron: {
          DEFAULT: "var(--saffron)",
          hover: "#066772",
          light: "#E7F4F3",
        },
        marigold: {
          DEFAULT: "var(--marigold)",
          light: "#FEF7E6",
        },
        maroon: {
          DEFAULT: "var(--maroon)",
          hover: "#0C2335",
          light: "#F0F5F8",
        },
        teal: {
          DEFAULT: "var(--teal)",
          hover: "#066772",
          light: "var(--teal-pale)",
        },
        cream: {
          DEFAULT: "var(--cream)",
          card: "#FFFFFF",
          muted: "var(--bg-secondary)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--text-secondary)",
          subtle: "#8A9AA5",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        card: "var(--radius)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        button: "var(--shadow-button)",
        dropdown: "var(--shadow-dropdown)",
        floating: "0 12px 36px rgba(18, 48, 71, 0.12)",
      },
      fontFamily: {
        sans: [
          "var(--font-hind)",
          "system-ui",
          "-apple-system",
          "'Noto Sans Devanagari'",
          "'Noto Sans Kannada'",
          "'Noto Sans Tamil'",
          "'Noto Sans Telugu'",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
