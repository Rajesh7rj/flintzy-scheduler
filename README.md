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

## Implementation notes

The publishing page reads the local post data on the server. Interactive pieces such as search, filters, the composer, modal, mobile navigation, and retry state run in client components.

`scheduledAt` is stored as an ISO UTC value. Dates shown in the queue use the browser's local time zone. Search and filter values are kept in `q`, `platform`, and `status` query parameters, so the current queue view can be refreshed or shared.

When a failed post is retried, the UI shows a processing state for one second. The mock request succeeds most of the time and changes the post to `scheduled`; a simulated failure returns it to `failed` with an error message.

## Scope and assumptions

This is a frontend-only assignment project. Posts are held in local component state after the initial JSON load. There is no database, authentication flow, real social network integration, file upload service, or persistent API.

Image previews use a public image URL entered in the composer. A new post is inserted into the queue according to its scheduled date and time, then highlighted so it is easy to find.
