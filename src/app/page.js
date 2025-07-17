"use client";
import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaBars, FaTimes, FaMapMarkerAlt, FaRegCircle, FaDownload, FaExternalLinkAlt, FaGithub as FaGithubAlt, FaArrowUp, FaPhone, FaGitAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub as FaGithubIcon } from "react-icons/fa";
import { SiMongodb, SiNextdotjs, SiFigma } from "react-icons/si";
import Image from "next/image";

const socials = [
  {
    href: "mailto:abhishekphulhar2006@gmail.com",
    icon: <FaEnvelope className="glow-icon" size={24} />, label: "Email"
  },
  {
    href: "https://github.com/abhisheksinghcode",
    icon: <FaGithub className="glow-icon" size={24} />, label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/abhishek-kumar-18322a33b/",
    icon: <FaLinkedin className="glow-icon" size={24} />, label: "LinkedIn"
  },
  {
    href: "https://www.instagram.com/jr._abhishek_/?__pwa=1",
    icon: <FaInstagram className="glow-icon" size={24} />, label: "Instagram"
  },
];

const navLinks = [
  { label: "Home", to: "#home" },
  { label: "About", to: "#about" },
  { label: "Skills", to: "#skills" },
  { label: "Education", to: "#education" },
  { label: "Projects", to: "#projects" },
  { label: "Contact Me", to: "#contact" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [year, setYear] = useState(null);
  const sectionIds = ["home", "about", "skills", "education", "projects", "contact"];
  const sectionRefs = useRef({});

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      let found = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) found = id;
        }
      }
      setActiveSection(found);
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Contact form feedback
  const handleContactSubmit = e => {
    e.preventDefault();
    const form = e.target;
    form.reset();
    setTimeout(() => {
      alert("Thank you for reaching out! I'll get back to you soon.");
    }, 200);
  };

  // Smooth scroll with offset for nav links
  const handleNavClick = (e, to) => {
    e.preventDefault();
    const id = to.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // header height offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setMenuOpen(false);
      document.body.classList.remove('sidebar-open');
    }
  };

  // Helper class for glowing icons in contact info
  const contactIconStyle = { color: 'var(--color-accent)', fontSize: 26, filter: 'drop-shadow(0 0 8px var(--color-accent))' };
  const contactIconLargeStyle = { color: 'var(--color-accent)', fontSize: 32, filter: 'drop-shadow(0 0 8px var(--color-accent))' };

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null; // or a loading spinner

  return (
    <>
      <div id="home"></div>
      {/* Header & Nav */}
      <header className="modern-header">
        <div className="section header-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 0.5rem" }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div>
              <h1 className="header-title" style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: 1 }}>Abhishek Singh</h1>
              <div className="header-tagline" style={{ fontSize: "0.8rem", color: "var(--color-accent)", fontWeight: 500 }}>Frontend Web Developer | JavaScript Enthusiast</div>
            </div>
          </motion.div>
          {/* Desktop Nav */}
          <nav className="desktop-nav header-nav" style={{ display: "flex", gap: "0.2rem", alignItems: "center" }}>
            {navLinks.map(link => (
              <a key={link.label} href={link.to} style={{ fontWeight: 500, fontSize: "1rem" }} className={activeSection === link.to.replace('#','') ? "active-nav" : ""} onClick={e => handleNavClick(e, link.to)}>{link.label}</a>
            ))}
            <a href="/resume.pdf" download className="glow-icon header-resume-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginLeft: 16 }} aria-label="Download Resume">
              <FaDownload /> Resume
            </a>
          </nav>
          {/* Mobile Nav Toggle */}
          <button className="mobile-nav-toggle" aria-label="Open menu" onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", display: "none" }}>
            <FaBars className="glow-icon" size={28} />
          </button>
        </div>
        {/* Mobile Sidebar Nav */}
        {menuOpen && (
          <>
            <div className="dimmed-bg" onClick={() => { setMenuOpen(false); document.body.classList.remove('sidebar-open'); }} aria-label="Close menu overlay" tabIndex={0}></div>
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ position: "fixed", top: 0, right: 0, width: "70vw", maxWidth: 320, height: "100vh", background: "var(--color-bg-secondary)", boxShadow: "-2px 0 24px #00fff733", zIndex: 100, display: "flex", flexDirection: "column", padding: "2rem 1.5rem" }}
              onAnimationStart={() => { document.body.classList.add('sidebar-open'); }}
              onAnimationComplete={() => { if (!menuOpen) document.body.classList.remove('sidebar-open'); }}
            >
              <button aria-label="Close menu" onClick={() => { setMenuOpen(false); document.body.classList.remove('sidebar-open'); }} style={{ alignSelf: "flex-end", background: "none", border: "none", marginBottom: 32 }}>
                <FaTimes className="glow-icon" size={28} />
              </button>
              {navLinks.map(link => (
                <a key={link.label} href={link.to} onClick={e => handleNavClick(e, link.to)} style={{ fontWeight: 600, fontSize: "1.2rem", margin: "1.2rem 0", display: "block" }} className={activeSection === link.to.replace('#','') ? "active-nav" : ""}>{link.label}</a>
              ))}
              <div style={{ marginTop: "2rem", display: "flex", gap: 20 }}>
                {socials.map(s => (
                  <span className="tooltip" key={s.label} tabIndex={0} aria-label={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{s.icon}</a>
                    <span className="tooltiptext">{s.label}</span>
                  </span>
                ))}
              </div>
              <a href="/resume.pdf" download className="glow-icon" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--color-bg-secondary)", color: "var(--color-accent)", border: "1px solid var(--color-accent)", borderRadius: 8, padding: "0.7em 1.2em", fontWeight: 600, fontSize: 16, boxShadow: "0 0 8px #00fff733", transition: "background 0.2s, color 0.2s, border 0.2s", marginTop: 32, justifyContent: "center" }} aria-label="Download Resume">
                <FaDownload /> Resume
              </a>
            </motion.div>
          </>
        )}
      </header>
      <div className="header-accent-bar" />

      {/* About Me */}
      <section id="about" className="section fade-in" style={{ textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 18 }}>
            {/* DP Placeholder */}
            <div className="dp-img-wrap">
              <Image src="/pic1.jpg" alt="Profile" width={110} height={110} style={{ borderRadius: "50%", objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
            <div className="tagline" style={{ textAlign: "center", marginTop: 8 }}>Hi, I’m Abhishek 👋 | I build sleek, modern web apps.</div>
          </div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: 12 }}>About Me</h2>
          <p style={{ maxWidth: 600, margin: "0 auto", fontSize: "1.15rem", color: "#b0b0c3" }}>
            Hi! I'm Abhishek Singh, a passionate Frontend Web Developer from Phulhar, Madhubani, Bihar, India. I love building beautiful, performant web apps with JavaScript, React, and modern web technologies. I'm always eager to solve problems and learn new things.
          </p>
          <div className="fun-fact">Fun fact: I love solving coding challenges and learning new frameworks!</div>
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" className="section fade-in" style={{ textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontSize: "1.7rem", marginBottom: 18 }}>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, margin: "0 auto", maxWidth: 900 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <FaHtml5 className="glow-icon" size={38} style={{ color: "#e44d26" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>HTML</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <FaCss3Alt className="glow-icon" size={38} style={{ color: "#1572b6" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>CSS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <FaJs className="glow-icon" size={38} style={{ color: "#f7df1e" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>JavaScript</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <FaReact className="glow-icon" size={38} style={{ color: "#61dafb" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>React</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <FaNodeJs className="glow-icon" size={38} style={{ color: "#3c873a" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>Node.js</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <SiMongodb className="glow-icon" size={38} style={{ color: "#47a248" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>MongoDB</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <SiNextdotjs className="glow-icon" size={38} style={{ color: "#fff" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>Next.js</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <FaGitAlt className="glow-icon" size={38} style={{ color: "#f34f29" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>Git</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <FaGithubIcon className="glow-icon" size={38} style={{ color: "#fff" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>GitHub</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <SiFigma className="glow-icon" size={38} style={{ color: "#a259ff" }} />
              <span style={{ marginTop: 8, fontWeight: 500 }}>Figma</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <svg className="glow-icon" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="19" cy="19" r="19" fill="#00C4CC" />
                <text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold" fontFamily="Poppins,Arial,sans-serif" dy=".3em">C</text>
              </svg>
              <span style={{ marginTop: 8, fontWeight: 500 }}>Canva</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Education */}
      <section id="education" className="section fade-in">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: 24 }}>Education</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="card">
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>B.Tech in Computer Science & Engineering (AI)</div>
              <div style={{ color: "var(--color-accent)", fontWeight: 500 }}>Arya College of Engineering & IT, Jaipur, Rajasthan</div>
              <div style={{ fontSize: "0.95rem", color: "#b0b0c3" }}>2025-29 – Present</div>
            </div>
            <div className="card">
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>Intermediate in Science (PCM)</div>
              <div style={{ color: "var(--color-accent)", fontWeight: 500 }}>Kalidas Vidyapati Science College, Benipatti, Madhubani</div>
            </div>
            <div className="card">
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>Matriculation</div>
              <div style={{ color: "var(--color-accent)", fontWeight: 500 }}>Academic Score: 69.8%</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: 24 }}>Projects</h2>
          <div className="projects-grid fade-in">
            {/* Project 1 */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Image Placeholder */}
              <div style={{ width: "100%", height: 120, background: "linear-gradient(135deg, #23233a 60%, #00fff7 100%)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, overflow: "hidden" }}>
                <Image src="/project-placeholder.svg" alt="Portfolio Project" width={120} height={90} style={{ objectFit: "contain" }} />
              </div>
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>Modern Portfolio Website</div>
              <div style={{ color: "#b0b0c3", fontSize: "0.98rem" }}>A sleek, responsive portfolio built with React, Next.js, and glowing UI effects. (This site!)</div>
              {/* Tech Badges */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "4px 0" }}>
                <span style={{ background: "#181824", color: "#61dafb", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>React</span>
                <span style={{ background: "#181824", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>Next.js</span>
                <span style={{ background: "#181824", color: "#e44d26", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>HTML</span>
                <span style={{ background: "#181824", color: "#1572b6", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>CSS</span>
              </div>
              {/* Features */}
              <ul className="project-features">
                <li>Responsive, modern UI</li>
                <li>Glowing icons and dark theme</li>
                <li>Framer Motion animations</li>
              </ul>
              {/* Links */}
              <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                <a href="#" target="_blank" rel="noopener noreferrer" className="glow-icon" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 15 }} aria-label="Live Demo"><FaExternalLinkAlt /> Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="glow-icon" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 15 }} aria-label="GitHub"><FaGithubAlt /> GitHub</a>
              </div>
            </div>
            {/* Project 2 */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: "100%", height: 120, background: "linear-gradient(135deg, #23233a 60%, #f7df1e 100%)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, overflow: "hidden" }}>
                <Image src="/project-placeholder.svg" alt="Weather App" width={120} height={90} style={{ objectFit: "contain" }} />
              </div>
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>Weather App (Demo) <span className="coming-soon">Coming Soon</span></div>
              <div style={{ color: "#b0b0c3", fontSize: "0.98rem" }}>A simple weather dashboard using OpenWeatherMap API and animated icons.</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "4px 0" }}>
                <span style={{ background: "#181824", color: "#f7df1e", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>JavaScript</span>
                <span style={{ background: "#181824", color: "#61dafb", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>React</span>
                <span style={{ background: "#181824", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>Next.js</span>
              </div>
              <ul className="project-features">
                <li>Weather API integration</li>
                <li>Animated weather icons</li>
                <li>Mobile-first design</li>
              </ul>
              <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                <a href="#" target="_blank" rel="noopener noreferrer" className="glow-icon" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 15 }} aria-label="Live Demo"><FaExternalLinkAlt /> Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="glow-icon" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 15 }} aria-label="GitHub"><FaGithubAlt /> GitHub</a>
              </div>
            </div>
            {/* Project 3 */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: "100%", height: 120, background: "linear-gradient(135deg, #23233a 60%, #3c873a 100%)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, overflow: "hidden" }}>
                <Image src="/project-placeholder.svg" alt="Task Manager" width={120} height={90} style={{ objectFit: "contain" }} />
              </div>
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>Task Manager (Demo)</div>
              <div style={{ color: "#b0b0c3", fontSize: "0.98rem" }}>A productivity app to manage daily tasks with a clean, dark UI.</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "4px 0" }}>
                <span style={{ background: "#181824", color: "#3c873a", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>Node.js</span>
                <span style={{ background: "#181824", color: "#47a248", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>MongoDB</span>
                <span style={{ background: "#181824", color: "#f7df1e", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>JavaScript</span>
              </div>
              <ul className="project-features">
                <li>Task CRUD operations</li>
                <li>Dark UI & responsive</li>
                <li>MongoDB backend</li>
              </ul>
              <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                <a href="#" target="_blank" rel="noopener noreferrer" className="glow-icon" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 15 }} aria-label="Live Demo"><FaExternalLinkAlt /> Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="glow-icon" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 15 }} aria-label="GitHub"><FaGithubAlt /> GitHub</a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Me Section - Split Left/Right */}
      <section id="contact" className="section fade-in" style={{ textAlign: "center", padding: 0 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: 12, textAlign: 'center' }}>Contact Me</h2>
          <div className="contact-split" style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', margin: '0 auto', maxWidth: 900 }}>
            {/* Left: Info */}
            <div className="contact-info" style={{ flex: 1, minWidth: 260, maxWidth: 340, background: 'rgba(24,24,36,0.85)', borderRadius: 16, padding: '2rem 1.2rem', boxShadow: '0 2px 24px 0 #00fff71a', border: '1.5px solid var(--color-accent)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, marginBottom: 24 }}>
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-accent)', marginBottom: 8 }}>Get in Touch</div>
                <div style={{ color: '#b0b0c3', fontSize: '1rem', marginBottom: 18 }}>Feel free to reach out for opportunities or just to say hi!</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 0, marginLeft: 0, filter: 'drop-shadow(0 0 8px var(--color-accent))' }}>
                    <rect x="4" y="8" width="24" height="16" rx="4" stroke="var(--color-accent)" strokeWidth="2.2" fill="none" />
                    <path d="M6 10l10 8 10-8" stroke="var(--color-accent)" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
                  </svg>
                  <a href="mailto:abhishekphulhar2006@gmail.com" style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '1.05rem' }}>abhishekphulhar2006@gmail.com</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <FaMapMarkerAlt style={{ color: 'var(--color-accent)' }} />
                  <span style={{ color: '#fff', fontWeight: 500, fontSize: '1.05rem' }}>Phulhar, Madhubani, Bihar, India</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <FaRegCircle style={{ color: '#00ff7f' }} />
                  <span style={{ color: '#00ff7f', fontWeight: 500, fontSize: '1.05rem' }}>Available for work</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <FaPhone style={{ color: 'var(--color-accent)' }} />
                  <a href="tel:+919999999999" style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '1.05rem' }}>+91 99999 99999</a>
                </div>
                <div style={{ display: 'flex', gap: 18, marginTop: 18 }}>
                  {socials.map(s => (
                    <span className="tooltip" key={s.label} tabIndex={0} aria-label={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{s.icon}</a>
                      <span className="tooltiptext">{s.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Right: Form */}
            <div className="contact-form-wrap" style={{ flex: 2, minWidth: 260, maxWidth: 500, margin: '0 auto' }}>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-accent)', marginBottom: 18, textAlign: 'center' }}>Send Me a Message</div>
              <form className="contact-form" onSubmit={handleContactSubmit} aria-label="Contact Form" autoComplete="off">
                <div className="contact-group">
                  <input required name="name" id="contact-name" className="contact-input" type="text" autoComplete="off" aria-label="Name" placeholder=" " />
                  <label htmlFor="contact-name" className="contact-label">Name</label>
                </div>
                <div className="contact-group">
                  <input required name="email" id="contact-email" className="contact-input" type="email" autoComplete="off" aria-label="Email" placeholder=" " />
                  <label htmlFor="contact-email" className="contact-label">Email</label>
                </div>
                <div className="contact-group">
                  <input required name="subject" id="contact-subject" className="contact-input" type="text" autoComplete="off" aria-label="Subject" placeholder=" " />
                  <label htmlFor="contact-subject" className="contact-label">Subject</label>
                </div>
                <div className="contact-group">
                  <textarea required name="message" id="contact-message" className="contact-textarea" rows={4} autoComplete="off" aria-label="Message" placeholder=" " />
                  <label htmlFor="contact-message" className="contact-label">Message</label>
                </div>
                <button type="submit" className="contact-btn glow-icon" aria-label="Send Message">Send Message</button>
              </form>
            </div>
          </div>
        </motion.div>
    </section>

      {/* Footer */}
      <footer style={{ background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)", padding: "1.2rem 0", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 20 }}>
            {socials.map(s => (
              <span className="tooltip" key={s.label} tabIndex={0} aria-label={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{s.icon}</a>
                <span className="tooltiptext">{s.label}</span>
              </span>
            ))}
          </div>
          {year && <div style={{ fontSize: "1rem", color: "#b0b0c3" }}>© {year} Abhishek Singh</div>}
          <div style={{ fontSize: "0.9rem", color: "#b0b0c3" }}>Built with Next.js, React, and a passion for web development.</div>
        </div>
      </footer>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <FaArrowUp />
        </button>
      )}

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .section { padding: 1.2rem 0.5rem; }
        }
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
        @media (min-width: 701px) {
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
}
