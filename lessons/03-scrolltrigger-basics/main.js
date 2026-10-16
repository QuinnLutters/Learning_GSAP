import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Plugins must be registered once before use.
gsap.registerPlugin(ScrollTrigger);

/*
  START / END SYNTAX:  "<point on the TRIGGER>  <point in the VIEWPORT>"
    "top bottom"   → when the trigger's top reaches the bottom of the screen (just entering)
    "top 80%"      → when the trigger's top is 80% down the screen
    "center center"
    "bottom top"   → when the trigger's bottom leaves the top of the screen
    "+=500"        → (end only) 500px of scrolling after start

  TOGGLE ACTIONS: four words for four moments
      onEnter   onLeave   onEnterBack   onLeaveBack
      (scroll    (scroll    (scroll back   (scroll back
       down past  down past  up past end)   up past start)
       start)     end)
  Each word is one of: play, pause, resume, reverse, restart, reset, complete, none
*/

function reveal(selector, toggleActions, extra = {}) {
  gsap.from(selector, {
    x: -300,
    rotation: -90,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: selector,
      start: "top 75%",
      end: "bottom 25%",
      toggleActions,
      markers: true,                          // turn OFF for your real site
      id: selector,                           // label shown next to the markers
      ...extra,
    },
  });
}

reveal(".b1", "play none none none");     // plays once on the way down, then stays
reveal(".b2", "play none none reverse");  // plays on the way down, rewinds when you scroll back above start
reveal(".b3", "play pause resume reset"); // pauses when it leaves, resumes when you come back, resets above start
reveal(".b4", "restart none none none");  // replays from zero every time you scroll down into it
