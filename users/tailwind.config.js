const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideLeftRight: {
          "0%": { transform: "translateX(-30%)" },
          "50%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(80%)" },
        },
        'scale-up': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        slideLeftRight: "slideLeftRight 10s ease-in-out infinite",
        'scale-up': 'scale-up 0.3s ease-in-out',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  plugins: [],
});
