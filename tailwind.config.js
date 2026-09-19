/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        navy: { 950:'#04182c', 900:'#06213d', 800:'#0a3055', 700:'#0d4272', 600:'#135b98', 500:'#1a76bf' },
        saffron: { 600:'#d97008', 500:'#f2860d', 400:'#f9a53c' },
        moss: { 600:'#0b7a53', 500:'#0e8a5f' }
      },
      fontFamily: {
        sans: ['Inter','ui-sans-serif','system-ui','sans-serif'],
        display: ['"Plus Jakarta Sans"','Inter','sans-serif']
      },
      maxWidth: { shell: '1200px' }
    }
  },
  plugins: []
};
