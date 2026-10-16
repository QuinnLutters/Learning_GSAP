# Learning GSAP

A hands-on playground for learning GSAP, focused on scroll animation.

## Run it

```bash
npm install     # only the first time
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). The home page links every lesson.
Keep the browser and a lesson's `main.js` side by side: change a number, save, and the page reloads.

## Learning path

| # | Lesson | What you learn |
|---|--------|----------------|
| 01 | `lessons/01-tweens` | `gsap.to / from / fromTo`, eases, stagger |
| 02 | `lessons/02-timelines` | Sequencing, the position parameter, scrubbing a timeline with a slider |
| 03 | `lessons/03-scrolltrigger-basics` | `trigger`, `start` / `end`, `markers`, `toggleActions` |
| 04 | `lessons/04-scrub` | Tie animation progress to the scrollbar |
| 05 | `lessons/05-pin` | Pin a section while a timeline plays |
| 06 | `lessons/06-horizontal` | Horizontal scroll section, `containerAnimation` |
| 07 | `lessons/07-callbacks-batch` | `onEnter` / `onLeave`, `toggleClass`, `ScrollTrigger.batch` |
| 08 | `lessons/08-scrollsmoother` | Smooth scrolling, `data-speed` / `data-lag` parallax |
| 09 | `lessons/09-observer` | Gesture detection + `ScrollToPlugin` for section-by-section scrolling |
| ✦ | `sandbox/` | Free play — your own experiment |

Each lesson has a yellow **Try this** box with small exercises.

## Adding your own lesson

Copy any lesson folder (e.g. `lessons/03-scrolltrigger-basics` → `lessons/10-my-idea`), change it, and visit
`http://localhost:5173/lessons/10-my-idea/`. Add a link to the home page `index.html` if you want it listed.

## ScrollTrigger cheat sheet

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".thing", {
  x: 300,
  scrollTrigger: {
    trigger: ".thing",        // element whose position is watched
    start: "top 80%",         // "<trigger point> <viewport point>"
    end: "bottom 20%",        // or "+=500" (px after start)
    markers: true,            // debug lines — remove for production
    toggleActions: "play none none reverse", // onEnter onLeave onEnterBack onLeaveBack
    // scrub: true | 1,       // scroll drives progress (replaces toggleActions)
    // pin: true,             // hold the trigger in place from start to end
    // snap: 1 / 4,           // settle on steps when scrolling stops
  },
});
```

**Common gotchas**

- Don't put `scroll-behavior: smooth` in your CSS; it fights ScrollTrigger.
- Scrubbed tweens should almost always use `ease: "none"`.
- If a layout changes after load (images, fonts), call `ScrollTrigger.refresh()`.
- Use `x` / `y` / `scale` / `opacity`, not `left` / `top` / `width`: they're much smoother.
- ScrollSmoother needs `body > #smooth-wrapper > #smooth-content`, and fixed elements must sit outside the wrapper.

**Docs:** [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) ·
[ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/) ·
[Observer](https://gsap.com/docs/v3/Plugins/Observer/) ·
[Eases](https://gsap.com/docs/v3/Eases)
