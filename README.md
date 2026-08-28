# Book & Quill

A small, book-inspired React experience for presenting a collection of pages. Visitors can browse pages with the arrow controls or keyboard, and edit the current page in the browser.

## Tech stack

- React
- Vite
- Lucide React icons
- Plain CSS

## Getting started

### Prerequisites

- Node.js 18 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (normally `http://localhost:5173`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally. |

## Customizing the book

Page content is defined in [`src/book-data.tsx`](src/book-data.tsx) in the `spreads` array. Rendering is split into [`src/components/BookViewer.tsx`](src/components/BookViewer.tsx), [`src/components/Page.tsx`](src/components/Page.tsx), and [`src/components/Collage.tsx`](src/components/Collage.tsx).

Each spread can provide its own `backgroundImage`. Pages can also provide a collage of polaroid images:

```tsx
{
  id: 'chapter-three',
  label: 'Chapter III',
  backgroundImage: '/backgrounds/forest.png',
  left: {
    eyebrow: 'CHAPTER III',
    title: 'A New Memory',
    body: <p>...</p>,
    images: [
      { id: 'lake', src: '/photos/lake.jpg', alt: 'A lake at sunset', rotation: -4 },
      { id: 'trail', src: '/photos/trail.jpg', alt: 'A forest trail', rotation: 3 },
    ],
  },
  right: { body: <p>...</p> },
}
```

Styling for the viewer, pages, controls, and collage lives in [`src/styles.css`](src/styles.css).

## License

This project is private and does not currently include a license.
