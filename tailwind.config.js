/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        tc1: "var(--tobatsu-color-1)",
        tc2: "var(--tobatsu-color-2)",
        tc3: "var(--tobatsu-color-3)",
        tc4: "var(--tobatsu-color-4)",
        tc5: "var(--tobatsu-color-5)",
        "tc-background": "var(--tobatsu-background)",
        "tc-background-light": "var(--tobatsu-background-light)",
      },
    },
  },
  plugins: [],
};
