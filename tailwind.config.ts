import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#07090d", panel: "#0d1118", line: "#202936", cyan: "#7dd3fc" } } },
  plugins: [],
};
export default config;
