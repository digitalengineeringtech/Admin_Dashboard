/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FAFAFA",
        secondary: "#FFFFFF",
        detail: "#45B54B",
        text: "#3C3C3C",
        icon: "#7C7C7C",
        input: "#EEEEEE",
        subText: "#DDDDDD",
        danger: "#EB6A6A",
      },
    },
  },
  plugins: [],
};
