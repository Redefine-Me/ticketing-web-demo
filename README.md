# Redefine Me - Event Discovery Platform

A modern, Luma-inspired event discovery website for UK university society events. Built with Next.js, TypeScript, and TailwindCSS.

## Quick Start

### Unified mode (recommended)

From the project root:
```bash
cd <project-root>
npm install
npm run dev
```

This starts both apps together. Open:
- Dashboard: http://localhost:3000
- Mobile app (proxied through dashboard server): http://localhost:3000/mobile

### Mobile standalone mode

From the `web` directory:
```bash
cd <project-root>/web
npm install
npm run dev
```

Open:
- Mobile app standalone: http://localhost:3001

## Features

- **Event Discovery**: Browse events from university societies across the UK
- **Filtering**: Filter by city, university, category, or search keywords
- **Event Details**: Detailed event pages with registration links
- **City & University Pages**: Dedicated pages for location-based discovery
- **Responsive Design**: Mobile-first, accessible design

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React 18**

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── events/[slug]/     # Event detail pages
│   ├── cities/[citySlug]/ # City discovery pages
│   ├── universities/       # University discovery pages
│   └── about/             # About page
├── components/             # Reusable React components
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── FilterPills.tsx
│   ├── EventCard.tsx
│   ├── EventGrid.tsx
│   └── Footer.tsx
├── data/                   # Mock data
│   └── mockEvents.ts      # 25+ mock events
└── utils/                  # Utility functions
    ├── dateUtils.ts       # Date formatting helpers
    └── eventUtils.ts      # Event filtering/sorting
```

## Key Features

### Home Page (`/`)
- Hero section with clear value proposition
- Search bar for filtering events
- Category filter pills
- Sort dropdown (Soonest, Trending, Newest)
- "This week" and "Trending" sections
- Paginated event grid

### Event Detail Page (`/events/[slug]`)
- Large cover image
- Key information (date, time, location, etc.)
- Event description
- Tags
- Social proof (interested/saved counts)
- Primary CTA: "Register" (external link)
- Secondary CTA: "Get reminders in the app"
- Related events section

### City Page (`/cities/[citySlug]`)
- Pre-filtered events by city
- Same search/filter/sort functionality
- CTA to get the app

### University Page (`/universities/[uniSlug]`)
- Pre-filtered events by university
- Same search/filter/sort functionality
- CTA to get the app

## Mock Data

The app uses mock data from `src/data/mockEvents.ts` with 25+ realistic UK university events. Each event includes:
- Title, description, date/time
- City, university, society name
- Location, image URL
- External registration URL
- Tags, social proof counts
- Price label

## Design System

The app uses a minimal, Luma-inspired design with:
- **Font**: Space Grotesk (modern, student-friendly)
- **Colors**: Defined in Tailwind config (matches existing design tokens)
- **Spacing**: Consistent padding and margins
- **Components**: Reusable, accessible components

## Notes

- **No Backend**: All data is client-side mock data
- **No Authentication**: Public discovery layer only
- **External Ticketing**: All events redirect to external registration links
- **Responsive**: Mobile-first design, works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation

## Development

The project uses:
- TypeScript for type safety
- TailwindCSS for styling
- Next.js Image optimization
- Client-side filtering and sorting
- Static generation for event pages

## License

Private project - All rights reserved




