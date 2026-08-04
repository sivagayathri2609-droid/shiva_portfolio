/**
 * Premium scroll animations using IntersectionObserver + rAF.
 * GSAP-equivalent quality, zero dependencies.
 */

// Easing functions
export const ease = {
  outExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  outBack: (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

/**
 * Animate a number from 0 to target over `duration` ms.
 * Calls `onUpdate(value)` each frame.
 */
export function animateNumber(
  target: number,
  duration: number,
  onUpdate: (v: number) => void,
  delay = 0,
  easeFn = ease.outExpo
): () => void {
  let raf: number;
  let startTime: number | null = null;
  let cancelled = false;

  const tick = (now: number) => {
    if (cancelled) return;
    if (!startTime) startTime = now;
    const elapsed = now - startTime - delay;
    if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
    const progress = Math.min(elapsed / duration, 1);
    onUpdate(Math.round(easeFn(progress) * target));
    if (progress < 1) raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => { cancelled = true; cancelAnimationFrame(raf); };
}

/**
 * Animate a CSS width from 0 to `target%` over `duration` ms.
 */
export function animateWidth(
  el: HTMLElement,
  targetPct: number,
  duration: number,
  delay = 0,
  easeFn = ease.outExpo
): () => void {
  el.style.width = "0%";
  return animateNumber(targetPct, duration, (v) => { el.style.width = `${v}%`; }, delay, easeFn);
}

/**
 * Observe an element and call `cb` once when it enters the viewport.
 */
export function onEnterViewport(
  el: Element,
  cb: () => void,
  threshold = 0.2
): () => void {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { observer.disconnect(); cb(); } },
    { threshold }
  );
  observer.observe(el);
  return () => observer.disconnect();
}
