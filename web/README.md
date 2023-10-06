npm create vite@latest

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init

crie um arquivo postcss.config.cjs

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

adicione `content: ["./src/**/*.{html,jsx,tsx}"]` está linha no tailwind.config.cjs

npm install phosphor-react 

npm install axios

npm install react-router-dom

npm i js-cookie

npm install --save react-toastify