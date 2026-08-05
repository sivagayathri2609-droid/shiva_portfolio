import { useParams, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Users, Workflow, LayoutGrid, Palette, Settings, PlayCircle, Code2, Search, PenTool, MousePointer, Check, TrendingUp, Zap, Target, Cpu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { projects } from "@/components/pages/Projects/Projects";
import { useInView } from "@/hooks/use-in-view";
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
}> = {
  "neobase": {
    title: "Neo", titleAccent: "Base",
    subtitle: "Investment Platform",
    summary: "A seamless investment platform that connects businesses with investors and simplifies capital raising.",
    role: "UX/UI Designer", duration: "3 Months", platform: "Web & Mobile", industry: "FinTech",
    overview: "NeoBase is an investment platform designed for startups and businesses to raise capital from verified investors. It provides a transparent, secure, and efficient way to manage campaigns, track investments, and ensure growth.",
    problems: ["Startups struggle to find the right investors.", "Lack of transparency in fundraising process.", "Complex investment tracking and management.", "Poor user experience across existing platforms."],
    solutions: ["An intuitive platform connecting the right investors with the right opportunities.", "Real-time tracking, transparent process & secure transactions.", "A seamless experience for both businesses and investors."],
    outcomes: [
      { icon: TrendingUp, value: "40%", label: "Increase in investor engagement" },
      { icon: Zap, value: "60%", label: "Faster campaign creation" },
      { icon: Target, value: "35%", label: "Improved user retention" },
      { icon: Cpu, value: "100%", label: "Developer-ready design system" },
    ],
  },
  "100-days-lifestyle": {
    title: "100 Days", titleAccent: "Lifestyle",
    subtitle: "Wellness Challenge App",
    summary: "A habit-tracking app that guides users through a 100-day lifestyle transformation journey.",
    role: "UX/UI Designer", duration: "2 Months", platform: "iOS & Android", industry: "Lifestyle",
    overview: "100 Days Lifestyle is a mobile wellness app designed to help users build lasting habits over 100 days. It combines daily challenges, progress tracking, and community features to keep users motivated throughout their journey.",
    problems: ["Users struggle to maintain long-term habit streaks.", "Lack of visual progress feedback reduces motivation.", "No community accountability features.", "Generic content that doesn't adapt to user goals."],
    solutions: ["Daily micro-challenges with streak rewards.", "Visual progress rings and milestone celebrations.", "Community challenges and accountability partners.", "Personalized goal setting and adaptive content."],
    outcomes: [
      { icon: TrendingUp, value: "72%", label: "User retention at day 30" },
      { icon: Zap, value: "85%", label: "Daily active usage rate" },
      { icon: Target, value: "60%", label: "Habit completion rate" },
      { icon: Cpu, value: "4.8★", label: "App store rating" },
    ],
  },
  "techneat": {
    title: "Tech", titleAccent: "Neat",
    subtitle: "SaaS Dashboard",
    summary: "A clean, scalable SaaS dashboard for managing business operations and analytics.",
    role: "UX/UI Designer", duration: "3 Months", platform: "Web", industry: "SaaS",
    overview: "TechNeat is a comprehensive SaaS dashboard designed for small to medium businesses to manage their operations, track KPIs, and visualize data in real time. The design focuses on clarity, speed, and ease of use.",
    problems: ["Existing dashboards overwhelm users with data.", "Poor mobile responsiveness on critical workflows.", "No unified view of cross-team metrics.", "Slow onboarding due to complex UI."],
    solutions: ["Progressive disclosure — show only relevant data by default.", "Mobile-first responsive layouts for all critical views.", "Unified team metrics with role-based access.", "Guided onboarding with interactive walkthroughs."],
    outcomes: [
      { icon: TrendingUp, value: "55%", label: "Reduction in support tickets" },
      { icon: Zap, value: "3x", label: "Faster task completion" },
      { icon: Target, value: "90%", label: "Onboarding completion rate" },
      { icon: Cpu, value: "100%", label: "Responsive across all devices" },
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
  },
  "novaride": {
    title: "Nova", titleAccent: "Ride",
    subtitle: "Ride Sharing Platform",
    summary: "A modern ride-sharing platform with real-time tracking and seamless booking experience.",
    role: "UX/UI Designer", duration: "4 Months", platform: "iOS & Android", industry: "Transport",
    overview: "NovaRide is a ride-sharing mobile application that provides users with fast, safe, and affordable rides. The design focuses on a frictionless booking experience, real-time driver tracking, and transparent pricing.",
    problems: ["Confusing booking flow with too many steps.", "No real-time ETA or driver location updates.", "Lack of transparent pricing before booking.", "Poor safety features for solo riders."],
    solutions: ["One-tap booking with smart destination prediction.", "Live GPS tracking with accurate ETA.", "Upfront fare estimation before confirmation.", "SOS button, trip sharing, and driver verification."],
    outcomes: [
      { icon: TrendingUp, value: "65%", label: "Increase in booking completion" },
      { icon: Zap, value: "30s", label: "Average booking time" },
      { icon: Target, value: "4.9★", label: "Average driver rating" },
      { icon: Cpu, value: "200k+", label: "Monthly active users" },
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
            <Button variant="primary">View Prototype</Button>
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
        <div className="showcase">UI Showcase — {data.title}{data.titleAccent}</div>
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
