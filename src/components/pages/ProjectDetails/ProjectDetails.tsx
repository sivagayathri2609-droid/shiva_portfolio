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
    title: "JMR", titleAccent: "iFarms",
    subtitle: "Smart Agriculture",
    summary: "A modern website that showcases the JMR iFarms smart vertical farming unit, highlighting its technology, features, and benefits through a clean, interactive, and user-friendly experience.",
    role: "UX/UI Designer , Developer", duration: "4 Days", platform: "Product Showcase Website", industry: "AgriTech",
    overview: "The client wanted a website to showcase the JMR iFarms smart vertical farming unit and explain its technology and benefits. I independently designed and developed the complete website, creating a clean information architecture, intuitive user flow, modern UI, and responsive frontend. The website presents the product's features, working process, and advantages through interactive sections and smooth animations, making it easy for users to understand the value of the smart farming solution.",
    problems: ["Existing websites did not clearly explain the product benefits.", "Product information was difficult to understand.", "", "", ""],
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

      {/* <Section num="05" title="FINAL UI SHOWCASE">
        <div className="showcase">UI Showcase — {data.title}{data.titleAccent}</div>
      </Section> */}

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
