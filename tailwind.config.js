export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#25B0FF10",
        secondary: "#FFFFFF",
        detail: "#33b0f9",
        text: "#3C3C3C",
        icon: "#7C7C7C",
        inputB: "#25B0FF40",
        input: "#25B0FF10",
        subText: "#DDDDDD",
        danger: "#EB6A6A",
        shadow: "#25B0FF",
        nodata: "#38b59e40",
      },
      screens: {
        extra: "1820px",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
