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
        '3xl': '1920px',  // Additional breakpoint for very large screens
      },
      maxWidth: {
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
        'screen-3xl': '1920px',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      containers: {
        xs: '20rem',    // 320px
        sm: '24rem',    // 384px
        md: '28rem',    // 448px
        lg: '32rem',    // 512px
        xl: '36rem',    // 576px
        '2xl': '42rem', // 672px
        '3xl': '48rem', // 768px
        '4xl': '56rem', // 896px
        '5xl': '64rem', // 1024px
        '6xl': '72rem', // 1152px
        '7xl': '80rem', // 1280px
      }
    },
  },
  plugins: [],
}