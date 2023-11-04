/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#3d3d3d",
        light: "#f4f4f4",
        dim: "#a0a0a0",
        cpink: "#be93c5",
        cblue: "#7bb4cc",
        cpinklight: "#ceb9de",
        cbluelight: "#a2bcda",
        cyellow: "#ffc700",
        "cta-left": "rgba(132,148,166,0.60)",
        "cta-right": "rgba(101,109,169,0.60)",
        "panel-light": "rgba(99,99,99,0.4)",
        "panel-darkest": "rgba(34,34,34,0.4)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)"],
        museo: ["var(--font-museo-moderno)"],
      },
      boxShadow: {
        panel: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
