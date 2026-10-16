import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector(".track");
const panels = gsap.utils.toArray(".panel");

// How far the track has to move left so the last panel ends up on screen
const distance = () => track.scrollWidth - window.innerWidth;

const horizontalTween = gsap.to(track, {
  x: () => -distance(),
  ease: "none", // IMPORTANT: keep "none" so scroll speed = movement speed
  scrollTrigger: {
    trigger: ".horizontal",
    start: "top top",
    end: () => "+=" + distance(), // scroll down as many px as we move sideways → feels 1:1
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,    // re-run the functions above on resize
    markers: true,
  },
});

/*
  containerAnimation
  ------------------
  Normal ScrollTriggers look at VERTICAL position. Inside a horizontal section
  the panels don't move vertically at all (they're pinned) — they move sideways.
  Passing `containerAnimation: horizontalTween` tells this trigger to measure
  start/end along that horizontal movement instead.
*/
gsap.from(".spinner", {
  rotation: -360,
  scale: 0,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".spinner",
    containerAnimation: horizontalTween,
    start: "left 80%",   // note: left/right instead of top/bottom
    end: "center 50%",
    scrub: true,
    markers: { startColor: "yellow", endColor: "orange" },
    id: "spinner",
  },
});

console.log(`${panels.length} panels`);
