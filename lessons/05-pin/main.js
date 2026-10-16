import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  PIN + SCRUB + TIMELINE — the most common "fancy scroll" recipe.

  The timeline's own durations now only matter RELATIVE to each other:
  a step with duration 2 takes twice as much scrolling as a step with duration 1.
  The total amount of scrolling is set by `end`.
*/

const readout = document.querySelector(".scene .readout");

gsap.set([".t2", ".t3"], { opacity: 0, y: 40 }); // hide the later headings to start

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pinned",
    start: "top top",   // pin when the section's top hits the top of the screen
    end: "+=2000",      // stay pinned for 2000px of scrolling
    pin: true,
    scrub: 1,
    markers: true,
    onUpdate: (self) => {
      // `self` is the ScrollTrigger instance. self.progress is 0 → 1.
      readout.textContent = `progress: ${self.progress.toFixed(2)}   direction: ${self.direction === 1 ? "down" : "up"}`;
    },
  },
});

tl.to(".circle", { scale: 4, backgroundColor: "#3ddc97", duration: 1 })
  .to(".t1", { opacity: 0, y: -40, duration: 0.5 }, "<")
  .to(".t2", { opacity: 1, y: 0, duration: 0.5 }, "<0.3")
  .to(".circle", { scale: 2, x: 200, backgroundColor: "#ff6b9a", duration: 1 })
  .to(".t2", { opacity: 0, y: -40, duration: 0.5 }, "<")
  .to(".t3", { opacity: 1, y: 0, duration: 0.5 }, "<0.3")
  .to(".circle", { scale: 0, x: 0, duration: 1 });

/*
  NOTE: pinning adds a "pin-spacer" div around your element to push the rest of
  the page down by the `end` distance. Open DevTools → Elements to see it.
*/
