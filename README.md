# Flintzy Social Media Scheduler

A frontend-only social media post scheduler for Facebook, Instagram, X, and TikTok. This project is being built in small, reviewable steps from the Flintzy assignment.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project setup

The project was scaffolded with Next.js App Router, TypeScript, Tailwind CSS, and ESLint:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias '@/*' --use-npm --yes
```

The generated experimental caching options were removed. The generated agent instructions are disabled to keep the repository free of `AGENTS.md` files.

## Technical decisions

- Use Next.js App Router with TypeScript and Tailwind CSS.
- Keep components server rendered by default and add client boundaries only for browser interactions.
- Keep post data in local JSON and use React state for frontend interactions; there is no backend, database, authentication, or real social platform integration.
- Store scheduled timestamps in UTC and format them in the viewer's local time zone.
- Keep search and filter choices in URL query parameters so links can be refreshed and shared.
- Mock API behavior in the frontend, including retry delays and failures.

## Progress

- Project scaffold created and local development server configured for `127.0.0.1:3000`.
- Post queue, mock data, composer, filters, retry behavior, responsive layout, and submission setup are still to be implemented.

This README will be updated alongside the implementation with completed features, setup details, and project assumptions.
