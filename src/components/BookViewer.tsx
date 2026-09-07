import { useEffect, useRef, useState, type FormEvent } from 'react'
import { LoaderCircle } from 'lucide-react'
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
const PIN_STORAGE_KEY = 'birthday-book-unlocked'

const ACCESS_PINS = (import.meta.env.VITE_ACCESS_PINS ?? 'pin1,pin2')
  .split(',')
  .map((pin: string) => pin.trim())
  .filter(Boolean)

function isValidAccessPin(input: string): boolean {
  return ACCESS_PINS.includes(input.trim())
}

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
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return window.localStorage.getItem(PIN_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [isBookHidden, setIsBookHidden] = useState(false)
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

  const unlockBook = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isValidAccessPin(pin)) {
      setIsUnlocked(true)
      setPinError('')
      try {
        window.localStorage.setItem(PIN_STORAGE_KEY, 'true')
      } catch {
        // The book still works when storage is unavailable.
      }
      return
    }

    setPinError('That PIN is not quite right. Try again.')
    setPin('')
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return <main className={`app-shell${isUnlocked ? '' : ' app-shell--locked'}`} aria-busy={isPreparing} style={{ backgroundImage: `url(${spread.backgroundImage})` }}>
    {!isUnlocked && (
      <div className="pin-gate" role="dialog" aria-modal="true" aria-labelledby="pin-title">
        <div className="pin-gate__card">
          <p className="pin-gate__eyebrow">A little something for you</p>
          <h1 id="pin-title">Enter the secret PIN</h1>
          <p className="pin-gate__hint">Six digits will unlock your birthday book.</p>
          <form onSubmit={unlockBook}>
            <label className="visually-hidden" htmlFor="book-pin">6-digit PIN</label>
            <input
              id="book-pin"
              className="pin-gate__input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              autoComplete="one-time-code"
              value={pin}
              onChange={(event) => {
                setPin(event.target.value.replace(/\\D/g, '').slice(0, 6))
                setPinError('')
              }}
              placeholder="••••••"
              aria-invalid={Boolean(pinError)}
              aria-describedby={pinError ? 'pin-error' : 'pin-hint'}
              autoFocus
              required
            />
            <p id="pin-hint" className="pin-gate__digits">Enter exactly 6 numbers</p>
            {pinError && <p id="pin-error" className="pin-gate__error" role="alert">{pinError}</p>}
            <button className="pin-gate__button" type="submit">Open the book</button>
          </form>
        </div>
      </div>
    )}
    <div className={`scene-shade${isBookHidden ? ' scene-shade--book-hidden' : ''}`} aria-hidden="true" />
    <button
      type="button"
      className="book-visibility-toggle"
      onClick={() => setIsBookHidden((hidden) => !hidden)}
      aria-pressed={isBookHidden}
      aria-label={isBookHidden ? 'Show book' : 'Hide book'}
      title={isBookHidden ? 'Show book' : 'Hide book'}
    >
      <svg className="pixel-eye" viewBox="0 0 32 20" aria-hidden="true" shapeRendering="crispEdges">
        {isBookHidden ? (
          <>
            <rect x="3" y="9" width="26" height="3" />
            <rect x="7" y="6" width="3" height="3" />
            <rect x="22" y="6" width="3" height="3" />
          </>
        ) : (
          <>
            <path d="M1 10 5 6h4V3h14v3h4l4 4-4 4h-4v3H9v-3H5z" />
            <rect className="pixel-eye__pupil" x="13" y="6" width="6" height="8" />
          </>
        )}
      </svg>
    </button>
    <section className={`book-stage${isBookHidden ? ' book-stage--hidden' : ''}`} aria-label="Birthday book" aria-hidden={isBookHidden}>
      <div className="book-spread">
        <div className="atlas-crop atlas-crop--trim" aria-hidden="true"><img src={SCHOLAR_ATLAS} alt="" /></div>
        <div className="atlas-crop atlas-crop--pages" aria-hidden="true"><img src={SCHOLAR_ATLAS} alt="" /></div>
        <section className="page page--left"><Page content={spread.left} /></section>
        <section className="page page--right"><Page content={spread.right} /></section>
      </div>
    </section>
    <nav className="book-navigation" aria-label="Book navigation">
      <button type="button" onClick={previous} disabled={spreadIndex === 0 || isPreparing} aria-label="Previous pages">{"<"}</button>
      <span>{spreadIndex + 1} / {spreads.length} · {spread.label}</span>
      <button type="button" onClick={next} disabled={spreadIndex === spreads.length - 1 || isPreparing} aria-label="Next pages">{">"}</button>
    </nav>
    <div className={`page-transition${isPreparing ? ' page-transition--visible' : ''}`} aria-hidden={!isPreparing}>
      <LoaderCircle className="page-transition__spinner" size={30} aria-hidden="true" />
      <span className="visually-hidden">Loading page</span>
    </div>
  </main>
}
