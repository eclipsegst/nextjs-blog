# Next.js with TypeScript starter

This is a starter template for Next.js with TypeScript.

## Getting Started

### Configure local environment
Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):
```
cp .env.local.example .env.local
```

Configurate DATABASE_URL,
```
cp .env.local /prisma/.env
mv ./prisma/.env.local ./prisma/.env
```
Follow [prisma/README](prisma/README.md) for migration.

### Run
```bash
npm run dev
```

## Stack
- [React](https://github.com/facebook/react/)
- [Next.js](https://github.com/vercel/next.js)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Styled-Components](https://styled-components.com/)
- [Polished](https://github.com/styled-components/polished): A lightweight toolset for writing styles in JavaScript.
- [gray-matter](https://github.com/jonschlinkert/gray-matter): Parse front-matter from a string or file
- [remark](https://github.com/remarkjs/remark): A tool that transforms markdown with plugins

## Reference
- [Learn Next.js](https://github.com/vercel/next-learn)
- [A statically generated blog example using Next.js, Markdown, and TypeScript](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
