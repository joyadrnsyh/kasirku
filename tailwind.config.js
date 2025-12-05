import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(
    {
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#C82870",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#5399d3ff",
              foreground: "#ffffff",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#9353D3",
              foreground: "#ffffff",
            },
          },
        },
      },

    }
  )],
}
