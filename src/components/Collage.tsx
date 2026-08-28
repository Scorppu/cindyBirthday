import type { CSSProperties } from 'react'
import type { CollageImage } from '../types'

export function Polaroid({ image }: { image: CollageImage }) {
  const style = { '--rotation': `${image.rotation ?? 0}deg` } as CSSProperties
  return <figure className={`polaroid ${image.className ?? ''}`} style={style}>
    <img src={image.src} alt={image.alt} />
  </figure>
}

export function Collage({ images = [] }: { images?: CollageImage[] }) {
  if (!images.length) return null
  return <div className="collage" aria-label="Photo collage">{images.map((image) => <Polaroid key={image.id} image={image} />)}</div>
}
