import gsap from "gsap";

/*
  THE THREE TWEEN TYPES
  ---------------------
  gsap.to(target, vars)          → animate FROM the current state TO the values you give
  gsap.from(target, vars)        → animate FROM the values you give TO the current state
  gsap.fromTo(target, from, to)  → you define both ends

  `target` can be a CSS selector (".box"), an element, or an array of elements.

  Common vars:
    x / y           → translate in px (use these instead of left/top — they're GPU-fast)
    xPercent        → translate in % of the element's own width
    rotation        → degrees
    scale, opacity
    duration        → seconds (default 0.5)
    ease            → the "feel" of the motion. See https://gsap.com/docs/v3/Easing
    delay, repeat (-1 = forever), yoyo (go back and forth)
*/

const demos = {
  to() {
    gsap.to(".box", {
      x: 200,
      rotation: 360,
      duration: 1,
      ease: "power2.out", // try: "bounce.out", "back.out(2)", "elastic.out(1, 0.3)", "none"
    });
  },

  from() {
    // The boxes are already where they belong. `from` makes them ARRIVE there.
    // This is the classic "reveal" pattern you'll use a lot with ScrollTrigger.
    gsap.from(".box", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  },

  fromTo() {
    gsap.fromTo(
      ".box",
      { scale: 0.2, opacity: 0 },               // from
      { scale: 1, opacity: 1, duration: 0.8 }   // to (duration/ease go in here)
    );
  },

  stagger() {
    // stagger = start each target a little after the previous one
    gsap.from(".box", {
      y: -80,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(2)",
      stagger: {
        each: 0.1,       // seconds between each box
        from: "start",   // try "center", "end", "random"
      },
    });
  },

  reset() {
    // clearProps removes the inline styles GSAP added, so the boxes go back to their CSS state
    gsap.killTweensOf(".box");
    gsap.set(".box", { clearProps: "all" });
  },
};

document.querySelectorAll("[data-demo]").forEach((btn) => {
  btn.addEventListener("click", () => {
    demos.reset(); // start every demo from a clean state
    demos[btn.dataset.demo]();
  });
});

/*
  TIP: tweens return an object you can control:
    const t = gsap.to(".box", { x: 200, paused: true });
    t.play(); t.pause(); t.reverse(); t.progress(0.5);
  Keep that in mind — ScrollTrigger is basically "call .progress() based on scroll".
*/
