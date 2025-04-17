import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        bp3: "1050px",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
