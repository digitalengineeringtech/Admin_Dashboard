export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#eff4f2",
        secondary: "#FFFFFF",
        detail: "#25B0FF",
        text: "#3C3C3C",
        icon: "#7C7C7C",
        inputB: "#25B0FF30",
        input: "#25B0FF10",
        subText: "#DDDDDD",
        danger: "#EB6A6A",
        shadow: "#3aaf94",
        nodata: "#38b59e40",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
