# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# ENV - MODE (development, qc, production)

### hosting FE
- development: https://quiz.dev.com
- qc: https://quiz.qc.com
- production: https://quiz.com

### API BE
- BE_API: https://opentdb.dev.com (development)
- BE_API: https://opentdb.qc.com (qc)
- BE_API: https://opentdb.com (production)

- .env -> load all variable for all MODE
- .env.local -> override .env
- .env.development -> npm run build --mode development
- .env.qc -> npm run build --mode qc
- .env.production -> npm run build --mode production