# Flintzy Social Media Scheduler

A frontend implementation of a social media publishing queue for the Flintzy assignment. It lets a user review scheduled posts, filter the queue, create a post for multiple platforms, and retry a failed publish attempt.

## Features

- Queue populated from local JSON data with 32 posts
- Posts grouped by local calendar day: Today, Tomorrow, or a formatted date
- Platform, status, and text search filters stored in the URL
- Post cards with publishing status, social platform icons, local schedule time, and optional media preview
- Post composer with multi-platform selection, image URL validation, future date validation, and per-platform character limits
- Local date and time converted to UTC before a post is saved
- Failed post retry flow with a visible processing state and simulated success or failure response
- Queue totals for scheduled, published, and failed posts
- Empty, loading, and error states
- Responsive workspace layout with a mobile navigation drawer

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Lucide React
- React Icons
- Local JSON mock data

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev
npm run lint
npm run build
```

## Project structure

```text
src/
├── app/
│   ├── (workspace)/
│   │   ├── analytics/
│   │   ├── dashboard/
│   │   └── publishing/
│   ├── error.tsx
│   └── loading.tsx
├── components/
│   ├── composer/
│   ├── dashboard/
│   ├── filters/
│   ├── queue/
│   ├── shared/
│   └── sidebar/
├── data/posts.json
├── lib/
└── types/
```

## Key decisions

- Routes sit inside a `(workspace)` route group so Dashboard, Analytics, and Publishing share the same application shell without changing their URLs.
- The workspace shell owns navigation, the responsive sidebar, and the header. Each route only renders its own page content.
- The publishing page loads the initial post data on the server. Search, filters, the composer, modal, retry action, and mobile navigation are client-side because they respond to user input.
- Components are grouped by feature: queue, composer, filters, sidebar, and shared UI. This keeps the publishing page focused on composing those pieces together.
- The layout uses a persistent sidebar on larger screens and a drawer on smaller screens. The publishing controls stay in the Publishing header, while Dashboard and Analytics use a simpler header.
- Queue states are explicit: loading placeholders, a filter empty state, retry feedback, and an application error screen. A newly scheduled post is highlighted and scrolled into view.
- Scheduled dates are stored as UTC values and shown in the browser's local time zone. Search and filter values use query parameters so the current queue view can be refreshed or shared.

## Scope and assumptions

This is a frontend-only assignment project. Posts are held in local component state after the initial JSON load. There is no database, authentication flow, real social network integration, file upload service, or persistent API.

Image previews use a public image URL entered in the composer. A new post is inserted into the queue according to its scheduled date and time, then highlighted so it is easy to find.
