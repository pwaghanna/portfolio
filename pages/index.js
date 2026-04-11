import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, ArrowLeft, ExternalLink } from 'lucide-react';
import skills from '../data/skills';
import projectData from '../data/projectData';

/* ─────────────────────────────────────────────
   LOCAL PROJECT LIST
   Keep in sync with your projectData.js keys
   ───────────────────────────────────────────── */
const PROJECTS = [
  {
    slug: 'ebpf-monitor',
    title: 'eBPF System Monitor',
    desc: 'Kernel-level security monitoring via syscall tracing - 14K+ events in 32s, zero loss.',
    tech: ['eBPF', 'C', 'Python', 'BCC', 'Linux Kernel'],
    github: 'github.com/pwaghanna/eBPF-Monitor',
  },
  {
    slug: 'houdini-rootkit',
    title: 'Houdini - VFS Rootkit',
    desc: 'Stealth kernel module for FreeBSD that hooks VFS-layer functions to hide files and spoof directory output.',
    tech: ['C', 'FreeBSD', 'Kernel Programming', 'VFS'],
    github: 'github.com/pwaghanna/houdini',
  },
  {
    slug: 'roomsense',
    title: 'RoomSense - AR Classroom',
    desc: 'Snap Spectacles AR platform for real-time student engagement at 20 FPS. 8.75/10 satisfaction in user studies.',
    tech: ['Next.js', 'TypeScript', 'Flask', 'MongoDB', 'Snap AR'],
    website: 'sites.google.com/view/roomsense/',
  },
  {
    slug: 'lhupr',
    title: 'LHUPR - Distributed VCS',
    desc: 'Full distributed version-control system built from scratch in Rust: commits, branching, merging, remote sync.',
    tech: ['Rust', 'Distributed Systems', 'File Systems'],
  },
  {
    slug: 'cryptopals',
    title: 'Cryptopals Challenges',
    desc: 'Block ciphers, stream ciphers, padding oracle attacks, key recovery. Refactored in C for 60% perf gain.',
    tech: ['Python', 'C', 'Cryptography'],
    github: 'github.com/pwaghanna/CrytoPals',
  },
  {
    slug: 'hack-the-box',
    title: 'HTB Penetration Testing',
    desc: '7+ HackTheBox labs: recon, exploitation, reporting. Custom automation scripts reduced exploit time 30%.',
    tech: ['Python', 'Bash', 'Metasploit', 'nmap'],
    github: 'github.com/pwaghanna/Pentesting_HTB',
  },
  {
    slug: 'ufw-firewall',
    title: 'UFW Security Config Guide',
    desc: 'Comprehensive implementation guide for Linux firewall config - security scenarios, best practices, real deployments.',
    tech: ['Linux', 'Network Security', 'Bash', 'Firewalls'],
    github: 'github.com/pwaghanna/ufw-guide',
  },
  {
    slug: 'huf',
    title: 'Industrial IoT Platform',
    desc: 'Led 8-person team building MERN stack app for real-time production monitoring. Reduced manual work from 1 week to seconds.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'ESP32'],
  },
];

const MARQUEE_ITEMS = [
  'Systems Programming', 'Kernel Development', 'eBPF', 'Cryptography',
  'Penetration Testing', 'Rust', 'FreeBSD', 'Linux Internals',
  'Network Security', 'Distributed Systems', 'AR / VR', 'Full Stack',
];

const NAV_SECTIONS = ['hero', 'about', 'projects', 'skills', 'experience', 'campus', 'interests', 'contact'];

/* ─────────────────────────────────────────────
   MAIN PORTFOLIO
   ───────────────────────────────────────────── */
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [page, setPage] = useState({ view: 'home', slug: '' });
  const sectionsRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      Object.entries(sectionsRef.current).forEach(([id, el]) => {
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 120 && bottom >= 120) setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openProject = (slug) => {
    setPage({ view: 'project', slug });
    window.scrollTo(0, 0);
  };

  const closeProject = () => {
    setPage({ view: 'home', slug: '' });
    window.scrollTo(0, 0);
  };

  if (page.view === 'project') {
    return <ProjectDetail slug={page.slug} onBack={closeProject} />;
  }

  return (
    <div className="portfolio-root">
      {/* Noise grain */}
      <div className="noise-overlay" aria-hidden />

      {/* Left scroll-progress line */}
      <div className="scroll-progress-track" aria-hidden>
        <div className="scroll-progress-fill" style={{ height: `${scrollProgress}%` }} />
      </div>

      {/* Side dots nav */}
      <nav className="side-nav" aria-label="Page sections">
        {NAV_SECTIONS.map(id => (
          <button
            key={id}
            className={`nav-item ${activeSection === id ? 'active' : ''}`}
            onClick={() => sectionsRef.current[id]?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={`Go to ${id}`}
          >
            <span className="nav-label">{id}</span>
            <span className="nav-pip" />
          </button>
        ))}
      </nav>

      {/* ── HERO ─────────────────────────────── */}
      <section
        ref={el => { sectionsRef.current.hero = el; }}
        className="hero-section"
        aria-label="Introduction"
      >
        <div className="hero-grid-bg" aria-hidden />
        <div className="hero-glow" aria-hidden />

        {/* Status bar at top */}
        <div className="hero-status-bar">
          <div className="hero-status-tag">
            <span className="hero-status-dot" />
            Available for opportunities
          </div>
          <span className="hero-coordinates">Rochester, NY · MS CS</span>
        </div>

        {/* Eyebrow */}
        <div className="hero-eyebrow fade-up fade-up-delay-1">
          Security Researcher &amp; Systems Engineer
        </div>

        {/* Name */}
        <h1 className="hero-name fade-up fade-up-delay-2">
          Pranav<br />
          <span className="hero-name-dim">Waghanna</span>
          <span className="cursor-blink" aria-hidden />
        </h1>

        <div className="hero-divider fade-up fade-up-delay-3" />

        {/* Footer row */}
        <div className="hero-footer fade-up fade-up-delay-4">
          <div className="hero-descriptor">
            <div className="hero-role">MS CS · University of Rochester</div>
            <p className="hero-bio">
              Building things at the intersection of systems security and low-level programming.
              From VFS-layer rootkits to distributed version control - I write code that talks to kernels.
            </p>
          </div>

          <div className="hero-actions">
            <a
              href="/Resume_PranavWaghanna.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
            >
              View Résumé <ArrowUpRight size={14} />
            </a>
            <div className="hero-social-links">
              <a href="https://github.com/pwaghanna" target="_blank" rel="noopener noreferrer" className="hero-social-link">
                <Github size={12} /> GitHub
              </a>
              <a href="https://linkedin.com/in/pranav-waghanna" target="_blank" rel="noopener noreferrer" className="hero-social-link">
                <Linkedin size={12} /> LinkedIn
              </a>
              <a href="mailto:pranav.waghanna@gmail.com" className="hero-social-link">
                <Mail size={12} /> Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────── */}
      <div className="marquee-section" aria-hidden>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────── */}
      <section ref={el => { sectionsRef.current.about = el; }} aria-label="About">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-heading-group">
              <span className="section-number">01</span>
              <h2 className="section-title">About</h2>
            </div>
            <span className="section-meta">Background</span>
          </div>

          <div className="about-grid">
            <p className="about-statement">
              I build tools that operate where most engineers
              don&apos;t look - the <span className="about-statement-accent">kernel</span>,
              the <span className="about-statement-accent">syscall layer</span>,
              the raw byte stream.
            </p>

            <div className="about-detail-list">
              {[
                {
                  label: 'Education',
                  value: 'MS Computer Science, University of Rochester (2024–2025). BS Information Technology, PICT Pune (2020–2024).',
                },
                {
                  label: 'Specialization',
                  value: 'Computer Security Foundations · Cryptography · Systems Programming · Collaborative Software Design.',
                },
                {
                  label: 'Currently',
                  value: 'Freelance Backend Developer at Brydge - social experiences platform built on Node.js, Supabase, and Railway.',
                },
                {
                  label: 'Research',
                  value: 'Kernel-level rootkit development (VFS hooking), eBPF syscall monitoring, distributed systems in Rust.',
                },
                {
                  label: 'Interests',
                  value: 'Penetration testing · Exploit development · Formula 1 strategy & engineering · Martial arts · Kart racing.',
                },
              ].map(({ label, value }) => (
                <div className="about-detail-item" key={label}>
                  <span className="about-detail-label">{label}</span>
                  <span className="about-detail-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────── */}
      <section ref={el => { sectionsRef.current.projects = el; }} aria-label="Projects">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-heading-group">
              <span className="section-number">02</span>
              <h2 className="section-title">Projects</h2>
            </div>
            <span className="section-meta">{PROJECTS.length} selected works</span>
          </div>

          <div className="projects-list">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.slug}
                className="project-row"
                role="button"
                tabIndex={0}
                onClick={() => openProject(project.slug)}
                onKeyDown={e => e.key === 'Enter' && openProject(project.slug)}
              >
                <span className="project-num">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="project-content">
                  <div className="project-title">{project.title}</div>
                  <div className="project-desc">{project.desc}</div>
                </div>

                <div className="project-tags">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="project-tag">+{project.tech.length - 3}</span>
                  )}
                </div>

                <ArrowUpRight className="project-arrow" size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────── */}
      <section ref={el => { sectionsRef.current.skills = el; }} aria-label="Skills">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-heading-group">
              <span className="section-number">03</span>
              <h2 className="section-title">Skills</h2>
            </div>
            <span className="section-meta">Technical stack</span>
          </div>

          <div className="skills-list">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-row">
                <span className="skill-category-label">{category}</span>
                <div className="skill-pills">
                  {items.map(skill => (
                    <span key={skill} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────── */}
      <section ref={el => { sectionsRef.current.experience = el; }} aria-label="Experience">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-heading-group">
              <span className="section-number">04</span>
              <h2 className="section-title">Experience</h2>
            </div>
            <span className="section-meta">Work history</span>
          </div>

          <div className="experience-list">
            {/* Brydge */}
            <div className="exp-card">
              <div className="exp-card-header">
                <div>
                  <div className="exp-role">Backend Developer</div>
                  <div className="exp-company">Brydge · Freelance Contract</div>
                </div>
                <div className="exp-date">Feb 2026 - Present</div>
              </div>
              <div className="exp-bullets">
                {[
                  'Built a social experiences booking platform - vanilla JS SPA (Vite + Navigo) with Node.js/Express backend deployed on Railway with Supabase (PostgreSQL + Cloudflare R2).',
                  'Designed and integrated REST APIs for event management, booking workflows, and secure UPI/QR payment processing with automated email notifications.',
                  'Engineered a CI/CD pipeline via GitHub Actions reducing manual deployment work from hours to minutes; contributed to ₹2L+ revenue in the first 4 weeks.',
                  'Leveraged AI/LLM tooling to optimize development workflows and improve platform SEO discoverability.',
                  'Built admin modules for finance tracking, campaign email tooling, user analytics, and a Google Colab data pipeline for bulk user entry classification.',
                ].map((b, i) => (
                  <div key={i} className="exp-bullet">
                    <span className="exp-bullet-marker">▸</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Huf India */}
            <div className="exp-card">
              <div className="exp-card-header">
                <div>
                  <div className="exp-role">Full Stack Developer</div>
                  <div className="exp-company">Huf India Pvt. Ltd</div>
                </div>
                <div className="exp-date">Jul 2023 - May 2024</div>
              </div>
              <div className="exp-bullets">
                {[
                  'Led a team of 8 engineers building a MERN stack industrial IoT platform for real-time production monitoring.',
                  'Integrated ESP32 microprocessors with ThingSpeak for live sensor data ingestion; hosted on AWS EC2 + Netlify.',
                  'Reduced manual processing time from 1 week to seconds through document digitisation and automated graph generation.',
                  'Implemented role-based access controls enabling technicians to view CanvasJS dashboards and trigger automated maintenance alerts - reducing errors by 15% weekly.',
                  'Integrated Ant-Design forms and cron-scheduled tasks, cutting data entry errors 15% and freeing 10 hours/week for plant supervisors.',
                ].map((b, i) => (
                  <div key={i} className="exp-bullet">
                    <span className="exp-bullet-marker">▸</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMPUS ───────────────────────────── */}
      <section ref={el => { sectionsRef.current.campus = el; }} aria-label="Campus leadership">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-heading-group">
              <span className="section-number">05</span>
              <h2 className="section-title">Leadership</h2>
            </div>
            <span className="section-meta">Campus activities</span>
          </div>

          <div className="campus-card">
            <div className="exp-card-header">
              <div>
                <div className="exp-role">Co-Founder &amp; Lead Engineer</div>
                <div className="exp-company">The Automobile Club - TorqScrew Racing, PICT · Pune</div>
              </div>
              <div className="exp-date">2021 - 2024</div>
            </div>
            <div className="exp-bullets">
              {[
                'Co-founded as one of five founding members, scaling the team from 5 to 40 members over 3 years.',
                'Mentored 20 members through design and manufacture of the team\'s first formula kart for the FKDC competition.',
                'Led R&D across 3 critical subsystems: Steering, Braking, and Powertrain.',
                'Fabricated 80% of the frame using MIG welding and lathe operations within 0.1-inch tolerance.',
                'Created detailed SolidWorks CAD models and performed structural strength analysis.',
                'Selected as primary kart driver after recording best lap times during testing.',
              ].map((b, i) => (
                <div key={i} className="exp-bullet">
                  <span className="exp-bullet-marker">▸</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERESTS ────────────────────────── */}
      <section ref={el => { sectionsRef.current.interests = el; }} aria-label="Interests">
        <div className="section-wrap">
          <div className="section-header">
            <div className="section-heading-group">
              <span className="section-number">06</span>
              <h2 className="section-title">Interests</h2>
            </div>
            <span className="section-meta">Outside the terminal</span>
          </div>

          <div className="interests-grid">
            {[
              {
                icon: '🏎',
                title: 'Formula 1',
                desc: 'Fascinated by race strategy, telemetry, aerodynamic tradeoffs, and the engineering that separates milliseconds.',
              },
              {
                icon: '🏁',
                title: 'Kart Racing',
                desc: 'National Kart Racing competitor. Participated in FKDC 2023 with deep hands-on experience in vehicle dynamics and frame fabrication.',
              },
              {
                icon: '🥋',
                title: 'Martial Arts',
                desc: 'Training in Kickboxing, Jiu Jitsu, Wrestling, and Muay Thai - focused on discipline, consistency, and mental resilience.',
              },
              {
                icon: '🎮',
                title: 'Strategy Gaming',
                desc: 'Competitive and strategy-based games: Age of Empires, No Man\'s Sky, Counter-Strike.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="interest-card">
                <div className="interest-icon-row">
                  <span className="interest-icon" role="img" aria-label={title}>{icon}</span>
                  <span className="interest-title">{title}</span>
                </div>
                <p className="interest-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────── */}
      <section ref={el => { sectionsRef.current.contact = el; }} aria-label="Contact">
        <div className="contact-section">
          <div className="section-header">
            <div className="section-heading-group">
              <span className="section-number">07</span>
              <h2 className="section-title">Contact</h2>
            </div>
            <span className="section-meta">Get in touch</span>
          </div>

          <div className="contact-body">
            {/* Left: headline + context */}
            <div className="contact-left">
              <h3 className="contact-headline">
                Open to new<br />opportunities.
              </h3>
              <p className="contact-subline">
                Whether it&apos;s security research, systems engineering, or a full-stack role -
                I&apos;m always happy to talk. Reach out via any of the channels on the right.
              </p>
              <div className="contact-availability">
                <span className="contact-availability-dot" />
                Available from Dec 2025
              </div>
            </div>

            {/* Right: contact cards */}
            <div className="contact-right">
              <a
                href="mailto:pranav.waghanna@gmail.com"
                className="contact-card"
              >
                <div className="contact-card-left">
                  <div className="contact-card-icon">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="contact-card-label">Email</div>
                    <div className="contact-card-value">pranav.waghanna@gmail.com</div>
                  </div>
                </div>
                <ArrowUpRight className="contact-card-arrow" size={16} />
              </a>

              <a
                href="https://linkedin.com/in/pranav-waghanna"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-card-left">
                  <div className="contact-card-icon">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <div className="contact-card-label">LinkedIn</div>
                    <div className="contact-card-value">linkedin.com/in/pranav-waghanna</div>
                  </div>
                </div>
                <ArrowUpRight className="contact-card-arrow" size={16} />
              </a>

              <a
                href="https://github.com/pwaghanna"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-card-left">
                  <div className="contact-card-icon">
                    <Github size={16} />
                  </div>
                  <div>
                    <div className="contact-card-label">GitHub</div>
                    <div className="contact-card-value">github.com/pwaghanna</div>
                  </div>
                </div>
                <ArrowUpRight className="contact-card-arrow" size={16} />
              </a>

              <div className="contact-location-row">
                <span className="contact-location-label">Location</span>
                <span className="contact-location-value">Rochester, New York &nbsp;·&nbsp; +1 585-537-9675</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer>
        <div className="portfolio-footer">
          <span className="footer-text">
            © 2025 <span className="footer-accent">Pranav Waghanna</span>. Built with React &amp; Vite.
          </span>
          <span className="footer-text" aria-hidden>
            <span className="footer-accent">▸</span> pwaghanna
          </span>
        </div>
      </footer>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PROJECT DETAIL
   ───────────────────────────────────────────── */
const ProjectDetail = ({ slug, onBack }) => {
  const project = projectData[slug] || {
    title: 'Project',
    overview: 'Details coming soon.',
    tech: [],
    sections: [],
  };

  return (
    <div className="detail-root">
      <div className="noise-overlay" aria-hidden />

      <button className="detail-back-btn" onClick={onBack}>
        <ArrowLeft size={12} />
        All projects
      </button>

      {/* Hero */}
      <div className="detail-hero">
        <div className="detail-tech-row">
          {(project.tech || []).map(t => (
            <span key={t} className="detail-tech-tag">{t}</span>
          ))}
        </div>

        <h1 className="detail-title">{project.title}</h1>

        {project.tagline && (
          <p className="detail-tagline">{project.tagline}</p>
        )}

        {project.overview && !project.tagline && (
          <p className="detail-tagline">{project.overview}</p>
        )}

        <div className="detail-link-row">
          {project.github && (
            <a
              href={`https://${project.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-link detail-link-primary"
            >
              <Github size={14} /> View on GitHub
            </a>
          )}
          {project.website && (
            <a
              href={`https://${project.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-link detail-link-secondary"
            >
              <ExternalLink size={14} /> Visit Website
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="detail-body">
        {/* Overview section (if tagline exists, show overview separately) */}
        {project.tagline && project.overview && (
          <div className="detail-section">
            <span className="detail-section-label">Overview</span>
            <p className="detail-section-content">{project.overview}</p>
          </div>
        )}

        {(project.sections || []).map((section, idx) => (
          <div key={idx} className="detail-section">
            <span className="detail-section-label">{section.title}</span>
            <div className="detail-section-content">
              {section.content && <p style={{ marginBottom: section.items ? '1.25rem' : 0 }}>{section.content}</p>}
              {section.items && (
                <div className="detail-items-list">
                  {section.items.map((item, i) => (
                    <div key={i} className="detail-item">
                      <span className="detail-item-marker">▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
              {section.image && (
                <img
                  src={section.image}
                  alt={section.imageAlt || section.title}
                  style={{ width: '100%', borderRadius: 0, border: '1px solid var(--border)', marginTop: '1rem' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;