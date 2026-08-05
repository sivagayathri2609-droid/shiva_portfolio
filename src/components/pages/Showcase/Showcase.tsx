import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useInView } from "@/hooks/use-in-view";
import banner1 from "@/assets/pro_banner1.png";
import banner2 from "@/assets/pro_banner2.png";
import banner3 from "@/assets/pro_banner3.png";
import banner4 from "@/assets/pro_banner4.png";
import banner5 from "@/assets/pro_banner5.png";
import "./Showcase.css";

const items = [
  { id: 1,  title: "NeoBase — Dashboard",         image: banner1 },
  { id: 2,  title: "100 Days — Onboarding",        image: banner2 },
  { id: 3,  title: "TechNeat — Analytics",         image: banner3 },
  { id: 4,  title: "Eventro — Event List",         image: banner4 },
  { id: 5,  title: "NovaRide — Booking",           image: banner5 },
  { id: 6,  title: "NeoBase — Campaigns",          image: banner1 },
  { id: 7,  title: "100 Days — Progress",          image: banner2 },
  { id: 8,  title: "TechNeat — KPI View",          image: banner3 },
  { id: 9,  title: "Eventro — Ticketing",          image: banner4 },
  { id: 10, title: "NovaRide — Live Tracking",     image: banner5 },
  { id: 11, title: "NeoBase — Investor Profile",   image: banner1 },
  { id: 12, title: "100 Days — Habit Tracker",     image: banner2 },
];

// Fixed height pattern that repeats for masonry feel
const HEIGHTS = [320, 420, 360, 480, 340, 400, 460, 320, 380, 440, 360, 400];

export function Showcase() {
  const [modalIdx, setModalIdx]   = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animKey, setAnimKey]     = useState(0);
  const scrollY = useRef(0);
  const { ref: pageRef, inView: pageIn } = useInView<HTMLDivElement>({ threshold: 0.05 });

  const isOpen = modalIdx !== null;

  /* ── Lock / restore body scroll ── */
  useEffect(() => {
    if (isOpen) {
      scrollY.current = window.scrollY;
      document.body.style.overflow   = "hidden";
      document.body.style.position   = "fixed";
      document.body.style.top        = `-${scrollY.current}px`;
      document.body.style.width      = "100%";
    } else {
      document.body.style.overflow   = "";
      document.body.style.position   = "";
      document.body.style.top        = "";
      document.body.style.width      = "";
      window.scrollTo(0, scrollY.current);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top      = "";
      document.body.style.width    = "";
    };
  }, [isOpen]);

  const open  = (idx: number) => { setModalIdx(idx); setAnimKey(k => k + 1); };
  const close = useCallback(() => setModalIdx(null), []);

  const goNext = useCallback(() => {
    setDirection("next");
    setAnimKey(k => k + 1);
    setModalIdx(i => i === null ? null : (i + 1) % items.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection("prev");
    setAnimKey(k => k + 1);
    setModalIdx(i => i === null ? null : (i - 1 + items.length) % items.length);
  }, []);

  /* ── Keyboard ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close, goNext, goPrev]);

  /* ── Focus trap ── */
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) modalRef.current?.focus();
  }, [isOpen]);

  const current = modalIdx !== null ? items[modalIdx] : null;

  return (
    <div ref={pageRef} className={`page-section showcase-page ${pageIn ? "anim-in" : ""}`}>
      <div className="anim-child anim-child--1">
        <PageHeader
          badge="Showcase"
          titleStart="Project"
          titleAccent="Showcase"
          align="left"
        />
        <p className="showcase-subtitle">
          Explore detailed project screens and design highlights.
        </p>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="showcase-grid anim-child anim-child--2">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="sg-card"
            style={{ "--card-h": `${HEIGHTS[idx % HEIGHTS.length]}px` } as React.CSSProperties}
            onClick={() => open(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View ${item.title}`}
            onKeyDown={e => e.key === "Enter" && open(idx)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="sg-card-img"
              loading="lazy"
              draggable={false}
            />
            <div className="sg-card-overlay">
              <span className="sg-card-icon" aria-hidden="true">
                <ZoomIn size={22} />
              </span>
              <span className="sg-card-title">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Fullscreen Modal ── */}
      {isOpen && current && (
        <div
          ref={modalRef}
          className="sg-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          tabIndex={-1}
          onClick={e => e.target === e.currentTarget && close()}
        >
          {/* Close */}
          <button className="sg-modal-close" onClick={close} aria-label="Close">
            <X size={20} />
          </button>

          {/* Prev */}
          <button className="sg-modal-nav sg-modal-nav--prev" onClick={goPrev} aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div className="sg-modal-content">
            <div
              key={animKey}
              className={`sg-modal-img-wrap sg-modal-img-wrap--${direction}`}
            >
              <img
                src={current.image}
                alt={current.title}
                className="sg-modal-img"
                draggable={false}
              />
            </div>
            <p className="sg-modal-caption">
              <span className="sg-modal-caption-title">{current.title}</span>
              <span className="sg-modal-caption-count">
                {(modalIdx ?? 0) + 1} / {items.length}
              </span>
            </p>
          </div>

          {/* Next */}
          <button className="sg-modal-nav sg-modal-nav--next" onClick={goNext} aria-label="Next image">
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
