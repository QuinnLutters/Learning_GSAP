import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/*
  ScrollSmoother
  --------------
  - Create it BEFORE any ScrollTriggers.
  - effects: true   → reads data-speed and data-lag attributes in the HTML
      data-speed="0.5"  element moves at half the scroll speed (lags behind → feels far away)
      data-speed="1.5"  moves faster than scroll (feels close)
      data-lag="0.5"    element takes 0.5s to catch up (trailing effect)
  - smoothTouch     → touch devices get NO smoothing by default (it usually feels bad);
                      set a small number like 0.1 if you want some.
*/
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.2,     // seconds to catch up to the real scroll position
  effects: true,
  smoothTouch: 0.1,
});

gsap.from(".reveal", {
  scale: 0.3,
  opacity: 0,
  rotation: -45,
  scrollTrigger: {
    trigger: ".reveal",
    start: "top 85%",
    end: "top 40%",
    scrub: true,
  },
});

document.querySelector("#toTop").addEventListener("click", () => {
  smoother.scrollTo(0, true); // true = animate smoothly
});

/*
  Other handy methods:
    smoother.scrollTo(".reveal", true, "center center")
    smoother.paused(true)   // freeze scrolling (e.g. while a modal is open)
    smoother.effects(".thing", { speed: 0.8 })  // add effects from JS instead of HTML
*/
