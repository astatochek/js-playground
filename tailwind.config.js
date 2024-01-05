/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "theme-background": "#191922",
        "editor-background": "#1f1f28",
        "editor-variable": "#c8c3a6",
        "theme-blue": "#7e9cd8",
        "editor-border": "#33333c",
        "theme-red": "#d8616b",
        "theme-green": "#98bb6c"
      }
    },
  },
  plugins: [],
}

