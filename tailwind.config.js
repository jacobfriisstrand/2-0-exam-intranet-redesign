/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: "1.25rem",
      center: true,
    },
    zIndex: {
      navigation: "9999",
      hide: "-1",
      auto: "auto",
    },
    fontSize: {
      input: "1rem",
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
      transparent: "transparent",
      currentColor: "currentColor",
    },
    fontFamily: {
      body: "system-ui, sans-serif",
      heading: "Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif",
    },
    dropShadow: {
      base: "0px 14px 25px 0px rgba(0, 0, 0, 0.25)",
    },
    borderRadius: {
      none: "0px",
      inner: "0.125rem",
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
      none: "0px",
      base: "0.0625rem",
    },
    outlineWidth: {
      reset: "0px",
      base: "1px",
    },
    backdropBlur: {
      base: "8px",
    },
    backgroundOpacity: {
      base: "0.50",
    },
    screens: {
      xs: "414px",
      sm: "600px",
      md: "800px",
      lg: "1024px",
      xl: "1440px",
      xxl: "1441px",
    },
    extend: {
      height: {
        mobileNavigation: "var(--mobileNavHeight)",
      },
      width: {
        desktopSidebarWidth: "var(--desktopSidebarWidth)",
      },
      margin: {
        desktopSidebarWidth: "var(--desktopSidebarWidth)",
        contentMargin: "var(--contentMargin)",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};
