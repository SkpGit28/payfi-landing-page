/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#166C8F",
          "primary-hover": "#115672",
          "primary-active": "#0D4258",
          "primary-light": "#EDF6F9",
        },
        secondary: {
          base: "#153145",
          light: "#2A4B63",
          dark: "#0D1F2C",
        },
        ink: {
          base: "#020617",
          light: "#0F172A",
        },
        page: {
          light: "#F5F8FA",
          "light-alt": "#F2F5F8",
          dark: "#0B1A24",
        },
        card: {
          light: "#FFFFFF",
          dark: "#153145",
        },
        modal: {
          overlay: "rgba(21, 49, 69, 0.6)",
        },
        nav: {
          bg: "#153145",
          border: "#0D1F2C",
          text: "#BCCCDC",
          "text-hover": "#FFFFFF",
          "text-active": "#166C8F",
        },
        cta: {
          bg: "#166C8F",
          text: "#FFFFFF",
          "bg-hover": "#125672",
          "bg-active": "#0E455C",
          "bg-disabled": "#DAE3E8",
          "text-disabled": "#94A3B8",
        },
        text: {
          primary: "#153145",
          secondary: "#546E7A",
          muted: "#90A4AE",
          "on-dark": "#FFFFFF",
          link: "#166C8F",
          "link-hover": "#125672",
        },
        border: {
          default: "#E1E8ED",
          active: "#166C8F",
          divider: "#ECEFF1",
        },
        icon: {
          default: "#546E7A",
          active: "#166C8F",
          "on-dark": "#BCCCDC",
        },
        status: {
          "success-bg": "#E6F4EA",
          "success-text": "#1E7E34",
          "warning-bg": "#FFF8E1",
          "warning-text": "#F57F17",
          "error-bg": "#FCE8E6",
          "error-text": "#C62828",
        },
      },
      fontFamily: {
        technical: ["Space Grotesk"],
        interface: ["Inter"],
        sans: ["Inter"],
      },
      letterSpacing: {
        interface: "-0.02em",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'h1, h2, h3, h4, h5, h6': {
          letterSpacing: theme('letterSpacing.interface'),
        },
      })
    },
  ],
}
