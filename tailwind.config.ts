/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'app/components/**/*.{vue,js,ts}',
    'app/layouts/**/*.{vue,js,ts}',
    'app/pages/**/*.{vue,js,ts}',
    'app/App.{js,ts,vue}',
    'app/app.{js,ts,vue}',
    'app/Error.{js,ts,vue}',
    'app/error.{js,ts,vue}',
    'app/content/**/*.md',
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.75rem', '0.875rem'],
      sm: ['0.875rem', '1.0625rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.5625rem'],
      xl: ['1.5rem', '1.875rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3.125rem'],
      '4xl': ['3rem', '3.625rem'],
      '5xl': ['3.5rem', '4.1875rem'],
    },
    fontFamily: {
      main: ['Sansation', 'sans-serif'],
      sub: ['Dancing Script', 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      regular: 400,
      'semi-bold': 500,
      bold: 600,
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      light: {
        400: '#F9F8F2',
        500: '#D9D9D9',
        600: '#ABABAB',
      },
      black: '#000000',
      dark: {
        400: '#10121E',
        500: '',
        600: '',
      },
      primary: {
        400: '#ADE1A2',
        500: '#98DA8B',
        600: '#66CD5B',
      },
      success: {
        400: '#89E774',
        500: '#4AD42B',
        600: '#66BE52',
      },
      warning: {
        400: '#F0CD42',
        500: '#ECC113',
        600: '#D7B942',
      },
      alert: {
        400: '#F24067',
        500: '#E11D48',
        600: '#C02650',
      },
    },
  },
}
