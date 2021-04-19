module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',

     './layouts/**/*.vue',

     './pages/**/*.vue',

     './plugins/**/*.{js,ts}',

     './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        'lg': {
          css: {
            h1: {
              color: theme('colors.gray.500'),
              fontSize: '1.5rem',
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}