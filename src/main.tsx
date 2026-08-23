import { createRoot } from 'react-dom/client';
import { useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './styles.css';

// Put a background image in public/backgrounds/ and set this path.
// Leave empty to keep the transparent default background.
const BACKGROUND_IMAGE = '/backgrounds/minecraft-scene.png';
const BOOK_TEXTURE = '/textures/book.png';

export type BookPageData = {
  id: string;
  label: string;
  texture?: string;
  content: ReactNode;
};

/**
 * Add, remove, or rearrange these objects to create your own book.
 * `content` accepts any React node, so each page can have custom markup.
 * Add Minecraft textures to `public/textures/` and reference them with
 * `/textures/your-file.png`. PNG, JPG, and WebP files are supported.
 */
const initialPages: BookPageData[] = [
  {
    id: 'cover',
    label: 'Welcome',
    // texture: '/textures/enchanting-table.png',
    content: (
      <section className="cover-content">
        <p className="chapter-label">A BOOK FOR</p>
        <h1>Dreamers</h1>
        <div className="vine-divider"><span>✦</span></div>
        <p className="cover-intro">Little moments<br />for you.</p>
        <p className="author-line">With love</p>
      </section>
    ),
  },
  {
    id: 'chapter-one',
    label: 'Chapter I',
    // texture: '/textures/paper-grid.png',
    content: (
      <section className="chapter-content">
        <p className="chapter-label">CHAPTER I</p>
        <h2>The First Step</h2>
        <p>Every great adventure begins with a single step beyond the familiar.</p>
        <p>Past the old oak tree and across the whispering meadow, the path waits for those willing to follow it.</p>
        <blockquote>“Not all those who wander are lost.”</blockquote>
        <p>Keep your eyes open. The world has a funny way of leaving small wonders in unexpected places.</p>
      </section>
    ),
  },
  {
    id: 'chapter-two',
    label: 'Chapter II',
    content: (
      <section className="chapter-content">
        <p className="chapter-label">CHAPTER II</p>
        <h2>Notes from the Road</h2>
        <p>Pack lightly, listen closely, and leave a little room for the things you have not discovered yet.</p>
        <ul><li>A map with no destination</li><li>A pocket full of sunlight</li><li>A reason to look up</li></ul>
      </section>
    ),
  },
];

type PageArrowProps = {
  direction: 'previous' | 'next';
  onClick: () => void;
  disabled: boolean;
};

function PageArrow({ direction, onClick, disabled }: PageArrowProps) {
  const Icon = direction === 'previous' ? ChevronLeft : ChevronRight;
  return (
    <button className={`page-arrow ${direction}`} onClick={onClick} disabled={disabled} aria-label={`${direction} page`}>
      <Icon size={29} strokeWidth={1.5} />
    </button>
  );
}

type BookPageProps = {
  children: ReactNode;
  pageNumber: number;
  totalPages: number;
  texture?: string;
};

/** Reusable page wrapper. Supply anything as `children` for a custom page. */
function BookPage({ children, pageNumber, totalPages, texture }: BookPageProps) {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>('.paper-page');
    const content = page?.querySelector<HTMLElement>('.page-content');
    if (!page || !content) return;

    const checkOverflow = () => {
      const hasOverflow = content.scrollHeight > content.clientHeight || content.scrollWidth > content.clientWidth;
      if (hasOverflow) {
        console.warn(`Page ${pageNumber} has too much content. Move the extra content to a new page.`);
      }
    };

    if (!import.meta.env.DEV) return;

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(content);
    void document.fonts.ready.then(checkOverflow);
    checkOverflow();
    return () => observer.disconnect();
  }, [pageNumber, totalPages, children]);

  return (
    <article className="paper-page">
      <img className="book-art" src={BOOK_TEXTURE} alt="" aria-hidden="true" />
      <div className="paper-grain" />
      {texture && <img className="minecraft-texture" src={texture} alt="" aria-hidden="true" />}
      <div className="page-content">{children}</div>
    </article>
  );
}

function App() {
  const [pages] = useState<BookPageData[]>(initialPages);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const page = pages[currentPage];

  const previousPage = () => setCurrentPage(index => Math.max(0, index - 1));
  const nextPage = () => setCurrentPage(index => Math.min(pages.length - 1, index + 1));

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') previousPage();
      if (event.key === 'ArrowRight') nextPage();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [pages.length]);

  return (
    <main className="app-shell" style={BACKGROUND_IMAGE ? { backgroundImage: `url(${BACKGROUND_IMAGE})` } : undefined}>
      <div className="ambient-light" />
      <section className="book-stage" aria-label="Book viewer">
        <div className="book-shadow" />
        <div className="book-spine" />
        <PageArrow direction="previous" onClick={previousPage} disabled={currentPage === 0} />
        <BookPage pageNumber={currentPage + 1} totalPages={pages.length} texture={page.texture}>{page.content}</BookPage>
        <PageArrow direction="next" onClick={nextPage} disabled={currentPage === pages.length - 1} />
      </section>

      <nav className="page-navigation" aria-label="Book pages">
        <button onClick={previousPage} disabled={currentPage === 0} aria-label="Previous page"><ChevronLeft size={19} /></button>
        <div className="pagination">
          {pages.map((item, index) => (
            <button key={item.id} className={index === currentPage ? 'active' : ''} onClick={() => setCurrentPage(index)} aria-label={`Go to ${item.label}`}>
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={nextPage} disabled={currentPage === pages.length - 1} aria-label="Next page"><ChevronRight size={19} /></button>
      </nav>
    </main>
  );
}

export default App;

createRoot(document.getElementById('root')!).render(<App />);
