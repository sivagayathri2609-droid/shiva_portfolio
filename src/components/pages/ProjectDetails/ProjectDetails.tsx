import { useParams, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, CheckCircle2, Users, Workflow, LayoutGrid, Palette, Settings, PlayCircle, Code2, Search, PenTool, MousePointer, Check, TrendingUp, Zap, Target, Cpu, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { projects } from "@/components/pages/Projects/Projects";
import { useInView } from "@/hooks/use-in-view";
import banner1 from "@/assets/pro_banner1.png";
import banner2 from "@/assets/pro_banner2.png";
import banner3 from "@/assets/pro_banner3.png";
import banner4 from "@/assets/pro_banner4.png";
import banner5 from "@/assets/pro_banner5.png";

import neoImg1 from "@/assets/neo_project_gallary/neo_image1.png";
import neoImg2 from "@/assets/neo_project_gallary/neo_image2.png";
import neoImg3 from "@/assets/neo_project_gallary/neo_image3.png";
import neoImg4 from "@/assets/neo_project_gallary/neo_image4.png";
import neoImg5 from "@/assets/neo_project_gallary/neo_image5.png";
import neoImg6 from "@/assets/neo_project_gallary/neo_image6.png";
import neoImg7 from "@/assets/neo_project_gallary/neo_image7.png";
import neoImg8 from "@/assets/neo_project_gallary/neo_preview_1.mp4";

import cbdImg1 from "@/assets/CBD_project_gallary/project_preview.mp4";
import cbdImg2 from "@/assets/CBD_project_gallary/image_1.png";
import cbdImg3 from "@/assets/CBD_project_gallary/image_2.png";
import cbdImg4 from "@/assets/CBD_project_gallary/image_3.png";
import cbdImg5 from "@/assets/CBD_project_gallary/image_4.png";
import cbdImg6 from "@/assets/CBD_project_gallary/image_5.png";
import cbdImg7 from "@/assets/CBD_project_gallary/image_6.png";

import iforms1 from "@/assets/jmriforms_gallary/project_preview.mp4";
import iforms2 from "@/assets/jmriforms_gallary/image_1.png";
import iforms3 from "@/assets/jmriforms_gallary/image_2.png";
import iforms4 from "@/assets/jmriforms_gallary/image_3.png";
import iforms5 from "@/assets/jmriforms_gallary/image_4.png";
import iforms6 from "@/assets/jmriforms_gallary/image_5.png";
import iforms7 from "@/assets/jmriforms_gallary/image_6.png";

import aro1 from "@/assets/Arogyanet_project_gallary/project_preview.mp4";
import aro2 from "@/assets/Arogyanet_project_gallary/image_1.png";
import aro3 from "@/assets/Arogyanet_project_gallary/image_2.png";
import aro4 from "@/assets/Arogyanet_project_gallary/image_3.png";
import aro5 from "@/assets/Arogyanet_project_gallary/image_4.png";
import aro6 from "@/assets/Arogyanet_project_gallary/image_5.png";
import aro7 from "@/assets/Arogyanet_project_gallary/image_6.png";
import aro8 from "@/assets/Arogyanet_project_gallary/image_7.png";

import "./ProjectDetails.css";

const projectData: Record<string, {
  title: string;
  titleAccent: string;
  subtitle: string;
  summary: string;
  role: string;
  duration: string;
  platform: string;
  industry: string;
  overview: string;
  problems: string[];
  solutions: string[];
  outcomes: { icon: any; value: string; label: string }[];
  gallery: { id: number; title: string; type: "image" | "video"; media: string }[];
}> = {
  "neobase": {
    title: "Neo", titleAccent: "Base",
    subtitle: "Investment Platform",
    summary: "A modern investment platform that connects businesses with verified investors through a simple, secure, and transparent process.",
    role: "UX/UI Designer", duration: "6 Months", platform: "Web & Mobile", industry: "FinTech",
    overview: "The client wanted an investment platform for businesses to raise funds from investors. I researched fintech platforms and designed the complete user experience, including user flows, information architecture, wireframes, UI designs, and prototypes. The platform features secure onboarding, document verification, wallet connection, campaign management, and investor dashboards with a focus on simplicity, security, and transparency.",
    problems: ["Complex onboarding and document verification process.", "Risk of fake business registrations and fraudulent investment requests.", "Difficulty managing fundraising campaigns, investor data, and revenue tracking.", "Existing investment platforms provide complicated user experiences.","Trust issues due to insufficient business validation."],
    solutions: ["Designed a simple onboarding flow with step-by-step document submission.", "Added KYB verification to ensure only verified businesses can join.", "Created a centralized dashboard to manage campaigns, investors, and revenue.","Designed a clean and intuitive interface for easy navigation.","Improved transparency through business verification and secure workflows."],
    outcomes: [
      { icon: TrendingUp, value: "40%", label: "Increase in investor engagement" },
      { icon: Zap, value: "60%", label: "Faster campaign creation" },
      { icon: Target, value: "35%", label: "Improved user retention" },
      { icon: Cpu, value: "100%", label: "Developer-ready design system" },
    ],
    gallery: [
      { id: 1,  title: "Prototype Preview",      type: "video", media: neoImg8 },
      { id: 2,  title: "Dashboard Overview",     type: "image", media: neoImg1 },
      { id: 3,  title: "Campaign Manager",       type: "image", media: neoImg2 },
      { id: 4,  title: "Investor Profile",       type: "image", media: neoImg3 },
      { id: 5,  title: "Wallet Connection",      type: "image", media: neoImg4 },
      { id: 6,  title: "Onboarding Flow",        type: "image", media: neoImg5 },
      { id: 7,  title: "KYB Verification",       type: "image", media: neoImg6 },
      { id: 8,  title: "Revenue Tracking",       type: "image", media: neoImg7 },
    ],
  },
  "100-days-lifestyle": {
    title: "", titleAccent: "Mythrey",
    subtitle: " Medical E-commerce",
    summary: "A healthcare platform that educates users about CBD and helps them consult certified doctors before ordering the right medication through a secure and guided experience.",
    role: "UX/UI Designer", duration: "1 Months", platform: "E-commerce Platform", industry: " Healthcare",
    overview: "The client wanted to build a healthcare platform for CBD education and medicine ordering. I designed the complete UX, including user flows, wireframes, UI designs, and prototypes. Users can learn about CBD, consult a doctor, and order the recommended medicine through a simple and secure experience.",
    problems: ["Users have limited knowledge about CBD and its medical benefits.","People are unsure whether CBD products are suitable for their health conditions.","Buying medication without professional guidance can be confusing and risky.","Existing healthcare platforms separate education, consultation, and medicine ordering.","Users need a simple and trusted healthcare experience.",],
    solutions: ["Provided educational content to help users understand CBD.","Added video and phone consultation with healthcare professionals.","Guided users to order the right medication after consultation.","Combined education, consultation, and medicine ordering into one platform.","Designed a clean and intuitive interface for a smooth user experience."],
    outcomes: [
      { icon: TrendingUp, value: "72%", label: "User retention at day 30" },
      { icon: Zap, value: "85%", label: "Daily active usage rate" },
      { icon: Target, value: "60%", label: "Habit completion rate" },
      { icon: Cpu, value: "4.8★", label: "App store rating" },
    ],
    gallery: [
      { id: 1,  title: "Home Screen",           type: "video", media: cbdImg1 },
      { id: 2,  title: "CBD Education",         type: "image" as const, media: cbdImg2 },
      { id: 3,  title: "Doctor Consultation",   type: "image" as const, media: cbdImg3 },
      { id: 4,  title: "Medicine Listing",      type: "image" as const, media: cbdImg4 },
      { id: 5,  title: "Order Flow",            type: "image" as const, media: cbdImg5 },
      { id: 6,  title: "Cart & Checkout",       type: "image" as const, media: cbdImg6 },
      { id: 7,  title: "User Profile",          type: "image" as const, media: cbdImg7 },
    ],
  },
  "techneat": {
    title: "Arogya", titleAccent: "Net",
    subtitle: "Smart Medical Records Management App",
    summary: "Keep all your medical records organized in one secure place. Upload documents, get AI-powered summaries, track your daily steps, and instantly share records with doctors whenever needed.",
    role: "UX/UI Designer", duration: "3 Months", platform: "Medical Records Management App", industry: "HealthTech",
    overview: "The client wanted a mobile app that helps users securely manage their medical records in one place. I designed the complete user experience, including user flows, wireframes, high-fidelity UI, and interactive prototypes. Users can organize medical records by category, upload documents, receive AI-generated summaries, share records with doctors instantly, and track daily steps. The app focuses on a clean and simple interface that makes healthcare information easy to access and manage.",
    problems: ["Medical records are scattered across different places.","Sharing medical documents with doctors takes time.","Long medical reports are difficult to understand.","Users struggle to organize their health records.","Many healthcare apps have complex user interfaces."],
    solutions: ["Organized medical records into easy-to-manage categories.","Enabled quick and secure document sharing with doctors.","Added AI-generated summaries for uploaded medical reports.","Designed a simple interface for easy navigation.","Included daily step tracking to encourage healthy habits."],
    outcomes: [
      { icon: TrendingUp, value: "55%", label: "Reduction in support tickets" },
      { icon: Zap, value: "3x", label: "Faster task completion" },
      { icon: Target, value: "90%", label: "Onboarding completion rate" },
      { icon: Cpu, value: "100%", label: "Responsive across all devices" },
    ],
    gallery: [
      { id: 1,  title: "Records Home",         type: "video", media: aro1 },
      { id: 2,  title: "Upload Document",      type: "image" as const, media: aro2 },
      { id: 3,  title: "AI Summary",           type: "image" as const, media: aro3 },
      { id: 4,  title: "Share with Doctor",    type: "image" as const, media: aro4 },
      { id: 5,  title: "Step Tracker",         type: "image" as const, media: aro5  },
      { id: 6,  title: "Category View",        type: "image" as const, media: aro6 },
      { id: 7,  title: "Record Detail",        type: "image" as const, media: aro7  },
      { id: 8,  title: "account",              type: "image" as const, media: aro8  },
    ],
  },
  "eventro": {
    title: "Event", titleAccent: "ro",
    subtitle: "Event Management Platform",
    summary: "A full-featured event management platform for organizers and attendees.",
    role: "UX/UI Designer", duration: "4 Months", platform: "Web & Mobile", industry: "Events",
    overview: "Eventro is a platform that simplifies the entire event lifecycle — from creation and ticketing to attendee management and post-event analytics. It serves both individual organizers and enterprise event teams.",
    problems: ["Event creation workflows are fragmented across tools.", "Poor ticket management and QR check-in experience.", "No real-time attendee engagement features.", "Limited post-event analytics and reporting."],
    solutions: ["Unified event creation wizard with templates.", "Smart QR ticketing with offline check-in support.", "Live polls, Q&A, and networking features.", "Comprehensive post-event analytics dashboard."],
    outcomes: [
      { icon: TrendingUp, value: "80%", label: "Faster event setup" },
      { icon: Zap, value: "50%", label: "Reduction in check-in time" },
      { icon: Target, value: "45%", label: "Increase in attendee engagement" },
      { icon: Cpu, value: "10k+", label: "Events successfully hosted" },
    ],
    gallery: [
      { id: 1,  title: "Event Dashboard",      type: "image" as const, media: aro1 },
      { id: 2,  title: "Create Event",         type: "image" as const, media: aro2 },
      { id: 3,  title: "Ticket Management",    type: "image" as const, media: banner4 },
      { id: 4,  title: "QR Check-In",          type: "image" as const, media: banner4 },
      { id: 5,  title: "Attendee List",        type: "image" as const, media: banner4 },
      { id: 6,  title: "Live Polls",           type: "image" as const, media: banner4 },
      { id: 7,  title: "Analytics Report",     type: "image" as const, media: banner4 },
      { id: 8,  title: "Event Template",       type: "image" as const, media: banner4 },
      { id: 9,  title: "Networking Feature",   type: "image" as const, media: banner4 },
      { id: 10, title: "Post-Event Summary",   type: "image" as const, media: banner4 },
    ],
  },
  "novaride": {
    title: "JMR", titleAccent: "iFarms",
    subtitle: "Smart Agriculture",
    summary: "A modern website that showcases the JMR iFarms smart vertical farming unit, highlighting its technology, features, and benefits through a clean, interactive, and user-friendly experience.",
    role: "UX/UI Designer , Developer", duration: "4 Days", platform: "Product Showcase Website", industry: "AgriTech",
    overview: "The client wanted a website to showcase the JMR iFarms smart vertical farming unit and explain its technology and benefits. I independently designed and developed the complete website, creating a clean information architecture, intuitive user flow, modern UI, and responsive frontend. The website presents the product's features, working process, and advantages through interactive sections and smooth animations, making it easy for users to understand the value of the smart farming solution.",
    problems: ["Existing websites did not clearly explain the product benefits.", "Product information was difficult to understand.", "Lack of engaging visuals and interactive experience.", "Poor navigation reduced the overall user experience.", "The product's technology was not presented effectively."],
    solutions: ["Designed a clean and user-friendly interface.", "Highlighted the product's key features and benefits clearly.", "Added smooth animations for better engagement.", "Created a responsive website for all devices.", "Simplified the product information with an intuitive layout."],
    outcomes: [
      { icon: TrendingUp, value: "65%", label: "Increase in booking completion" },
      { icon: Zap, value: "30s", label: "Average booking time" },
      { icon: Target, value: "4.9★", label: "Average driver rating" },
      { icon: Cpu, value: "200k+", label: "Monthly active users" },
    ],
    gallery: [
      { id: 1,  title: "Product Hero",         type: "video" as const, media: iforms1 },
      { id: 2,  title: "Features Section",     type: "image" as const, media: iforms2 },
      { id: 3,  title: "How It Works",         type: "image" as const, media: iforms3 },
      { id: 4,  title: "Technology Overview",  type: "image" as const, media: iforms4 },
      { id: 5,  title: "Benefits Grid",        type: "image" as const, media: iforms5 },
      { id: 6,  title: "Specs & Details",      type: "image" as const, media: iforms6 },
      { id: 7,  title: "Testimonials",         type: "image" as const, media: iforms7 },
    ],
  },
};

const roleItems = [
  { icon: Users, label: "UX Research" },
  { icon: Workflow, label: "User Flow" },
  { icon: LayoutGrid, label: "Wireframing" },
  { icon: Palette, label: "UI Design" },
  { icon: Settings, label: "Design System" },
  { icon: PlayCircle, label: "Prototyping" },
  { icon: Code2, label: "Developer Handoff" },
];

const processSteps = [
  { icon: Search, label: "Research" },
  { icon: LayoutGrid, label: "Wireframe" },
  { icon: PenTool, label: "UI Design" },
  { icon: MousePointer, label: "Prototype" },
  { icon: Check, label: "Final Design" },
];

export function ProjectDetails() {
  const { id } = useParams({ from: "/projects/$id" });
  const data = projectData[id] ?? projectData["neobase"];
  const project = projects.find((p) => p.id === id);
  const { ref: pageRef, inView: pageIn } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <div ref={pageRef} className={`page-section pd ${pageIn ? "anim-in" : ""}`}>
      {/* Back button */}
      <Link to="/projects" className="pd-back anim-child anim-child--1">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <header className="pd-head anim-child anim-child--2">
        <div>
          <h1 className="pd-name">{data.title}<span className="accent">{data.titleAccent}</span></h1>
          <p className="pd-subtitle">{data.subtitle}</p>
          <p className="pd-summary">{data.summary}</p>
          <div className="pd-meta">
            <div><p className="pd-meta-label">ROLE</p><p className="pd-meta-val">{data.role}</p></div>
            <div><p className="pd-meta-label">DURATION</p><p className="pd-meta-val">{data.duration}</p></div>
            <div><p className="pd-meta-label">PLATFORM</p><p className="pd-meta-val">{data.platform}</p></div>
            <div><p className="pd-meta-label">INDUSTRY</p><p className="pd-meta-val">{data.industry}</p></div>
          </div>
          <div className="pd-cta">
            {/* <Button variant="primary">View Prototype</Button> */}
            {/* <Button variant="outline">Live Website</Button> */}
          </div>
        </div>
        <div className="pd-hero-img">
          <ProjectBanner
            image={project?.image}
            name={project?.name ?? "P"}
            color={project?.color ?? "#333"}
          />
        </div>
      </header>

      <Section num="01" title="PROJECT OVERVIEW">
        <p className="pd-body">{data.overview}</p>
      </Section>

      <Section num="02" title="PROBLEM & SOLUTION">
        <div className="ps-grid">
          <div className="ps-card ps-card--problem">
            <div className="ps-head"><span className="ps-icon ps-icon--red"><AlertCircle size={18} /></span><h3>The Problem</h3></div>
            <ul>{data.problems.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
          <div className="ps-card ps-card--solution">
            <div className="ps-head"><span className="ps-icon ps-icon--green"><CheckCircle2 size={18} /></span><h3>The Solution</h3></div>
            <ul>{data.solutions.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section num="03" title="MY ROLE">
        <div className="role-grid">
          {roleItems.map(({ icon: Icon, label }) => (
            <div key={label} className="role-item">
              <span className="role-icon"><Icon size={16} /></span>
              <span className="role-label">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section num="04" title="DESIGN PROCESS">
        <div className="process-line">
          {processSteps.map((s, idx) => (
            <div key={s.label} className="pl-item">
              <span className="pl-node"><s.icon size={18} /></span>
              <span className="pl-label">{s.label}</span>
              {idx < processSteps.length - 1 && <span className="pl-arrow">›</span>}
            </div>
          ))}
        </div>
      </Section>

      <Section num="05" title="FINAL UI SHOWCASE">
        <ShowcaseGallery items={data.gallery} />
      </Section>

      <Section num="06" title="OUTCOME">
        <div className="outcome-grid">
          {data.outcomes.map(({ icon: Icon, value, label }) => (
            <div key={label} className="outcome-card">
              <span className="outcome-icon"><Icon size={18} /></span>
              <p className="outcome-value">{value}</p>
              <p className="outcome-label">{label}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ── Showcase Gallery ── */
const VISIBLE = 6;
type GalleryItem = { id: number; title: string; type: "image" | "video"; media: string };
type Dir = "next" | "prev";

/* Renders a single media item — image or video */
function GalleryMedia({ item, className }: { item: GalleryItem; className: string }) {
  if (item.type === "video") {
    return (
      <video
        src={item.media}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        draggable={false}
      />
    );
  }
  return <img src={item.media} alt={item.title} className={className} loading="lazy" draggable={false} />;
}

function ShowcaseGallery({ items }: { items: GalleryItem[] }) {
  const hiddenCount = Math.max(0, items.length - VISIBLE);
  const moreImg     = items[VISIBLE]?.image ?? items[0]?.image;

  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [dir, setDir]           = useState<Dir>("next");
  const [animKey, setAnimKey]   = useState(0);
  const scrollY                 = useRef(0);
  const modalRef                = useRef<HTMLDivElement>(null);
  const dragX                   = useRef<number | null>(null);
  const isOpen                  = modalIdx !== null;
  const current                 = modalIdx !== null ? items[modalIdx] : null;

  /* body scroll lock */
  useEffect(() => {
    if (isOpen) {
      scrollY.current = window.scrollY;
      document.body.style.cssText = `overflow:hidden;position:fixed;top:-${scrollY.current}px;width:100%`;
    } else {
      document.body.style.cssText = "";
      window.scrollTo(0, scrollY.current);
    }
    return () => { document.body.style.cssText = ""; };
  }, [isOpen]);

  useEffect(() => { if (isOpen) modalRef.current?.focus(); }, [isOpen]);

  const open  = (idx: number) => { setModalIdx(idx); setAnimKey(k => k + 1); };
  const close = useCallback(() => setModalIdx(null), []);

  const goNext = useCallback(() => {
    setDir("next"); setAnimKey(k => k + 1);
    setModalIdx(i => i === null ? 0 : (i + 1) % items.length);
  }, [items.length]);
  const goPrev = useCallback(() => {
    setDir("prev"); setAnimKey(k => k + 1);
    setModalIdx(i => i === null ? 0 : (i - 1 + items.length) % items.length);
  }, [items.length]);

  /* keyboard */
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { e.preventDefault(); close();  }
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, close, goNext, goPrev]);

  /* touch swipe in modal */
  const onPointerDown = (e: React.PointerEvent) => { dragX.current = e.clientX; };
  const onPointerUp   = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const delta = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(delta) > 48) delta < 0 ? goNext() : goPrev();
  };

  return (
    <>
      {/* ── 2-row asymmetric grid ── */}
      <div className="pd-sg-grid">

        {/* Row 1 — wide | portrait | portrait */}
        {items.slice(0, VISIBLE).map((item, idx) => (
          <div
            key={item.id}
            className={`pd-sg-card pd-sg-card--${idx}`}
            onClick={() => open(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View ${item.title}`}
            onKeyDown={e => e.key === "Enter" && open(idx)}
          >
            <GalleryMedia item={item} className="pd-sg-img" />
            <div className="pd-sg-hover-overlay" />
          </div>
        ))}

        {/* Card 6 — "More Screens" (spans 2 cols, bottom-right) */}
        <div
          className="pd-sg-card pd-sg-card--5 pd-sg-card--more"
          onClick={() => open(VISIBLE)}
          role="button"
          tabIndex={0}
          aria-label={`View ${hiddenCount} more screens`}
          onKeyDown={e => e.key === "Enter" && open(VISIBLE)}
        >
          <img src={moreImg} alt="More screens" className="pd-sg-img" loading="lazy" draggable={false} />
          <div className="pd-sg-more-overlay">
            <span className="pd-sg-more-text">+More Screens</span>
            <span className="pd-sg-more-count">+{hiddenCount} screens</span>
          </div>
        </div>

      </div>

      {/* ── Fullscreen lightbox — rendered via portal directly under <body> ── */}
      {isOpen && current && createPortal(
        <div
          ref={modalRef}
          className="pd-sg-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          tabIndex={-1}
          onClick={e => e.target === e.currentTarget && close()}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <button className="pd-sg-close" onClick={close} aria-label="Close"><X size={18} /></button>
          <button className="pd-sg-nav pd-sg-nav--prev" onClick={goPrev} aria-label="Previous"><ChevronLeft size={22} /></button>

          <div className="pd-sg-modal-body">
            <div key={animKey} className={`pd-sg-frame pd-sg-frame--${dir}`}>
              <GalleryMedia item={current} className="pd-sg-modal-img" />
            </div>
            <div className="pd-sg-caption">
              <span className="pd-sg-caption-count">
                {String((modalIdx ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <button className="pd-sg-nav pd-sg-nav--next" onClick={goNext} aria-label="Next"><ChevronRight size={22} /></button>
        </div>,
        document.body
      )}
    </>
  );
}

function ProjectBanner({ image, name, color }: { image?: string; name: string; color: string }) {
  const [loaded, setLoaded]   = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="pd-banner" style={{ "--banner-color": color } as React.CSSProperties}>
      {!loaded && !errored && <div className="pd-banner-skeleton" />}
      {image && !errored && (
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`pd-banner-img ${loaded ? "pd-banner-img--loaded" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          draggable={false}
        />
      )}
      {(errored || !image) && (
        <div className="pd-banner-fallback">
          <span className="pd-banner-initial">{name[0]}</span>
          <span className="pd-banner-fallback-label">{name}</span>
        </div>
      )}
      <div className="pd-banner-overlay" />
    </div>
  );
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });
  return (
    <section ref={ref} className={`pd-section anim-child ${inView ? "anim-section-in" : ""}`}>
      <div className="pd-section-head">
        <span className="pd-section-num">{num}</span>
        <h2 className="pd-section-title accent">{title}</h2>
      </div>
      {children}
    </section>
  );
}
