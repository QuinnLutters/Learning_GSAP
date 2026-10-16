import gsap from "gsap";

/*
  TIMELINES
  ---------
  const tl = gsap.timeline(options);
  tl.to(...).to(...).from(...)   ← chain steps; each one starts when the previous ends

  THE POSITION PARAMETER (the 3rd argument) controls WHEN a step starts:
    (nothing)  → right after the previous step ends
    "<"        → at the same time the previous step STARTS
    ">"        → when the previous step ends (same as nothing)
    "-=0.3"    → 0.3s before the previous step ends (overlap)
    "+=1"      → 1s after the previous step ends (gap)
    2          → exactly at 2 seconds into the timeline
    "myLabel"  → at a label you added with tl.addLabel("myLabel")
*/

const progressEl = document.querySelector("#progress");
const scrubber = document.querySelector("#scrubber");

const tl = gsap.timeline({
  paused: true,                         // don't auto-play; we control it with buttons
  defaults: { duration: 0.8, ease: "power2.inOut" }, // shared by every step
  onUpdate: () => {
    // runs every frame while the timeline moves — keep the slider in sync
    scrubber.value = tl.progress();
    progressEl.textContent = `progress: ${tl.progress().toFixed(2)}`;
  },
});

tl.to(".a", { x: 150 })                     // step 1
  .to(".b", { y: -80 })                      // step 2: after step 1
  .to(".c", { rotation: 180, scale: 1.3 }, "<") // step 3: SAME time as step 2
  .addLabel("finale")
  .to(".box", { borderRadius: "50%", stagger: 0.1 }); // step 4

// ---- controls ----
document.querySelectorAll("[data-action]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    if (action === "finale") tl.play("finale");
    else tl[action]();
  });
});

// The slider sets progress directly (0 = start, 1 = end).
// This is the key mental model for scroll: scroll position → tl.progress().
scrubber.addEventListener("input", () => {
  tl.pause();
  tl.progress(Number(scrubber.value));
});
