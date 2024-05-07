/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      baseSmall: "0.75rem",
      base: "0.875rem",
      baseLarge: "1rem",
      step1: "1.25rem",
      step2: "1.5rem",
      step3: "1.75rem",
      step4: "2rem",
      step5: "2.25rem",
      step6: "2.5rem",
    },
    colors: {
      black: "#121212",
      white: "#EDEDED",
      lightGray: "#BFBFBF",
      darkGray: "#383838",
      accent: "#4466FF",
      success: "#61D161",
      warning: "#EDC25E",
      danger: "#E23636",
      overlay: "rgba(0, 0, 0, 0.7)",
      transparent: "transparent",
      currentColor: "currentColor",
    },
    transitionProperty: {
      base: "all 250ms cubic-bezier(0,0,.2,1)",
    },
    fontFamily: {
      body: "system-ui, sans-serif",
      heading: "Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif",
    },
    dropShadow: {
      base: "0px 14px 25px 0px rgba(0, 0, 0, 0.25)",
    },
    borderRadius: {
      base: "0.25rem",
    },
    borderColor: {
      white: "#EDEDED",
      black: "#121212",
      accent: "#4466FF",
      lightGray: "#BFBFBF",
      darkGray: "#383838",
    },
    borderWidth: {
      base: "0.0625rem",
    },
    outlineWidth: {
      reset: "0px",
      base: "1px",
    },
    backdropBlur: {
      base: "15px",
    },
    screens: {
      xs: "414px",
      sm: "600px",
      md: "800px",
      lg: "1024px",
      xl: "1440px",
      xxl: "1441px",
    },
  },
  plugins: [],
};
