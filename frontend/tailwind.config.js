/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#0d1b2a",
          deep: "#1b263b",
          ocean: "#415a77",
          mist: "#e0e1dd",
          signal: "#fca311",
          mint: "#2a9d8f",
          coral: "#e76f51"
        }
      },
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 35px rgba(13, 27, 42, 0.12)"
      }
    }
  },
  plugins: [],
};
