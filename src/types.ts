import type { ReactNode } from 'react'

export type CollagePosition = {
  /** Horizontal position within the page's collage layer. */
  x?: string | number
  /** Vertical position within the page's collage layer. */
  y?: string | number
  /** Polaroid width within the page's collage layer. */
  width?: string | number
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
