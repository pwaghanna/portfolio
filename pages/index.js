import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Code, Lock, Eye, Server, LucideBrickWallFire, Github, Linkedin, Mail, Glasses, Factory, ChevronDown, Trophy, Gamepad2, Activity, Flag, Monitor, ArrowLeft, ExternalLink, Layers } from 'lucide-react';
import skills from '../data/skills';
import projects from '../data/projects';
import projectData from '../data/projectData';

// Mock Next.js router for demo
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState('/');
  return {
    pathname: currentPath,
    push: (path) => setCurrentPath(path),
    back: () => setCurrentPath('/')
  };
};

const Portfolio = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandingProject, setExpandingProject] = useState(null);
  const [expandedBounds, setExpandedBounds] = useState(null);
  const projectRefs = useRef({});
  const sectionsRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      Object.entries(sectionsRef.current).forEach(([id, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToProject = (slug) => {
    const element = projectRefs.current[slug];
    if (element) {
      const rect = element.getBoundingClientRect();
      setExpandedBounds({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        scrollY: window.scrollY
      });
      setExpandingProject(slug);
      
      // Wait for expansion animation to complete
      setTimeout(() => {
        router.push(`/projects/${slug}`);
        window.scrollTo(0, 0);
      }, 600);
    }
  };

  const navigateBack = () => {
    setExpandingProject('closing');
    setTimeout(() => {
      router.back();
      setTimeout(() => {
        setExpandingProject(null);
        setExpandedBounds(null);
      }, 50);
    }, 600);
  };

  
  const projects = [
    {
      title: 'Houdini - VFS Rootkit',
      slug: 'houdini-rootkit',
      description: 'Advanced kernel-level rootkit targeting VFS layer to hide files, spoof data, and maintain persistence. Implements stealth techniques to evade detection.',
      tech: ['C', 'Kernel Programming', 'FreeBSD'],
      icon: Shield,
      highlight: false,
      github: 'github.com/pwaghanna/houdini'
    },
    {
      title: 'eBPF System Monitor',
      slug: 'ebpf-monitor',
      description: 'Real-time kernel-level security monitoring tool using eBPF for syscall tracing. Tracks process execution, file operations, and network activity with intelligent behavioral detection for malicious patterns.',
      tech: ['eBPF', 'C', 'Python', 'BCC', 'Kernel Tracing'],
      icon: Monitor,
      highlight: false,
      github: 'github.com/pwaghanna/eBPF-Monitor'
    },
    {
      title: 'RoomSense - AR Classroom Engagement',
      slug: 'roomsense',
      description: 'AR/VR solution using Snap Spectacles to provide real-time student engagement tracking, anonymous Q&A, and lecture management. Achieved 8.75/10 satisfaction rating in user studies.',
      tech: ['Next.js', 'TypeScript', 'Flask', 'MongoDB', 'AWS', 'Snap AR'],
      icon: Glasses,
      highlight: false,
      website: 'sites.google.com/view/roomsense/'
    },
    {
      title: 'LHUPR - Distributed Version Control',
      slug: 'lhupr',
      description: 'Lightweight distributed version control system built from scratch in Rust. Implements commits, branching, merging, and remote sync with modular architecture following information hiding principles.',
      tech: ['Rust', 'Distributed Systems', 'File Systems'],
      icon: Code,
      highlight: false
    },
    {
      title: 'Cryptopals Challenges',
      slug: 'cryptopals',
      description: 'Implemented solutions covering block cipher modes, stream ciphers, padding oracle attacks, and key recovery. Refactored in C for 60% performance improvement.',
      tech: ['Python', 'C', 'Cryptography'],
      icon: Lock,
      github: 'github.com/pwaghanna/CrytoPals'
    },
    {
      title: 'HTB Penetration Testing',
      slug: 'hack-the-box',
      description: 'Completed 7+ HackTheBox labs demonstrating reconnaissance, exploitation, and reporting. Developed custom automation scripts reducing exploit time by 30%.',
      tech: ['Python', 'Bash', 'Metasploit', 'nmap'],
      icon: Eye,
      github: 'github.com/pwaghanna/Pentesting_HTB'
    },
    {
      title: 'UFW Security Configuration Guide',
      slug: 'ufw-firewall',
      description: 'Comprehensive documentation and implementation guide for Linux firewall configuration using Uncomplicated Firewall (UFW). Covers security scenarios, best practices, and real-world deployment strategies.',
      tech: ['Linux', 'Network Security', 'System Administration', 'Firewalls', 'Shell/Bash'],
      icon: LucideBrickWallFire,
      highlight: false,
      github: 'github.com/pwaghanna/ufw-guide'  // Update with your actual repo
    },
    {
      title: 'Industrial IoT Platform',
      slug: 'huf',
      description: 'Led team of 8 engineers building MERN stack application for real-time production monitoring. Integrated ESP32 microprocessors and ThingSpeak for data collection.',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'ESP32'],
      highlight: false,
      icon: Factory
    }
  ];

  const sectionIcons = {
    hero: Terminal,
    about: Code,
    skills: Shield,
    projects: Server,
    experience: Eye,
    contact: Lock,
    interests: Trophy,
    campus: Layers
  };

  const ScrollIndicator = () => (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );

  const Navigation = () => (
    <nav className="fixed top-4 right-4 z-40 flex gap-2">
      {['hero', 'about', 'skills', 'projects', 'experience', 'campus', 'interests', 'contact'].map(section => {
        const Icon = sectionIcons[section];
        const isActive = activeSection === section;

        return (
          <button
            key={section}
            onClick={() => sectionsRef.current[section]?.scrollIntoView({ behavior: 'smooth' })}
            className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
              isActive ? 'bg-transparent w-8' : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={section}
          >
            {isActive && <Icon size={20} className="text-emerald-500" />}
          </button>
        );
      })}
    </nav>
  );

  if (router.pathname.startsWith('/projects/')) {
    const slug = router.pathname.split('/')[2];
    return (
      <>
        {expandingProject === 'closing' && expandedBounds && (
          <ExpandingOverlay 
            bounds={expandedBounds}
            project={projects.find(p => p.slug === slug)}
            isClosing={true}
          />
        )}
        <ProjectDetail 
          slug={slug} 
          onBack={navigateBack}
          isVisible={expandingProject !== 'closing'}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-mono">
      <ScrollIndicator />
      <Navigation />

      {/* Expanding Overlay */}
      {expandingProject && expandingProject !== 'closing' && expandedBounds && (
        <ExpandingOverlay 
          bounds={expandedBounds}
          project={projects.find(p => p.slug === expandingProject)}
        />
      )}

      {/* Hero Section */}
      <section 
        ref={el => sectionsRef.current.hero = el}
        className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="mb-8 flex py-4 justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative p-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full">
                <img 
                  src="/portfolio/profile.jpg" 
                  alt="Pranav Waghanna"
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-950 shadow-2xl"
                />
              </div>
            </div>
          </div>
          <div className="mb-6 flex items-center justify-center gap-2 text-emerald-500">
            <Terminal size={24} />
            <span className="text-sm">&gt; whoami</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Pranav Waghanna
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Security Researcher | System Programmer | Software Engineer
          </p>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            MS CS @ University of Rochester • Focused on cybersecurity, cryptography, and low-level systems programming
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/portfolio/Resume_PranavWaghanna.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-950 font-bold rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/50 flex items-center gap-2"
            >
              <Terminal size={20} />
              View Resume
            </a>
            <a href="https://github.com/pwaghanna" target="_blank" rel="noopener noreferrer" 
               className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/pranav-waghanna" target="_blank" rel="noopener noreferrer"
               className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="mailto:pranav.waghanna@gmail.com"
               className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown className="mx-auto text-emerald-500" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={el => sectionsRef.current.about = el}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <span className="text-emerald-500">&gt;</span> About
          </h2>
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 shadow-2xl">
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                <span className="text-emerald-500">$</span> Graduate student pursuing MS in Computer Science at the University of Rochester,
                specializing in <span className="text-cyan-400 font-semibold">Computer Security Foundations</span>, 
                <span className="text-cyan-400 font-semibold"> Cryptography</span>, and 
                <span className="text-cyan-400 font-semibold"> Collaborative Programming</span>.
              </p>
              <p>
                <span className="text-emerald-500">$</span> Currently developing a <span className="text-red-400 font-semibold">kernel-level rootkit</span> that 
                manipulates the VFS layer to hide files, spoof data, and maintain stealth. This research explores advanced 
                persistence techniques and kernel-space programming.
              </p>
              <p>
                <span className="text-emerald-500">$</span> Built a <span className="text-cyan-400 font-semibold">distributed version control system</span> from 
                scratch in Rust and developed an <span className="text-cyan-400 font-semibold">AR classroom engagement platform</span> using 
                Snap Spectacles, demonstrating expertise across systems programming, distributed computing, and immersive technologies.
              </p>
              <p>
                <span className="text-emerald-500">$</span> Former Full Stack Developer at Huf India, where I led a team of 8 engineers 
                building industrial IoT solutions. Reduced manual processing time from 1 week to seconds through automation.
              </p>
              <p>
                <span className="text-emerald-500">$</span> Passionate about <span className="text-cyan-400">penetration testing</span>, 
                <span className="text-cyan-400"> exploit development</span>, and 
                <span className="text-cyan-400"> systems security</span>. Active participant in HTB challenges and cryptography competitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        ref={el => sectionsRef.current.skills = el}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <span className="text-emerald-500">&gt;</span> Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], idx) => (
              <div 
                key={category}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-emerald-500 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-4 text-emerald-400">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        ref={el => sectionsRef.current.projects = el}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <span className="text-emerald-500">&gt;</span> Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div 
                key={project.title}
                ref={el => projectRefs.current[project.slug] = el}
                onClick={() => navigateToProject(project.slug)}
                className={`bg-gray-900 rounded-lg p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                  project.highlight 
                    ? 'border-red-500 shadow-lg shadow-red-500/20 hover:shadow-red-500/40' 
                    : 'border-gray-800 hover:border-emerald-500'
                } ${expandingProject === project.slug ? 'opacity-0' : 'opacity-100'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <project.icon className={project.highlight ? 'text-red-400' : 'text-emerald-500'} size={32} />
                  {project.status && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold">
                      {project.status}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {project.title}
                  <ExternalLink size={16} className="opacity-50" />
                </h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-gray-800 text-cyan-400 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                {(
                  <div className="text-emerald-500 hover:text-emerald-400 text-sm flex items-center gap-1">
                    Click to learn more →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        ref={el => sectionsRef.current.experience = el}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <span className="text-emerald-500">&gt;</span> Experience
          </h2>
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-400">Full Stack Developer</h3>
                  <p className="text-gray-400">Huf India Pvt. Ltd</p>
                </div>
                <span className="text-gray-500">Jul 2023 - May 2024</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Led and managed a team of 8 engineers in developing a MERN stack application;provided real-time production data, enabling quicker decision-making.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Integrated Ant-Design forms for streamlined data submission and automated task scheduling through cron jobs, decreasing manual data entry errors by 15% and freeing up 10 hours per week for plant supervisors.</span>
                </li>

                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Leveraged ThingSpeak to store and retrieve data of produced items sent  by ESP32 microprocessor. Utilized AWS EC2 instance to host the server along with Netlify for the frontend.</span>
                </li>

                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Engineered role-based access controls enabling technicians to monitor production via CanvasJS dashboards, trigger automated maintenance alerts, and perform quality assessments, resulting in 15\% fewer errors weekly</span>
                </li>

                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Reduced the manual processing time of the internal work from 1 week to a few seconds through digitization of documents and instant generation of graphs.</span>
                </li>
                
                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Implemented role-based access controls and automated maintenance alerts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/*Campus Leadership Activities*/ }
      <section
        className="min-h-screen flex items-center justify-center px-4 py-20"
        ref={el => sectionsRef.current.campus = el}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <span className="text-emerald-500">&gt;</span> Campus Leadership Activities
          </h2>
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-emerald-400">Co-Founder & Lead Engineer</h3>
              <p className="text-gray-400">The Automobile Club (TorqScrew Racing), PICT</p>
              <p className="text-gray-500 text-sm">Pune, India</p>
            </div>
            <span className="text-gray-500">2021 – 2024</span>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              <span>Co-founded the club as one of five founding members, growing the team from 5 to 40 members</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              <span>Mentored 20 members to design and manufacture the team's first formula kart for FKDC competition</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              <span>Led research and development of 3 critical subsystems: Steering, Braking, and Powertrain</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              <span>Fabricated 80% of the frame using MIG welding and lathe operations within 0.1-inch tolerance</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              <span>Created detailed CAD models in SolidWorks and performed structural strength analysis</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500">•</span>
              <span>Selected as primary kart driver after achieving best lap times during testing</span>
            </li>
          </ul>
        </div>
        </div>

      </section>

      {/* Interests Section */}
      <section 
        ref={el => sectionsRef.current.interests = el}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <span className="text-emerald-500">&gt;</span> Interests
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-emerald-500 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <Flag className="text-red-400" size={28} />
                <h3 className="text-xl font-bold">Formula 1</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Passionate follower of Formula 1, fascinated by race strategy, telemetry,
                aerodynamics, and the engineering tradeoffs behind peak performance.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-emerald-500 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="text-cyan-400" size={28} />
                <h3 className="text-xl font-bold">Kart Racing</h3>
              </div>
              <p className="text-gray-400 text-sm">
                National Kart Racing competitor with experience in vehicle dynamics, structural analysis and manufacturing techniques.
                Participated in Formula Kart Design Challenge 2023(FKDC).
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-emerald-500 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="text-emerald-400" size={28} />
                <h3 className="text-xl font-bold">Martial Arts</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Practice focused on discipline, consistency, and mental resilience. Training in Kickboxing, Jiu Jitsu, Wrestling, and Muay Thai.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-emerald-500 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <Gamepad2 className="text-purple-400" size={28} />
                <h3 className="text-xl font-bold">Video Gaming</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Enjoy competitive and strategy-based games such as Age of Empires, No Man's Sky, and Counter Strike.
              </p>
            </div>
          </div>
        </div>
      </section>

        

      {/* Contact Section */}
      <section 
        ref={el => sectionsRef.current.contact = el}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            <span className="text-emerald-500">&gt;</span> Get In Touch
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Interested in collaborating on security research or discussing opportunities?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:pranav.waghanna@gmail.com"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold rounded-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
            >
              <Mail size={20} />
              Email Me
            </a>
            <a 
              href="https://linkedin.com/in/pranav-waghanna"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
            >
              <Linkedin size={20} />
              Connect on LinkedIn
            </a>
          </div>
          <div className="mt-16 text-gray-600">
            <p>Rochester, New York • +1 585-537-9675</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 border-t border-gray-800">
        <p>© 2025 Pranav Waghanna. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

// Expanding Overlay Component
const ExpandingOverlay = ({ bounds, project, isClosing = false }) => {
  const Icon = project?.icon || Code;
  
  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        top: isClosing ? 0 : bounds.scrollY,
      }}
    >
      <div
        className={`absolute bg-gray-900 rounded-lg border transition-all duration-600 ease-in-out ${
          project?.highlight ? 'border-red-500' : 'border-gray-800'
        }`}
        style={{
          top: isClosing ? '50%' : `${bounds.top}px`,
          left: isClosing ? '50%' : `${bounds.left}px`,
          width: isClosing ? `${bounds.width}px` : '100vw',
          height: isClosing ? `${bounds.height}px` : '100vh',
          transform: isClosing 
            ? `translate(-50%, -50%) translate(${bounds.left + bounds.width/2 - window.innerWidth/2}px, ${bounds.top + bounds.height/2}px)`
            : 'translate(0, 0)',
          transformOrigin: 'center',
          borderRadius: isClosing ? '0.5rem' : '0',
        }}
      >
        <div className={`p-6 transition-opacity duration-300 ${isClosing ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-start justify-between mb-4">
            <Icon className={project?.highlight ? 'text-red-400' : 'text-emerald-500'} size={32} />
            {project?.status && (
              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold">
                {project.status}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2">{project?.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{project?.description}</p>
        </div>
      </div>
    </div>
  );
};

// Project Detail Component
const ProjectDetail = ({ slug, onBack, isVisible }) => {


  const project = projectData[slug] || {
    title: 'Project Not Found',
    overview: 'This project page is under construction.',
    sections: []
  };

  const Icon = project.icon || Code;

  return (
    <div className={`min-h-screen bg-gray-950 text-gray-100 font-mono transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
                <Icon className="text-emerald-500" size={64} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-xl text-gray-400 mb-6">{project.tagline}</p>
            )}
           {/* Links */}
          
          <div className="flex gap-4 justify-center mt-12">
            {project.github && (
              <a
                href={`https://${project.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold rounded-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
              >
                <Github size={20} />
                View on GitHub
              </a>
            )}
            {project.website && (
              <a
                href={`https://${project.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
              >
                <ExternalLink size={20} />
                Visit Website
              </a>
            )}
          </div>
            {project.status && (
              <span className="inline-block px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">
                {project.status}
              </span>
            )}
            
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {project.tech?.map(tech => (
              <span key={tech} className="px-4 py-2 bg-gray-800 text-cyan-400 rounded-lg font-semibold">
                {tech}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-emerald-400">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{project.overview}</p>
          </div>

          {/* Sections */}
          {project.sections?.map((section, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-emerald-400">{section.title}</h2>
              {section.content && (
                <p className="text-gray-300 leading-relaxed">{section.content}</p>
              )}
              {section.image && (
                <div className="mt-6 rounded-lg overflow-hidden border border-gray-700">
                  <img 
                    src={section.image} 
                    alt={section.imageAlt || section.title}
                    className="w-full h-auto"
                  />
                  {section.imageCaption && (
                    <p className="text-sm text-gray-500 text-center py-2 bg-gray-800">
                      {section.imageCaption}
                    </p>
                  )}
                </div>
              )}
              {section.images && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {section.images.map((img, i) => (
                    <div key={i} className="rounded-lg overflow-hidden border border-gray-700">
                      <img 
                        src={img.src} 
                        alt={img.alt || `${section.title} ${i + 1}`}
                        className="w-full h-auto"
                      />
                      {img.caption && (
                        <p className="text-sm text-gray-500 text-center py-2 bg-gray-800">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {section.video && (
                <div className="mt-6 rounded-lg overflow-hidden border border-gray-700">
                  <video 
                    src={section.video} 
                    controls
                    className="w-full h-auto"
                  />
                  {section.videoCaption && (
                    <p className="text-sm text-gray-500 text-center py-2 bg-gray-800">
                      {section.videoCaption}
                    </p>
                  )}
                </div>
              )}
              {section.items && (
                <ul className="space-y-3 mt-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-emerald-500 mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          
        </div>
      </div>
    </div>
  );
};

export default Portfolio;