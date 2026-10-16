import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(Observer, ScrollToPlugin);

/*
  Observer doesn't animate anything. It just reports gestures:
    onUp / onDown / onLeft / onRight, onPress, onDrag, onChange (with deltaX/deltaY) …
  You decide what to do with them.

  ScrollToPlugin lets GSAP tween the window's scroll position:
    gsap.to(window, { scrollTo: 800 })            // to a pixel value
    gsap.to(window, { scrollTo: "#contact" })     // to an element
    gsap.to(window, { scrollTo: { y: "#contact", offsetY: 60 } })
*/

const slides = gsap.utils.toArray(".slide");
const dotsNav = document.querySelector("#dots");
slides.forEach(() => dotsNav.insertAdjacentHTML("beforeend", "<span></span>"));
const dots = gsap.utils.toArray("#dots span");

let current = 0;
let animating = false;

function goTo(index) {
  index = gsap.utils.clamp(0, slides.length - 1, index);
  if (animating || index === current) return;

  animating = true;
  current = index;
  dots.forEach((d, i) => d.classList.toggle("on", i === current));

  gsap.to(window, {
    scrollTo: slides[index],
    duration: 1,
    ease: "power3.inOut",
    onComplete: () => (animating = false), // accept input again only when we've arrived
  });

  // Something extra to watch: pop the heading in
  gsap.from(slides[index].querySelector("h2, h1"), { y: 60, opacity: 0, duration: 0.8, delay: 0.4 });
}

Observer.create({
  target: window,
  type: "wheel,touch",
  wheelSpeed: -1,        // makes wheel direction match touch direction
  tolerance: 10,         // px of movement before it counts — ignores tiny trackpad jitter
  preventDefault: true,  // stop the browser's own scrolling; we move the page ourselves
  onUp: () => goTo(current + 1),
  onDown: () => goTo(current - 1),
});

// keyboard too
window.addEventListener("keydown", (e) => {
  if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); goTo(current + 1); }
  if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); goTo(current - 1); }
});

// start at the top
window.scrollTo(0, 0);
dots[0].classList.add("on");
