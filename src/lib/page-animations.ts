/**
 * Global scroll-driven animation engine.
 * Elements with [data-anim] are observed and get .anim--visible when in viewport.
 * Call init() once on app mount; returns cleanup function.
 */

export type AnimType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-x";

export function initPageAnimations(): () => void {
  if (typeof window === "undefined") return () => {};

  // Respect prefers-reduced-motion
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    // Just make everything visible immediately
    document.querySelectorAll<HTMLElement>("[data-anim]").forEach(el => {
      el.classList.add("anim--visible");
    });
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("anim--visible");
          observer.unobserve(entry.target); // play once
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  const observe = () => {
    document.querySelectorAll<HTMLElement>("[data-anim]").forEach(el => {
      // Reset if re-navigating to page
      el.classList.remove("anim--visible");
      observer.observe(el);
    });
  };

  // Initial run
  observe();

  // Re-run on route changes (DOM mutation)
  const mutationObs = new MutationObserver(() => observe());
  mutationObs.observe(document.body, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    mutationObs.disconnect();
  };
}
