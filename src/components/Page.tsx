import type { PageContent } from '../types'
import { Collage } from './Collage'

export function Page({ content }: { content: PageContent }) {
  const isCover = content.variant === 'cover'
  return <section className={`page-content ${isCover ? 'cover-page' : 'reading-page'}`}>
    {content.eyebrow && <p className="eyebrow">{content.eyebrow}</p>}
    {content.title && (content.titleLevel === 1 ? <h1>{content.title}</h1> : <h2>{content.title}</h2>)}
    {content.body}
    <Collage images={content.images} />
  </section>
}
