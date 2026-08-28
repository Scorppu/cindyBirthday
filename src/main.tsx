import { createRoot } from 'react-dom/client'
import { useEffect, useState, type ReactNode } from 'react'
import './styles.css'

// This is Scholar's ORIGINAL 512 × 512 texture atlas. Do not pre-crop it.
// CSS crops its two-page spread: x=0, y=180, width=295, height=180.
const SCHOLAR_ATLAS = '/textures/book.png'
const BACKGROUND_IMAGE = '/backgrounds/minecraft-scene.png'

type Spread = {
  id: string
  label: string
  left: ReactNode
  right: ReactNode
}

const spreads: Spread[] = [
  {
    id: 'welcome',
    label: 'Welcome',
    left: (
      <div className="cover-page">
        <p className="eyebrow">A BOOK FOR</p>
        <h1>Dreamers</h1>
        <div className="divider" aria-hidden="true">✦</div>
        <p className="subtitle">Little moments<br />for you.</p>
        <p className="from">With love</p>
      </div>
    ),
    right: (
      <div className="cover-page cover-page--right">
        <p className="eyebrow">HAPPY BIRTHDAY</p>
        <h2>For your next<br />adventure</h2>
        <p className="subtitle">Open a page whenever<br />you need a little smile.</p>
        <p className="small-note">Use the arrows or ← → keys</p>
      </div>
    ),
  },
  {
    id: 'chapter-one',
    label: 'Chapter I',
    left: (
      <article className="reading-page">
        <p className="eyebrow">CHAPTER I</p>
        <h2>The First Step</h2>
        <p>Every great adventure begins with a single step beyond the familiar.</p>
        <p>Past the old oak tree and across the whispering meadow, the path waits for those willing to follow it.</p>
      </article>
    ),
    right: (
      <article className="reading-page">
        <blockquote>“Not all those who wander are lost.”</blockquote>
        <p>Keep your eyes open. The world has a funny way of leaving small wonders in unexpected places.</p>
        <p className="small-note">A little reminder for today.</p>
      </article>
    ),
  },
  {
    id: 'chapter-two',
    label: 'Chapter II',
    left: (
      <article className="reading-page">
        <p className="eyebrow">CHAPTER II</p>
        <h2>Notes from the Road</h2>
        <p>Pack lightly, listen closely, and leave a little room for the things you have not discovered yet.</p>
      </article>
    ),
    right: (
      <article className="reading-page">
        <ul>
          <li>A map with no destination</li>
          <li>A pocket full of sunlight</li>
          <li>A reason to look up</li>
        </ul>
        <p className="small-note">More pages to come.</p>
      </article>
    ),
  },
]

function App() {
  const [spreadIndex, setSpreadIndex] = useState(0)
  const spread = spreads[spreadIndex]
  const previous = () => setSpreadIndex((index) => Math.max(0, index - 1))
  const next = () => setSpreadIndex((index) => Math.min(spreads.length - 1, index + 1))

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <main className="app-shell" style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}>
      <div className="scene-shade" aria-hidden="true" />
      <section className="book-stage" aria-label="Birthday book">
        <div className="book-spread">
          <div className="atlas-crop atlas-crop--trim" aria-hidden="true">
            <img src={SCHOLAR_ATLAS} alt="" />
          </div>

          <div className="atlas-crop atlas-crop--pages" aria-hidden="true">
            <img src={SCHOLAR_ATLAS} alt="" />
          </div>
          <section className="page page--left">{spread.left}</section>
          <section className="page page--right">{spread.right}</section>
        </div>
      </section>
      <nav className="book-navigation" aria-label="Book navigation">
        <button type="button" onClick={previous} disabled={spreadIndex === 0} aria-label="Previous pages">←</button>
        <span>{spreadIndex + 1} / {spreads.length} · {spread.label}</span>
        <button type="button" onClick={next} disabled={spreadIndex === spreads.length - 1} aria-label="Next pages">→</button>
      </nav>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<App />)