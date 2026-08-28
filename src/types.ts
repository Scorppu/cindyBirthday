import type { ReactNode } from 'react'

export type CollagePosition = {
  /** CSS length offset from the position assigned by the collage grid. */
  x?: string | number
  /** CSS length offset from the position assigned by the collage grid. */
  y?: string | number
}

export type CollageImage = {
  id: string
  src: string
  alt: string
  rotation?: number
  position?: CollagePosition
  className?: string
}

export type PageContent = {
  eyebrow?: string
  title?: ReactNode
  titleLevel?: 1 | 2
  body?: ReactNode
  variant?: 'cover' | 'reading'
  images?: CollageImage[]
}

export type Spread = {
  id: string
  label: string
  /** Background shown while this spread is active. */
  backgroundImage?: string
  left: PageContent
  right: PageContent
}
