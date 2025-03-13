// hackabyte/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F93236',
        secondary: '#FF003C',
        accent: '#FF2247',
        dark: {
          DEFAULT: '#1A1A1E',
          lighter: '#16161A',
          lightest: '#1E1E22',
        },
      },
      screens: {
        'xs': '375px',     // Small phones
        'sm': '640px',     // Default sm breakpoint
        'md': '768px',     // Default md breakpoint
        'lg': '1024px',    // Default lg breakpoint
        'xl': '1280px',    // Default xl breakpoint
        '2xl': '1536px',   // Standard 2xl breakpoint
        '3xl': '1920px',   // 2K screens
        '4xl': '2560px',   // 4K screens
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },
    },
  },
  plugins: [],
}
