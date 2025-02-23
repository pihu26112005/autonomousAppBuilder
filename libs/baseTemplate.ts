import { FileItem } from "@/types";

export const reactBaseTemplate: FileItem[] = [
  {
    name: "eslint.config.js",
    type: "file",
    path: "/eslint.config.js",
    content: `
 import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import * as tseslint from '@typescript-eslint/eslint-plugin';

export default {
  ignores: ['dist'],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
 `
  },
  {
    name: "index.html",
    type: "file",
    path: "/index.html",
    content: ` <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
  },

  {
    name: "package.json",
    type: "file",
    path: "/package.json",
    content: `{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.3"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}`
  },
  {
    name: "postcss.config.js",
    type: "file",
    path: "/postcss.config.js",
    content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}; `
  },
  {
    name: "tailwind.config.js",
    type: "file",
    path: "/tailwind.config.js",
    content: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`
  },
  {
    name: "sconfig.app.json",
    type: "file",
    path: "/sconfig.app.json",
    content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`
  },
  {
    name: "tsconfig.json",
    type: "file",
    path: "/tsconfig.json",
    content: `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`
  },
  {
    name: "tsconfig.node.json",
    type: "file",
    path: "/tsconfig.node.json",
    content: ` {
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}`
  },
  {
    name: "vite.config.ts",
    type: "file",
    path: "/vite.config.ts",
    content: ` import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});`
  },
  {
    name: "tsconfig.app.json",
    type: "file",
    path: "/tsconfig.app.json",
    content: ` 
    {
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
`
  },
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "App.tsx",
        type: "file",
        path: "/src/App.tsx",
        content: `import React from 'react';
        
        function App() {
          return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <p>Start prompting (or ) to see magic happen :)</p>
            </div>
          );
        }
        
        export default App;`
      },
      {
        name: "index.css",
        type: "file",
        path: "/src/index.css",
        content: `@tailwind base;
        @tailwind components;
        @tailwind utilities;`
      },
      {
        name: "main.tsx",
        type: "file",
        path: "/src/main.tsx",
        content: `
        import { createRoot } from 'react-dom/client';
        import App from './App.tsx';
        import './index.css';
        
        createRoot(document.getElementById('root')!).render(
            <App />
        );`
      },
      {
        name: "vite-env.d.ts",
        type: "file",
        path: "/src/vite-env.d.ts",
        content: ` /// <reference types="vite/client" />`
      },
    ],
    path: "/src"
  }

];
