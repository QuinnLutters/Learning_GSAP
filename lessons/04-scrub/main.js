import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  SCRUB
    scrub: true  → progress snaps directly to the scroll position
    scrub: 1     → progress takes ~1 second to "catch up" (feels smoother)
    scrub: 3     → takes ~3 seconds (floaty / laggy)

  With scrub, `duration` doesn't mean seconds anymore — the scroll DISTANCE
  between start and end decides how "long" the animation is.
*/

// 1) Page progress bar: scrub over the whole document
gsap.to(".progress-bar", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

// 2) Three lanes, same animation, different scrub values
const lanes = [
  [".l1", true],
  [".l2", 1],
  [".l3", 3],
];

lanes.forEach(([selector, scrub]) => {
  gsap.to(selector, {
    // move to the end of its track: track width minus box width
    x: () => document.querySelector(".track").offsetWidth - 70,
    rotation: 360,
    ease: "none",
    scrollTrigger: {
      trigger: ".lanes",
      start: "top 70%",
      end: "bottom 30%",
      scrub,
      markers: selector === ".l1", // one set of markers is enough
      invalidateOnRefresh: true,  // recalculate the x function when the window resizes
    },
  });
});
