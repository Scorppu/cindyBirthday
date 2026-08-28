import type { Spread } from './types'

const MINECRAFT_SCENE = '/backgrounds/minecraft-scene.png'

export const spreads: Spread[] = [
  {
    id: 'welcome',
    label: 'Welcome',
    backgroundImage: MINECRAFT_SCENE,
    left: {
      variant: 'cover',
      eyebrow: 'A BOOK FOR',
      title: 'Dreamers',
      titleLevel: 1,
      body: <><div className="divider" aria-hidden="true">✦</div><p className="subtitle">Little moments<br />for you.</p><p className="from">With love</p></>,
    },
    right: {
      variant: 'cover',
      eyebrow: 'HAPPY BIRTHDAY',
      title: <>For your next<br />adventure</>,
      titleLevel: 2,
      body: <><p className="subtitle">Open a page whenever<br />you need a little smile.</p><p className="small-note">Use the arrows or ← → keys</p></>,
    },
  },
  {
    id: 'chapter-one',
    label: 'Chapter I',
    backgroundImage: MINECRAFT_SCENE,
    left: {
      eyebrow: 'CHAPTER I',
      title: 'The First Step',
      body: <><p>Every great adventure begins with a single step beyond the familiar.</p><p>Past the old oak tree and across the whispering meadow, the path waits for those willing to follow it.</p></>,
    },
    right: {
      body: <><blockquote>“Not all those who wander are lost.”</blockquote><p>Keep your eyes open. The world has a funny way of leaving small wonders in unexpected places.</p><p className="small-note">A little reminder for today.</p></>,
    },
  },
  {
    id: 'chapter-two',
    label: 'Chapter II',
    backgroundImage: MINECRAFT_SCENE,
    left: {
      eyebrow: 'CHAPTER II',
      title: 'Notes from the Road',
      body: <p>Pack lightly, listen closely, and leave a little room for the things you have not discovered yet.</p>,
      images: [
        {
          id: 'camphoto-1297389768-36',
          src: '/polaroids/camphoto_1297389768(36).jpg',
          alt: 'Shy Cindy',
          rotation: -4,
          position: { x: '-4px', y: '2px' },
        },
        {
          id: 'camphoto-1297389768-36',
          src: '/polaroids/camphoto_1932422408(52).jpg',
          alt: 'Middle finger Cindy',
          rotation: 2,
          position: { x: '3px', y: '-2px' },
        },
      ],
    },
    right: {
      body: <><ul><li>A map with no destination</li><li>A pocket full of sunlight</li><li>A reason to look up</li></ul><p className="small-note">More pages to come.</p></>,
    },
  },
]
