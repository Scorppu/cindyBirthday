import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import type { CollageImage } from '../types'

const toCssLength = (value: string | number | undefined) => {
  if (value === undefined) return '0px'
  return typeof value === 'number' ? `${value}px` : value
}

type PickupOrigin = {
  x: number
  y: number
  scale: number
}

type SelectedPhoto = {
  image: CollageImage
  origin: PickupOrigin
}

export function Polaroid({ image, onOpen }: { image: CollageImage; onOpen: (event: MouseEvent<HTMLButtonElement>) => void }) {
  const style = {
    '--rotation': `${image.rotation ?? 0}deg`,
    '--position-x': image.position?.x === undefined ? '50%' : toCssLength(image.position.x),
    '--position-y': image.position?.y === undefined ? '50%' : toCssLength(image.position.y),
    '--polaroid-width': image.position?.width === undefined ? '42%' : toCssLength(image.position.width),
  } as CSSProperties

  return <button type="button" className={`polaroid ${image.className ?? ''}`} style={style} onClick={onOpen} aria-label={`Pick up ${image.alt} to view it larger`}>
    <img src={image.src} alt={image.alt} />
  </button>
}

function PhotoLightbox({ selected, onClose }: { selected: SelectedPhoto; onClose: () => void }) {
  const [isClosing, setIsClosing] = useState(false)
  const { image, origin } = selected
  const style = {
    '--pickup-x': `${origin.x}px`,
    '--pickup-y': `${origin.y}px`,
    '--pickup-scale': origin.scale,
    '--pickup-rotation': `${image.rotation ?? 0}deg`,
  } as CSSProperties

  const close = () => {
    if (isClosing) return
    setIsClosing(true)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isClosing])

  return <div
    className={`photo-lightbox${isClosing ? ' photo-lightbox--closing' : ''}`}
    role="dialog"
    aria-modal="true"
    aria-label={`Inspecting ${image.alt}`}
    onMouseDown={close}
    onAnimationEnd={(event) => {
      if (isClosing && event.animationName === 'photo-put-down') onClose()
    }}
  >
    <div className="photo-lightbox__content" style={style} onMouseDown={(event) => event.stopPropagation()}>
      <button type="button" className="photo-lightbox__close" onClick={close} aria-label="Put photo down"><X size={22} /></button>
      <img className="photo-lightbox__image" src={image.src} alt={image.alt} />
    </div>
  </div>
}

export function Collage({ images = [] }: { images?: CollageImage[] }) {
  const [selected, setSelected] = useState<SelectedPhoto | null>(null)

  if (!images.length) return null

  const openPhoto = (image: CollageImage, event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const targetSize = Math.min(760, window.innerWidth * .9, window.innerHeight * .8 - 20)
    setSelected({
      image,
      origin: {
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
        scale: rect.width / targetSize,
      },
    })
  }

  return <>
    <div className="collage" aria-label="Photo collage">
      {images.map((image) => <Polaroid key={image.id} image={image} onOpen={(event) => openPhoto(image, event)} />)}
    </div>
    {selected && createPortal(<PhotoLightbox selected={selected} onClose={() => setSelected(null)} />, document.body)}
  </>
}
