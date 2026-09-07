import type { Spread } from "./types";

const ROOF_SCENE = "/backgrounds/2025-07-16_23.06.35.png";
const GYM_SCENE = "/backgrounds/2025-11-27_23.50.18.png";
const DORM_SCENE = "/backgrounds/2025-10-26_02.53.28.png";
const SLEEP_SCENE = "/backgrounds/2026-01-24_02.21.44.png";
const HOURGLASS_SCENE = "backgrounds/2025-10-19_23.27.53.png";
const SLED_SCENE = "backgrounds/2026-01-11_00.07.27.png";
const SUNSET_SCENE = "backgrounds/2026-01-10_01.36.40.png";
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
      images: [],
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
      verticalAlign: "top",
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
      verticalAlign: "top",
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
      images: [
        {
          id: "IMG_1526(1)",
          src: "/polaroids/IMG_1526(1).JPG",
          alt: "Blue Top Gym Cindy",
          rotation: 2,
          position: { x: "50%", y: "79%", width: "40%" },
        },
      ],
    },
  },
  {
    id: "chapter-one",
    label: "Chapter I",
    backgroundImage: GYM_SCENE,
    left: {
      verticalAlign: "top",
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
          rotation: 1,
          position: { x: "54%", y: "27%", width: "49%" },
        },
        {
          id: "IMG_5782",
          src: "/polaroids/IMG_5782.JPG",
          alt: "Close up Cindy",
          rotation: -3,
          position: { x: "52%", y: "72%", width: "49%" },
        },
      ],
    },
  },
  {
    id: "chapter-two",
    label: "Chapter II", // working hard for academics
    backgroundImage: DORM_SCENE,
    left: {
      verticalAlign: "top",
      eyebrow: "CHAPTER II",
      title: "FYP HELL",
      body: (
        <>
          <p>
            The past year definitely wasn't all sunshine and rainbows. Even
            though we were having a lot of fun, there was still work to be done.
          </p>

          <p>
            I'm sure you remember (even though you might not want to), the dark
            humid corner of the library; We watch people leaving campus or
            heading to eat, while we were stuck fighting a seemingly losing
            battle.
          </p>
        </>
      ),
      images: [],
    },
    right: {
      verticalAlign: "top",
      body: (
        <>
          <p>
            But let's be honest, your job was tougher than mine. On most days, I
            was just there talking to an AI on my laptop, while you were
            scraping through years & years of newspapers.
          </p>
          <p>
            I can still hear the spool of the film wheel spinning. Along with
            the bright green light that flashes as the film passes over it.
          </p>
        </>
      ),
      images: [
        {
          id: "IMG_0685",
          src: "/polaroids/IMG_0685(1).JPG",
          alt: "Working Cindy",
          rotation: 4,
          position: { x: "50%", y: "78%", width: "44%" },
        },
      ],
    },
  },
  {
    id: "chapter-two",
    label: "Chapter II", // working hard for academics
    backgroundImage: DORM_SCENE,
    left: {
      verticalAlign: "center",
      body: (
        <>
          <p>
            Through all your struggles, and seemingly rushing a deadline every
            other week (for your meetings with the professor), you still managed
            to pull it off, AND got the grade for it!
          </p>
          <p>
            Let's not forget you ended that semester with a 3.4 GPA, way higher
            than what you thought was possible.
          </p>
          <blockquote>
            A Miraculous is as powerful as your imagination.
          </blockquote>
        </>
      ),
      images: [],
    },
    right: {
      verticalAlign: "top",
      body: <></>,
      images: [
        {
          id: "IMG_0560",
          src: "/polaroids/IMG_0560.PNG",
          alt: "Cindy after a long day",
          rotation: -4,
          position: { x: "33%", y: "50%", width: "50%" },
        },
        {
          id: "camphoto_959030623(144)",
          src: "/polaroids/camphoto_959030623(144).jpg",
          alt: "Cindy eating",
          rotation: 4,
          position: { x: "73%", y: "55%", width: "50%" },
        },
      ],
    },
  },
  {
    id: "sleepy-cindy",
    label: "Chapter IIS", // working hard for academics
    backgroundImage: SLEEP_SCENE,
    left: {
      verticalAlign: "top",
      title: "Sleepy Cindy",
      titleLevel: 2,
      eyebrow: "CHAPTER IIS",
      body: (
        <>
          <p className="small-note">
            on a completely unrelated note, here are some pictures of you
            sleeping after a long day.
          </p>
        </>
      ),
      images: [
        {
          id: "IMG_0439(1)",
          src: "/polaroids/IMG_0439(1).JPG",
          alt: "Cindy sleeping on bus",
          rotation: -4,
          position: { x: "27%", y: "62%", width: "50%" },
        },
        {
          id: "IMG_0503(1)",
          src: "/polaroids/IMG_0503(1).JPG",
          alt: "Cindy sleeping in the library",
          rotation: 6,
          position: { x: "67%", y: "67%", width: "50%" },
        },
      ],
    },
    right: {
      verticalAlign: "top",
      body: (
        <>
          <p className="small-note">You're literally her.</p>
        </>
      ),
      images: [
        {
          id: "A368D51C-7CAB-430C-B4AA-373BB7326E04.jpg",
          src: "/polaroids/A368D51C-7CAB-430C-B4AA-373BB7326E04.jpg",
          alt: "Tired Marinette",
          rotation: 2,
          position: { x: "50%", y: "50%", width: "80%" },
        },
      ],
    },
  },
  // {
  //   id: "chapter-three",
  //   label: "Chapter III", // amazing creations
  //   backgroundImage: HOURGLASS_SCENE,
  //   left: {
  //     verticalAlign: "top",
  //     eyebrow: "CHAPTER III",
  //     title: "Amazing Creations",
  //     body: (
  //       <>
  //         <p>
  //           Let's stop for a second and read something less serious. What about
  //           some of your crazy creations?
  //         </p>
  //         <p>
  //           Massive
  //         </p>
  //       </>
  //     ),
  //   },
  //   right: {},
  // },
  {
    id: "chapter-three",
    label: "Chapter III", // empathy and kindness towards others
    backgroundImage: SLED_SCENE,
    left: {
      verticalAlign: "top",
      title: "My kind princess",
      titleLevel: 2,
      eyebrow: "CHAPTER III",
      body: (
        <>
          <p>
            Despite everything you were going through, you still never stopped
            being kind to others.
          </p>
          <blockquote>
            <p>You gave people gifts they don't realize they needed;</p>
            <p>You gave flowers to deceased people you didn't even know; </p>
            <p>
              You gave people advice & comfort when you yourself needed it the
              most;
            </p>
          </blockquote>
        </>
      ),
    },
    right: {
      verticalAlign: "center",
      eyebrow: "",
      body: (
        <>
          <p className="subtitle">
            Even in your darkest moments, you never stopped trying to be the
            light in other people's lives.
          </p>
        </>
      ),
    },
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
      body: <></>,
      images: [
        {
          id: "IMG_5244(1)",
          src: "/polaroids/IMG_5244(1).JPG",
          alt: "My Love",
          rotation: 2,
          position: { x: "55%", y: "50%", width: "80%" },
        },
      ],
    },
  },
  {
    id: "funny-pictures",
    label: "Funny Pictures",
    backgroundImage: ARES_PORTRAIT,
    left: {
      body: (
        <>
          <p className="small-note">
            {
              "funny pictures I wanted to add but couldn't really find a spot for"
            }
          </p>
        </>
      ),
    },
    right: {
      images: [
        {
          id: "camphoto-1297389768-36",
          src: "/polaroids/camphoto_1297389768(36).jpg",
          alt: "Shy Cindy",
          rotation: 6,
          position: { x: "74%", y: "35%", width: "47%" },
        },
        {
          id: "camphoto-1297389768-36",
          src: "/polaroids/camphoto_1932422408(52).jpg",
          alt: "Middle finger Cindy",
          rotation: -6,
          position: { x: "34%", y: "35%", width: "47%" },
        },
        {
          id: "camphoto-1297389768-36",
          src: "/polaroids/camphoto_1483920592(68).jpg",
          alt: "MTR Cindy",
          rotation: 0,
          position: { x: "54%", y: "70%", width: "47%" },
        },
      ],
    },
  },
];
