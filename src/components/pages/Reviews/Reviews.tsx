import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useInView } from "@/hooks/use-in-view";
import "./Reviews.css";

const reviews = [
  { name: "Alex Morgan",    role: "Product Manager",          text: "Siva is an exceptional UX/UI designer who truly understands user needs. Her designs are clean, modern, and highly impactful.",          avatar: "/client-alex.png"    },
  { name: "Priya Sharma",   role: "Founder, HealthTech",      text: "Working with Siva was a fantastic experience. She delivered high-quality designs on time and was open to feedback throughout.",           avatar: "/client-priya.png"   },
  { name: "Daniel Lewis",   role: "CEO, Novaride",            text: "Siva has a great eye for detail and a strong design sense. She is proactive, creative, and always goes the extra mile to deliver.",       avatar: "/client-daniel.png"  },
  { name: "Sara Johnson",   role: "Head of Product, Finly",   text: "Her ability to translate complex requirements into intuitive UI is remarkable. The final product exceeded all our expectations.",         avatar: "/client-sara.png"    },
  { name: "Ravi Kumar",     role: "Startup Founder",          text: "Siva designed our entire app from scratch. The attention to detail and quality of work was outstanding. Highly recommend!",               avatar: "/client-ravi.png"    },
  { name: "Emily Chen",     role: "UX Lead, TechCorp",        text: "A true professional. Siva's designs are always pixel-perfect, well-documented, and developer-friendly. A pleasure to work with.",         avatar: "/client-emily.png"   },
  { name: "James Patel",    role: "Co-founder, Eventro",      text: "Siva brought our vision to life beautifully. Her research-driven approach ensured users loved the product from day one.",                 avatar: "/client-james.png"   },
  { name: "Maria Gonzalez", role: "Creative Director",        text: "Incredibly talented designer with a strong eye for aesthetics. She delivered on time and maintained great communication throughout.",      avatar: "/client-maria.png"   },
  { name: "Liam Thompson",  role: "CTO, Buildify",            text: "Siva's design systems are scalable and thoughtfully structured. She made developer handoff seamless and reduced build time significantly.", avatar: "/client-liam.png"    },
]

const GAP = 20; // px between cards
const AUTO_MS = 4000;
const ANIM_MS = 420;

function useVisible() {
  const [vis, setVis] = useState(3);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setVis(w <= 600 ? 1 : w <= 900 ? 2 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return vis;
}

export function Reviews() {
  const total = reviews.length;
  const vis = useVisible();
  const { ref: pageRef, inView: pageIn } = useInView<HTMLDivElement>({ threshold: 0.1 });

  // Triple-clone so we always have cards on both sides for infinite loop
  const cloned = [...reviews, ...reviews, ...reviews];

  // Current index into the cloned array — starts at `total` (middle block)
  const [idx, setIdx] = useState(total);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);

  // Drag state
  const dragX = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // After CSS transition ends, silently jump to equivalent middle-block position
  const onTransitionEnd = useCallback(() => {
    setAnim(false);
    setIdx(prev => {
      if (prev >= total * 2) return prev - total;
      if (prev < total)     return prev + total;
      return prev;
    });
    // re-enable animation next frame
    requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
  }, [total]);

  const go = useCallback((delta: number) => {
    setAnim(true);
    setIdx(prev => prev + delta);
  }, []);

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch / mouse swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const delta = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
  };

  // cardWidth: (viewport - gaps) / visible
  // We express this in CSS using calc() so it's always accurate
  const cardWidthCSS = `calc((100% - ${GAP * (vis - 1)}px) / ${vis})`;

  // translateX: move by idx card-widths + gaps
  // Each step = one card width + one gap
  const translateCSS = `calc(${idx} * (-1 * (${cardWidthCSS} + ${GAP}px)))`;

  // Dots: based on position within middle block
  const activeDot = ((idx - total) % total + total) % total;

  return (
    <div
      ref={pageRef}
      className={`page-section reviews-page ${pageIn ? "anim-in" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="anim-child anim-child--1">
        <PageHeader badge="Reviews" titleStart="What" titleAccent="Clients" titleEnd="Say?" align="left" />
      </div>

      <div className="reviews-carousel anim-child anim-child--2">
        <button className="carousel-arrow" onClick={prev} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>

        {/* Viewport clips overflow */}
        <div
          ref={viewportRef}
          className="reviews-viewport"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div
            className="reviews-track"
            style={{
              transform: `translateX(${translateCSS})`,
              transition: anim ? `transform ${ANIM_MS}ms cubic-bezier(0.4,0,0.2,1)` : "none",
              gap: `${GAP}px`,
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {cloned.map((r, i) => (
              <article
                key={i}
                className="review-card"
                style={{ minWidth: cardWidthCSS, maxWidth: cardWidthCSS }}
              >
                <span className="review-quote"><Quote size={26} /></span>
                <p className="review-text">{r.text}</p>
                <div className="review-stars">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} size={15} className="review-star" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <div className="review-divider" />
                <div className="review-author">
                  <span className="review-avatar">
                    {r.avatar
                      ? <img src={r.avatar} alt={r.name} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; (e.currentTarget.nextSibling as HTMLElement).style.display = "grid"; }} />
                      : null}
                    <span className="review-avatar-fallback" style={{ display: r.avatar ? "none" : "grid" }}>{r.name[0]}</span>
                  </span>
                  <div>
                    <p className="review-name">{r.name}</p>
                    <p className="review-role">{r.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button className="carousel-arrow" onClick={next} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots — one per original review */}
      <div className="reviews-dots anim-child anim-child--3">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={`review-dot ${i === activeDot ? "is-active" : ""}`}
            onClick={() => { setAnim(true); setIdx(total + i); }}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
