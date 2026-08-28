import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { spreads } from '../book-data'
import { Page } from './Page'

const SCHOLAR_ATLAS = '/textures/book.png'

export function BookViewer() {
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
  })

  return <main className="app-shell" style={{ backgroundImage: `url(${spread.backgroundImage})` }}>
    <div className="scene-shade" aria-hidden="true" />
    <section className="book-stage" aria-label="Birthday book">
      <div className="book-spread">
        <div className="atlas-crop atlas-crop--trim" aria-hidden="true"><img src={SCHOLAR_ATLAS} alt="" /></div>
        <div className="atlas-crop atlas-crop--pages" aria-hidden="true"><img src={SCHOLAR_ATLAS} alt="" /></div>
        <section className="page page--left"><Page content={spread.left} /></section>
        <section className="page page--right"><Page content={spread.right} /></section>
      </div>
    </section>
    <nav className="book-navigation" aria-label="Book navigation">
      <button type="button" onClick={previous} disabled={spreadIndex === 0} aria-label="Previous pages">{"<"}</button>
      <span>{spreadIndex + 1} / {spreads.length} · {spread.label}</span>
      <button type="button" onClick={next} disabled={spreadIndex === spreads.length - 1} aria-label="Next pages">{">"}</button>
    </nav>
  </main>
}
