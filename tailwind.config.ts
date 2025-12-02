import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-xl': '75rem',
        'screen-2xl': '83.75rem'
      },
      boxShadow: {
        'cause-shadow': '0px 4px 17px 0px #00000008',
        'card': '0 4px 20px rgba(0, 123, 127, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 123, 127, 0.15)',
        'button': '0 4px 14px rgba(0, 123, 127, 0.25)',
      },
      transitionDuration: {
        '150': '150ms',
      },
      spacing: {
        '6.25': '6.25rem',
        '70%': '70%',
        '40%': '40%',
        '30%': '30%',
        '80%': '80%',
        8.5: '8.5rem',
        50: '50rem',
        51: "54.375rem",
        25: '35.625rem',
        29: '28rem',
        120: '120rem',
        45: '45rem',
        94: '22.5rem',
        85: '21rem',
        3.75: '3.75rem'
      },
      inset: {
        '5%': '5%',
        '35%': '35%'
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '999': '999'
      },
      colors: {
        primary: "#007b7f",
        secondary: "#b2e3e3",
        midnight_text: "#07212F",
        muted: "#7D8A99",
        error: "#FF0000",
        warning: "#FF7B00",
        light_grey: "#808080",
        grey: "#eef4f7",
        dark_grey: "#444",
        border: "#E1E1E1",
        success: "#085308",
        section: "#7D8A99",
        darkmode: "#07212F",
        darklight: "#007b7f",
        dark_border: "#7D8A99",
        tealGreen: "#007b7f",
        charcoalGray: "#444",
        deepSlate: "#07212F",
        slateGray: "#07212F",
        background: "#eef4f7",
        yellow: "#FFA500",
        orange: "#FF7B00",
        surface: "#ffffff",
      },
      fontSize: {
        86: [
          "5.375rem",
          {
            lineHeight: "1.2",
          }
        ],
        76: [
          "4.75rem",
          {
            lineHeight: "1.2",
          }
        ],
        70: [
          "4.375rem",
          {
            lineHeight: "1.2",
          }
        ],
        54: [
          "3.375rem",
          {
            lineHeight: "1.2",
          }
        ],
        44: [
          "2.75rem",
          {
            lineHeight: "1.3",
          }
        ],
        40: [
          "2.5rem",
          {
            lineHeight: "3rem",
          },
        ],
        36: [
          "2.25rem",
          {
            lineHeight: "2.625rem",
          },
        ],
        32: [
          "2rem",
          {
            lineHeight: "2.5rem",
          },
        ],
        30: [
          "1.875rem",
          {
            lineHeight: "2.25rem",
          },
        ],
        28: [
          "1.75rem",
          {
            lineHeight: "2.25rem",
          },
        ],
        24: [
          "1.5rem",
          {
            lineHeight: "2rem",
          },
        ],
        22: [
          "1.375rem",
          {
            lineHeight: "2rem",
          },
        ],
        21: [
          "1.3125rem",
          {
            lineHeight: "1.875rem",
          },
        ],
        18: [
          "1.125rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        17: [
          "1.0625rem",
          {
            lineHeight: "1.4875rem",
          },
        ],
        16: [
          "1rem",
          {
            lineHeight: "1.6875rem",
          },
        ],
        14: [
          "0.875rem",
          {
            lineHeight: "1.225rem",
          },
        ],
      },
      backgroundImage: {
        "start": "url('/images/work/bg-start.png')",
        "perk": "url('/images/perks/perk-bg.png')",
      },
      blur: {
        220: '220px',
        400: '400px',
      }
    },
  },
  plugins: [],
};
export default config;
