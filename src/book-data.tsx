import type { Spread } from "./types";

const ROOF_SCENE = "/backgrounds/2025-07-16_23.06.35.png"
const GYM_SCENE = "/backgrounds/2025-11-27_23.50.18.png"
const DORM_SCENE = "/backgrounds/2025-10-26_02.53.28.png"
const HOURGLASS_SCENE = "backgrounds/2025-10-19_23.27.53.png"
const SLED_SCENE = "backgrounds/2026-01-11_00.07.27.png"
const SUNSET_SCENE = "backgrounds/2026-01-10_01.36.40.png"
const ARES_PORTRAIT = "backgrounds/huge_2026-08-19_00.21.53.png";

export const spreads: Spread[] = [
  {
    id: "welcome",
    label: "Welcome",
    backgroundImage: ROOF_SCENE,
    left: {
      variant: "cover",
      eyebrow: "A BOOK FOR",
      title: "Cindy Lee",
      titleLevel: 2,
      body: (
        <>
          <p>(AresHunterQY)</p>
          <div className="divider" aria-hidden="true"></div>
          <p className="subtitle">
            The girl of
            <br />
            my dreams.
          </p>
          <p className="from">{"With love <3"}</p>
        </>
      ),
      images: [
        // {
        //   id: "camphoto-1297389768-36",
        //   src: "/polaroids/camphoto_1297389768(36).jpg",
        //   alt: "Shy Cindy",
        //   rotation: -4,
        //   position: { x: "28%", y: "78%", width: "38%" },
        // },
        // {
        //   id: "camphoto-1297389768-36",
        //   src: "/polaroids/camphoto_1932422408(52).jpg",
        //   alt: "Middle finger Cindy",
        //   rotation: 2,
        //   position: { x: "72%", y: "78%", width: "38%" },
        // },
      ],
    },
    right: {
      variant: "cover",
      title: <>Happy Birthday!!</>,
      titleLevel: 2,
      body: (
        <>
          <p className="small-note">
            It's been a while since I wrote something without AI, so please bear
            with me.
          </p>
          <p>
            This year really has been an emotional rollercoaster, and I wanted
            to take this chance to tell you how proud of you I am.
          </p>
          <p>
            Even if you can't see it yourself, I know you're growing bit by bit
            as a person. I hope this book can be a reminder of that.
          </p>
          <p className="subtitle">
            Open a page whenever
            <br />
            you need a little smile.
          </p>
          <p className="small-note">Use the arrows or ← → keys</p>
        </>
      ),
    },
  },
  {
    id: "chapter-one",
    label: "Chapter I", // working hard at the gym
    backgroundImage: GYM_SCENE,
    left: {
      eyebrow: "CHAPTER I",
      title: "We go gym.",
      body: (
        <>
          <p>
            In the beginning of your fourth year, fresh out of a tiring
            internship, you made one of the best decisions anyone could make.
          </p>
          <p className="subtitle"> Getting into the gym. </p>
          <p>
            {
              "The start was rough to say the least, but you learned quicker than most. You got the hang of exercises in days when others took months (or even years lmao)"
            }
          </p>
        </>
      ),
    },
    right: {
      body: (
        <>
          <p>
            What's even more amazing than your talent, is your commitment to
            staying consistent throughout the semester.
          </p>
          <blockquote>"Rome was not built in a day."</blockquote>
          <p>
            Most people give up within the first month, but you showed up week
            after week; You were lifting heavier, getting stronger, and most
            importantly, healthier.
          </p>
        </>
      ),
    },
  },
  {
    id: "chapter-one",
    label: "Chapter I",
    backgroundImage: GYM_SCENE,
    left: {
      body: (
        <>
          <p>
            You've already made great progress. You went from struggling to pull
            nothing on the lat-pulldown to now repping 30kg, that's two-thirds
            of the way to your bodyweight!
          </p>
          <p>
            Most girls probably can't bench the bar on flat benchpress, and
            you're close to benching 10kg on incline. You can't tell me that's
            not impressive.
          </p>
          <p>
            I'm sure that if you don't give up on the gym, you'll be able to
            reap the rewards of consistent effort.
          </p>
          <p className="small-note">
            btw you should start taking progress pictures (for yourself and I).
          </p>
        </>
      ),
    },
    right: {
      body: <></>,
      images: [
        {
          id: "IMG_1493",
          src: "/polaroids/IMG_1493.JPG",
          alt: "RDL Cindy",
          rotation: -4,
          position: { x: "29%", y: "26%", width: "39%" },
        },
        {
          id: "IMG_1526(1)",
          src: "/polaroids/IMG_1526(1).JPG",
          alt: "Blue Top Gym Cindy",
          rotation: 6,
          position: { x: "75%", y: "36%", width: "39%" },
        },
        {
          id: "IMG_5782",
          src: "/polaroids/IMG_5782.JPG",
          alt: "Close up Cindy",
          rotation: -1,
          position: { x: "44%", y: "77%", width: "39%" },
        },
      ],
    },
  },
  {
    id: "chapter-two",
    label: "Chapter II", // working hard for academics
    backgroundImage: DORM_SCENE,
    left: {
      eyebrow: "CHAPTER II",
      title: "FYP HELL",
      body: (
        <>
          <p className="small-note">
            {
              "I know it hurt to finish it, but I still want you to be proud of yourself for it"
            }
          </p>
          <p>
            I never knew the struggles of journalism students until I watched
            you scrape through years and years of newspapers on that
            god-forsaken machine.
          </p>
        </>
      ),
      images: [],
    },
    right: {
      images: [
        {
          id: "IMG_0685",
          src: "/polaroids/IMG_0685(1).JPG",
          alt: "Working Cindy",
          rotation: -4,
          position: { x: "29%", y: "29%", width: "39%" },
        },
        {
          id: "IMG_0439(1)",
          src: "/polaroids/IMG_0439(1).JPG",
          alt: "Cindy sleeping on bus",
          rotation: 2,
          position: { x: "71%", y: "29%", width: "39%" },
        },
        {
          id: "IMG_0503(1)",
          src: "/polaroids/IMG_0503(1).JPG",
          alt: "Cindy sleeping in the library",
          rotation: 6,
          position: { x: "50%", y: "73%", width: "39%" },
        },
      ],
    },
  },
  {
    id: "chapter-three",
    label: "Chapter III", // amazing creations
    backgroundImage: HOURGLASS_SCENE,
    left: {},
    right: {},
  },
  {
    id: "chapter-four",
    label: "Chapter IV", // empathy and kindness towards others
    backgroundImage: SLED_SCENE,
    left: {},
    right: {},
  },
  {
    id: "chapter-five",
    label: "Chapter V", // making me want to do better for you
    backgroundImage: SUNSET_SCENE,
    left: {},
    right: {},
  },
  {
    id: "epilogue",
    label: "Epilogue",
    backgroundImage: ARES_PORTRAIT,
    left: {
      variant: "cover",
      title: "I love you.",
      titleLevel: 2,
    },
    right: {
      body: (
        <>
          <p className="small-note">
            {
              "I take great pride in knowing that no future boyfriend will ever top this :)"
            }
          </p>
          <p className="small-note">
            Did you notice the minecraft backgrounds are chronologically
            ordered?
          </p>
        </>
      ),
    },
  },
];
