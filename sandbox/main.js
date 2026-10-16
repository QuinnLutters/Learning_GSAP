import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

// create the scrollSmoother before your scrollTriggers
const smoother = ScrollSmoother.create({
	smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
	effects: true, // looks for data-speed and data-lag attributes on elements
	smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

gsap.to(".box", {
  x: 300,
  rotation: 360,
  duration: 2,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true,
});

// one wheel flick = one section
const sections = gsap.utils.toArray("section");
let current = 0;
let animating = false;

function goToSection(index) {
  index = gsap.utils.clamp(0, sections.length - 1, index);
  if (animating || index === current) return;
  animating = true;
  current = index;
  smoother.scrollTo(sections[index], true, "top top"); // true = glide there using the smoother
  gsap.delayedCall(1.2, () => (animating = false)); // ignore input until the glide is done
}

Observer.create({
  target: window,
  type: "wheel,touch",
  wheelSpeed: -1, // make wheel direction match touch direction
  tolerance: 10, // ignore tiny trackpad jitters
  preventDefault: true, // block native scrolling, we move the page ourselves
  onUp: () => goToSection(current + 1),
  onDown: () => goToSection(current - 1),
});
