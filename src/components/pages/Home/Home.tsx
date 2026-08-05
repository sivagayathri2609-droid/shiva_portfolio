import { Linkedin, Briefcase, Sparkles, UserSearch, Zap, Sparkle, Layers, Smartphone, Clock } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button/Button";
import { SectionBadge } from "@/components/SectionBadge/SectionBadge";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useInView } from "@/hooks/use-in-view";
import heroImage from "@/assets/hero-character.png";
import aboutImage from "@/assets/about-portrait.png";
import deskImage from "@/assets/desk-character.png";
import "./Home.css";

const stats = [
  { value: "25+", label: "Successful Projects" },
  { value: "15+", label: "Industry Covered" },
  { value: "100+", label: "Happy Clients" },
  { value: "1+", label: "Years of Experience" },
];

const reasons = [
  { icon: UserSearch, title: "User-Centered Approach", text: "I focus on understanding users deeply to create intuitive and engaging experiences." },
  { icon: Zap,        title: "Problem Solver Mindset", text: "I turn complex problems into simple, effective design solutions that drive results." },
  { icon: Sparkle,    title: "Pixel Perfect Designs",  text: "I pay attention to every detail, ensuring clean, modern, and visually appealing designs." },
  { icon: Smartphone, title: "Responsive & Adaptive",  text: "I design seamless experiences that work beautifully across all devices and screen sizes." },
  { icon: Layers,     title: "Clear Communication",    text: "I believe in transparent communication and collaboration at every step of the project." },
  { icon: Clock,      title: "On-Time Delivery",       text: "I value your time and always deliver quality work within the committed timeline." },
];

export function Home() {
  const navigate = useNavigate();

  // Section refs for scroll-triggered animations
  const { ref: heroRef,  inView: heroIn  } = useInView<HTMLElement>({ threshold: 0.2 });
  const { ref: aboutRef, inView: aboutIn } = useInView<HTMLElement>({ threshold: 0.15 });
  const { ref: whyRef,   inView: whyIn   } = useInView<HTMLElement>({ threshold: 0.1 });

  const handleDownloadResume = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Siva_Gayathri_Resume.pdf";
    a.click();
  };

  const handleAbout = () => navigate({ to: "/about" });

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section ref={heroRef} className={`page-section hero ${heroIn ? "anim-in" : ""}`}>
        <div className="hero-title-wrap anim-child anim-child--1">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            UX/UI Designer & Frontend Developer
          </div>
          <h1 className="hero-title">
            I'm <span className="accent">Siva Gayathri</span>
          </h1>
          <p className="hero-sub">Designing <span className="accent">Meaningful</span> Digital Experiences</p>
        </div>

        <div className="hero-grid">
          <aside className="hero-side hero-side--left anim-child anim-child--2">
            <div className="hero-follow">
              <p className="hero-follow-label">Follow Me On</p>
              <div className="hero-follow-icons">
                {/* <a href="#" className="social-chip"><Linkedin size={16} /></a> */}
                <a href="https://www.behance.net/sivagayathriv38" target="_blank" rel="noopener noreferrer" className="social-chip"><span className="social-be">Be</span></a>
              </div>
            </div>
            <div className="hero-clients">
              <div className="hero-avatars">
                <span className="avatar-blob"><img src="/avatar-1.png" alt="Client" onError={e => { (e.currentTarget as HTMLImageElement).style.display="none"; }} /></span>
                <span className="avatar-blob"><img src="/avatar-2.png" alt="Client" onError={e => { (e.currentTarget as HTMLImageElement).style.display="none"; }} /></span>
                <span className="avatar-blob"><img src="/avatar-3.png" alt="Client" onError={e => { (e.currentTarget as HTMLImageElement).style.display="none"; }} /></span>
                <span className="avatar-blob avatar-blob--accent">+</span>
              </div>
              <p className="hero-clients-num">30+ Clients Worldwide</p>
              <p className="hero-clients-sub">Satisfaction rate based on 40+ projects</p>
            </div>
          </aside>

          <div className="hero-image-wrap anim-child anim-child--3 hero-float">
            <img src={heroImage} alt="Siva Gayathri" width={1024} height={1024} className="hero-image" />
          </div>

          <aside className="hero-side hero-side--right anim-child anim-child--2">
            <blockquote className="hero-quote">
              <span className="quote-mark">"</span>
              I design with purpose, passion and creativity to elevate <span className="accent">brands online.</span>
            </blockquote>
            <div className="hero-facts">
              <div className="hero-fact">
                <span className="hero-fact-icon"><Briefcase size={14} /></span>
                <span className="hero-fact-label">Experience</span>
                <span className="hero-fact-pill">2+ Years</span>
              </div>
              <div className="hero-fact">
                <span className="hero-fact-icon"><Sparkles size={14} /></span>
                <span className="hero-fact-label">Expertise</span>
                <span className="hero-fact-pill">Web & Mobile Apps</span>
              </div>
            </div>
          </aside>
        </div>

        <div className="hero-cta anim-child anim-child--4">
          <Button variant="primary" onClick={handleDownloadResume}>Download Resume</Button>
          <Button variant="ghost" icon={false} onClick={() => navigate({ to: "/contact" })}>Hire Me</Button>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section ref={aboutRef} className={`page-section home-about-section ${aboutIn ? "anim-in" : ""}`}>
        <div className="home-about">
          <div className="about-portrait-wrap anim-child anim-child--slide-left">
            <img src={aboutImage} alt="Portrait" className="about-portrait" loading="lazy" />
          </div>
          <div className="about-content anim-child anim-child--slide-right">
            <SectionBadge label="About Me" align="left" />
            <h2 className="section-title">Who is <span className="accent">Siva Gayathri?</span></h2>
            <p className="section-text">
              I'm <strong>Siva Gayathri</strong>, a passionate <strong>UX/UI Designer</strong> with <strong>1+ years of experience</strong> creating user-centered digital experiences. I enjoy transforming ideas into intuitive, visually engaging, and functional interfaces that provide meaningful experiences for users. My focus is on designing clean, modern, and accessible web and mobile applications through thoughtful user experience and interface design.
              <br /><br />
              Along with UI/UX design, I also have knowledge of <strong>Frontend Development</strong>, allowing me to understand how designs are implemented and collaborate effectively with development teams.
            </p>
            <div className="about-actions">
              <Button variant="primary" onClick={handleAbout}>About Siva Gayathri</Button>
              <span className="script accent">Siva Gayathri</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats">
            {stats.map((s, i) => (
              <div key={s.label} className={`stat-item anim-child anim-child--${i + 1}`}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
                {i < stats.length - 1 && (
                  <span className="stat-sep">
                    <span className="stat-sep-dot" />
                    <span className="stat-sep-dot stat-sep-dot--accent" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY WORK WITH ME ── */}
      <section ref={whyRef} className={`page-section why-section ${whyIn ? "anim-in" : ""}`}>
        <PageHeader badge="Why Choose Me" titleStart="Why" titleAccent="Work With Me?" />
        <div className="why-grid">
          <div className="why-list">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className={`why-item anim-child anim-child--${i + 1}`}>
                <span className="why-icon"><Icon size={18} /></span>
                <div className="why-text">
                  <h3 className="why-title">{title}</h3>
                  <p className="why-desc">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="why-illustration anim-child anim-child--slide-right why-parallax">
            <img src={deskImage} alt="Working" loading="lazy" />
          </div>
        </div>
      </section>
    </div>
  );
}
