import { Telescope, Compass, Briefcase, Users, LayoutGrid, PenTool, Layers, Monitor, Globe, User, Search, Pencil, Code2, Rocket } from "lucide-react";
import { SectionBadge } from "@/components/SectionBadge/SectionBadge";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import aboutImage from "@/assets/about-portrait.png";
import deskImage from "@/assets/experiance.png";
import "./About.css";

const responsibilities = [
  { icon: Users, label: "User Research" },
  { icon: LayoutGrid, label: "Wireframing" },
  { icon: PenTool, label: "Prototyping" },
  { icon: Layers, label: "Design Systems" },
  { icon: Monitor, label: "Responsive UI" },
  { icon: Globe, label: "Website Development" },
];

const process = [
  { icon: User,   title: "Understand", text: "I research and analyze the user needs, business goals, and project requirements." },
  { icon: Search, title: "Define",     text: "I define the problem clearly and create information architecture and user flows." },
  { icon: Pencil, title: "Design",     text: "I create wireframes, visual designs, and prototypes that bring the idea to life." },
  { icon: Code2,  title: "Develop",    text: "I collaborate with developers and ensure smooth implementation of the design." },
  { icon: Rocket, title: "Deliver",    text: "I test, refine, and deliver a final product that solves problems and delights users." },
];

export function About() {
  return (
    <div className="about-page">

      {/* WHO */}
      <section className="page-section about-hero-section">
        <div className="about-hero">
          <div className="about-portrait-wrap" data-anim="fade-left">
            <img src={aboutImage} alt="Portrait" className="about-portrait" />
          </div>
          <div className="about-hero-content" data-anim="fade-right" data-anim-delay="150">
            <SectionBadge label="About Me" align="left" />
            <h1 className="about-title">Who is <span className="accent">Siva Gayathri?</span></h1>
            <p className="about-text">
              <span className="about_para">I'm Siva Gayathri, a passionate UX/UI Designer with 1+ years of experience creating user-centered digital experiences. I specialize in designing clean, modern, and intuitive web and mobile interfaces that combine creativity with usability.<br /></span>
              Beyond UI/UX, I also have knowledge of Frontend Development, which helps me collaborate effectively with developers and create implementation-friendly designs. I enjoy understanding client requirements, researching user needs, and designing solutions that align with both business goals and user expectations.<br />
              I believe great design is not just about creating beautiful interfaces—it's about solving real user problems through simple and effective solutions.
            </p>
            <p className="script accent about-sig">Siva Gayathri</p>
          </div>
        </div>

        <section className="vision-mission-section">
          <div className="vision-mission anim-stagger">
            <article className="vm-card" data-anim="fade-up">
              <span className="vm-icon"><Telescope size={20} /></span>
              <div>
                <h3 className="vm-title">My <span className="accent">Vision</span></h3>
                <p className="vm-text">To create intuitive digital experiences that inspire trust and leave a lasting impact. Designing products where innovation meets usability to improve everyday lives.</p>
              </div>
            </article>
            <article className="vm-card" data-anim="fade-up">
              <span className="vm-icon"><Compass size={20} /></span>
              <div>
                <h3 className="vm-title">My <span className="accent">Mission</span></h3>
                <p className="vm-text">Crafting purposeful, user-first solutions that solve real-world problems. Combining research, design, and innovation to deliver exceptional digital products.</p>
              </div>
            </article>
          </div>
        </section>
      </section>

      {/* EXPERIENCE */}
      <section className="page-section experience">
        <div data-anim="fade-up"><PageHeader badge="Experience" titleStart="My" titleAccent="Experience" /></div>
        <div className="experience-grid">
          <div className="experience-photo" data-anim="fade-left">
            <img src={deskImage} alt="Working" />
          </div>
          <div className="experience-info" data-anim="fade-up" data-anim-delay="150">
            <h3 className="experience-role accent">UX / UI Designer</h3>
            <p className="experience-company">TechNeat Info Solutions</p>
            <span className="experience-date"><Briefcase size={14} /> April 2025 – Present</span>
            <p className="experience-text">Crafting user-centered digital experiences through thoughtful research, intuitive interfaces, and scalable design systems that solve real business challenges.</p>
            <div className="experience-stats anim-stagger">
              <div className="exp-stat" data-anim="zoom-in"><Briefcase size={16} /><span className="exp-stat-num">1+</span><span className="exp-stat-label">Years Experience</span></div>
              <div className="exp-stat" data-anim="zoom-in"><Layers size={16} /><span className="exp-stat-num">25+</span><span className="exp-stat-label">Projects Completed</span></div>
              <div className="exp-stat" data-anim="zoom-in"><PenTool size={16} /><span className="exp-stat-num">100+</span><span className="exp-stat-label">UI Screens Designed</span></div>
            </div>
          </div>
          <div className="experience-tasks anim-stagger" data-anim-delay="100">
            {responsibilities.map(({ icon: Icon, label }) => (
              <div key={label} className="task-chip" data-anim="fade-right">
                <span className="task-icon"><Icon size={14} /></span>{label}
                <span className="task-more">...</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="page-section process">
        <div data-anim="fade-up"><PageHeader badge="Working Process" titleStart="My Design" titleAccent="Process" /></div>
        <div className="process-timeline anim-stagger">
          {process.map((p, i) => (
            <div key={p.title} className="process-step" data-anim="fade-up">
              <span className="process-node"><p.icon size={22} /></span>
              {i < process.length - 1 && <span className="process-connector" />}
              <span className="process-num">0{i + 1}</span>
              <h4 className="process-title">{p.title}</h4>
              <p className="process-text">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
