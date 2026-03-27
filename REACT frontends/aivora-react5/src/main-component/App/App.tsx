import { useEffect } from "react";
import Lenis from "lenis";
import AllRoute from "../router";
import ErrorBoundary from "./ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

const App: React.FC = () => {
  // ======================
  // 🌀 Lenis Smooth Scroll
  // ======================
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    let animationFrame: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // ✅ Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  // ======================
  // SplitText Reveal Animation
  // ======================
  useEffect(() => {
    const applySplitTextReveal = () => {
      const elements = document.querySelectorAll<HTMLElement>(".xb-text-reveal");
      if (!elements.length) return;

      elements.forEach((el) => {
        if (el.dataset.splitApplied === "true") return;
        el.dataset.splitApplied = "true";

        try {
          const split = new SplitText(el, {
            type: "lines,words,chars",
            linesClass: "split-line",
          });

          gsap.set(split.chars, { opacity: 0.3, x: -7 });

          gsap.to(split.chars, {
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 60%",
              scrub: 1,
              markers: false,
            },
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.2,
            ease: "power2.out",
          });
        } catch (error) {
          console.warn("SplitText failed:", error);
        }
      });
    };

    // Run after DOM has settled
    const timeout = setTimeout(applySplitTextReveal, 400);

    // ✅ Observe DOM changes for SPA route updates
    const observer = new MutationObserver(() => {
      requestAnimationFrame(applySplitTextReveal);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // ✅ Cleanup
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // ======================
  // Render
  // ======================
  return (
    <div className="App lenis" id="scrool">
      <ErrorBoundary>
        <AllRoute />
      </ErrorBoundary>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
