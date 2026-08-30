import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react'
import { spreads } from '../book-data'
import type { Spread } from '../types'
import { Page } from './Page'

const SCHOLAR_ATLAS = '/textures/book.png'
const PAGE_FLIP_SOUNDS = [
  '/open_flip1.ogg',
  '/open_flip2.ogg',
  '/open_flip3.ogg',
]
const BACKGROUND_MUSIC = '/sweden.ogg'

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image()
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      resolve()
    }
    const decode = () => {
      if ('decode' in image) {
        image.decode().catch(() => undefined).finally(finish)
      } else {
        finish()
      }
    }

    image.onload = decode
    image.onerror = finish
    image.src = src
    if (image.complete) decode()
  })
}

function preloadSpread(spread: Spread) {
  const imageSources = [
    spread.backgroundImage,
    ...(spread.left.images ?? []).map((image) => image.src),
    ...(spread.right.images ?? []).map((image) => image.src),
  ].filter((source): source is string => Boolean(source))

  return Promise.all([...new Set([SCHOLAR_ATLAS, ...imageSources])].map(preloadImage))
}

export function BookViewer() {
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [isPreparing, setIsPreparing] = useState(true)
  const isPreparingRef = useRef(true)
  const transitionId = useRef(0)
  const flipSounds = useRef<HTMLAudioElement[]>([])
  const backgroundMusic = useRef<HTMLAudioElement | null>(null)
  const nextFlipSound = useRef(0)
  const spread = spreads[spreadIndex]

  useEffect(() => {
    flipSounds.current = PAGE_FLIP_SOUNDS.map((source) => {
      const sound = new Audio(source)
      sound.preload = 'auto'
      return sound
    })

    const music = new Audio(BACKGROUND_MUSIC)
    music.loop = true
    music.volume = 0.35
    music.preload = 'auto'
    backgroundMusic.current = music

    return () => {
      flipSounds.current.forEach((sound) => {
        sound.pause()
        sound.src = ''
      })
      flipSounds.current = []
      music.pause()
      music.src = ''
      backgroundMusic.current = null
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    preloadSpread(spreads[0]).then(() => {
      if (cancelled) return
      isPreparingRef.current = false
      setIsPreparing(false)
    })
    return () => { cancelled = true }
  }, [])

  const playBackgroundMusic = () => {
    const music = backgroundMusic.current
    if (!music || !music.paused) return
    void music.play().catch(() => undefined)
  }

  const playPageFlipSound = () => {
    const sounds = flipSounds.current
    if (sounds.length === 0) return

    const sound = sounds[nextFlipSound.current]
    nextFlipSound.current = (nextFlipSound.current + 1) % sounds.length
    sounds.forEach((otherSound) => {
      if (otherSound !== sound) otherSound.pause()
    })
    sound.currentTime = 0
    void sound.play().catch(() => undefined)
  }

  const goToSpread = (index: number) => {
    if (index < 0 || index >= spreads.length || isPreparingRef.current || index === spreadIndex) return

    playBackgroundMusic()
    playPageFlipSound()
    isPreparingRef.current = true
    setIsPreparing(true)
    const currentTransition = ++transitionId.current

    preloadSpread(spreads[index]).then(() => {
      if (currentTransition !== transitionId.current) return
      setSpreadIndex(index)
      isPreparingRef.current = false
      setIsPreparing(false)
    })
  }

  const previous = () => goToSpread(spreadIndex - 1)
  const next = () => goToSpread(spreadIndex + 1)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return <main className="app-shell" aria-busy={isPreparing} style={{ backgroundImage: `url(${spread.backgroundImage})` }}>
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
      <button type="button" onClick={previous} disabled={spreadIndex === 0 || isPreparing} aria-label="Previous pages"><ChevronLeft size={20} /></button>
      <span>{spreadIndex + 1} / {spreads.length} · {spread.label}</span>
      <button type="button" onClick={next} disabled={spreadIndex === spreads.length - 1 || isPreparing} aria-label="Next pages"><ChevronRight size={20} /></button>
    </nav>
    <div className={`page-transition${isPreparing ? ' page-transition--visible' : ''}`} aria-hidden={!isPreparing}>
      <LoaderCircle className="page-transition__spinner" size={30} aria-hidden="true" />
      <span className="visually-hidden">Loading page</span>
    </div>
  </main>
}
