/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        'mobile' : "340px"
      },
      maxWidth : {
        'pc' : "1024px",
        'login' : "492px"
      },
      width :{
        '49%' : "49%"
      },
      content : {
        'unchecked' : 'url("../src/asset/imgs/unchecked.svg")'
      },
      backgroundImage: {
        'unchecked' : 'url("../src/asset/imgs/unchecked.svg")',
        'checked' : 'url("../src/asset/imgs/checked.svg")'
      },
      backgroundColor:{
        'main' : "#FF6347"
      },
      colors : {
        'red' : "#FF0000"
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

