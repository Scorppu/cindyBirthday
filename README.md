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

Page content is defined in [`src/main.jsx`](src/main.jsx) in the `initialPages` array. Add, remove, or rearrange page objects to change the book. Each page supports a `label` and JSX `content`.

```jsx
{
  id: 'my-page',
  label: 'A New Chapter',
  content: <section className="chapter-content">...</section>,
}
```

Styling for the viewer, pages, controls, and editor lives in [`src/styles.css`](src/styles.css).

## Notes

Edits made through the in-browser **Edit page** control are kept only in the current browser session. To persist content, update `initialPages` in `src/main.jsx`.

## License

This project is private and does not currently include a license.
