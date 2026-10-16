import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const logEl = document.querySelector("#log");
function log(msg) {
  const p = document.createElement("p");
  p.textContent = `${new Date().toLocaleTimeString()}  ${msg}`;
  logEl.prepend(p);
}

/*
  1) CALLBACKS + toggleClass — a ScrollTrigger with NO animation at all.
     ScrollTrigger.create() makes a standalone trigger.
*/
ScrollTrigger.create({
  trigger: ".watch",
  start: "top 60%",
  end: "bottom 40%",
  markers: true,
  toggleClass: "is-active", // added while between start and end, removed outside
  onEnter:     () => log("onEnter (down past start)"),
  onLeave:     () => log("onLeave (down past end)"),
  onEnterBack: () => log("onEnterBack (up past end)"),
  onLeaveBack: () => log("onLeaveBack (up past start)"),
  onToggle:    (self) => log(`onToggle → isActive: ${self.isActive}`),
});

/*
  2) BATCH — reveal lots of elements without creating a separate animation per element.
     Cards that enter at roughly the same time get grouped, so they stagger nicely together.
*/
const grid = document.querySelector("#grid");
for (let i = 1; i <= 24; i++) {
  grid.insertAdjacentHTML("beforeend", `<div class="card">card ${i}</div>`);
}

gsap.set(".card", { opacity: 0, y: 60 }); // hidden start state

ScrollTrigger.batch(".card", {
  start: "top 85%",
  interval: 0.1, // group elements that enter within 0.1s of each other
  onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out", overwrite: true }),
  onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 60, stagger: 0.05, overwrite: true }),
});
