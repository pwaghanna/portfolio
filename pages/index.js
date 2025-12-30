import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Code, Lock, Eye, Server, Target, Github, Linkedin, Mail, Glasses, Factory, ChevronDown, Trophy, Gamepad2, Activity, Flag, Monitor, ArrowLeft, ExternalLink, Layers } from 'lucide-react';

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

  const skills = {
    'Security & Crypto': ['Penetration Testing', 'Cryptography', 'Web Fuzzing', 'Footprinting', 'Metasploit', 'Privilege Escalation', 'Active Directory', 'Burp Suite', 'Web Security'],
    'Systems & Low-Level': ['C', 'C++', 'Rust', 'Shell/Bash', 'Unix', 'Kernel Programming'],
    'Software Engineering': ['MERN Stack', 'React', 'Typescript','Node.js', 'Python', 'Flask', 'Java', 'Git'],
    'Cloud & DevOps': ['AWS EC2', 'AWS S3', 'Docker', 'CI/CD']
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
    interests: Trophy
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
      {['hero', 'about', 'skills', 'projects', 'experience', 'interests', 'contact'].map(section => {
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
              href="/Resume_PranavWaghanna.pdf" 
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
        <div className="max-w-4xl mx-auto w-full">
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
                <span className="text-gray-500">Jul 2023 – May 2024</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Led team of 8 engineers developing MERN stack application for real-time production monitoring</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Reduced manual processing time from 1 week to seconds through digitization and automation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Decreased manual data entry errors by 15% and freed up 10 hours/week for supervisors</span>
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
  const projectData = {
    'houdini-rootkit': {
        title: 'Houdini',
        icon: Shield,
        tagline: 'VFS-Level Stealth Techniques in FreeBSD (Security Research)',
        overview:
          'Houdini is a kernel-level security research project that explores stealth techniques at the Virtual File System (VFS) layer in FreeBSD. The project studies how file system abstractions can be manipulated to alter system visibility, with the goal of better understanding rootkit behavior and strengthening defensive detection strategies.',
        tech: [
          'C',
          'FreeBSD Kernel',
          'VFS Layer',
          'Kernel Modules',
          'Operating Systems',
          'Systems Security'
        ],
        github: 'https://github.com/pwaghanna/houdini',
        sections: [
          {
            title: 'Project Overview',
            content:
              'Modern malware increasingly targets kernel abstractions to evade user-space monitoring tools. Houdini investigates how VFS-level interception can affect file visibility, process reporting, and data integrity—providing insight into how stealthy persistence mechanisms operate at the OS core.'
          },

          {
            title: 'System Architecture',
            content:
              'Houdini operates by intercepting VFS operations inside the FreeBSD kernel. By selectively filtering and modifying VFS responses, the module can influence how filesystem and process information is presented to user-space tools, without modifying on-disk data.',
            image: '/portfolio/projects/houdini/working.png',
            imageAlt: 'VFS hook interception',
            imageCaption: 'VFS hook interception before filesystem resolution'
          },

          {
            title: 'Core Techniques Studied',
            items: [
              'VFS operation interception and filtering',
              'Selective file and directory visibility control',
              'Process enumeration manipulation',
              'Kernel module self-concealment techniques',
              'Minimal-footprint kernel hooks'
            ]
          },

          {
            title:'Houdini Capabilities',
            content: 'Houdini implements several stealth techniques at the VFS layer, including file hiding, process concealment, and data spoofing. By manipulating VFS responses, the module can effectively hide artifacts from standard system utilities while maintaining system stability.',
            image: '/portfolio/projects/houdini/load.png',
            imageAlt: 'Loading Houdini module',
            imageCaption: 'Loading the Houdini kernel module into FreeBSD'
          },

          {
            title: 'File & Process Visibility Control',
            content:
              'The project demonstrates how modifying VFS return paths can influence standard system utilities such as ls, find, and ps. By controlling visibility at the abstraction layer, the underlying filesystem and process structures remain untouched.',
            images: [
              {
                src: '/portfolio/projects/houdini/ls_no_houdini.png',
                alt: 'File visibility',
                caption: 'Files visible without Houdini loaded'
              },
              {
                src: '/portfolio/projects/houdini/ls_houdini.png',
                alt: 'File hiding',
                caption: 'Files hidden when Houdini is active'
              }
            ]
          },
          {
            title:'Data Spoofing',
            content: 'Houdini explores techniques to spoof file metadata and contents at the VFS layer. By intercepting read operations, the module can present altered data to user-space applications while preserving the original on-disk state.',
            images:[
              {
                src: '/portfolio/projects/houdini/cat_no_passwd.png',
                alt: 'File content without Houdini',
                caption: 'Original file content without Houdini'
              },
              {
                src: '/portfolio/projects/houdini/cat_houdini.png',
                alt: 'Spoofed file content with Houdini',
                caption: 'Altered file content when Houdini is active'
              }
            ]
          },

          {
            title: 'Technical Challenges',
            content:
              'Kernel-level development introduces strict stability and correctness constraints. Major challenges include preventing kernel panics, maintaining ABI compatibility across FreeBSD versions, avoiding race conditions, and ensuring minimal performance overhead while intercepting high-frequency VFS operations.'
          },

          {
            title: 'Security & Defensive Insights',
            items: [
              'Why user-space monitoring alone is insufficient',
              'How kernel abstractions can become attack surfaces',
              'Indicators defenders can use to detect VFS manipulation',
              'Tradeoffs between stealth, stability, and performance'
            ]
          },

          {
            title: 'Ethical Scope & Research Motivation',
            content:
              'Houdini is strictly a research and educational project focused on understanding kernel attack surfaces. The work is intended to inform defensive security design, rootkit detection techniques, and operating system hardening strategies.'
          }
        ]
      },

   'ebpf-monitor': {
      title: 'eBPF System & File Access Monitor',
      icon: Monitor,
      github: 'github.com/pwaghanna/eBPF-Monitor',
      tagline: 'Kernel-Level Security Monitoring with eBPF',
      overview: 'A high-performance Linux host-based monitoring system built using eBPF to observe process execution, file access, and network connections at the kernel level. The system provides real-time visibility into system behavior while detecting suspicious activity with minimal overhead.',
      tech: [
        'Linux',
        'eBPF',
        'BCC',
        'Python',
        'Kernel Tracing',
        'kprobes',
        'System Security'
      ],
      sections: [
        {
          title: 'Project Overview',
          content:
            'This project implements a kernel-level monitoring tool using eBPF kprobes to trace critical system calls such as execve, openat, write, unlinkat, and connect. By operating at the kernel boundary, the monitor captures high-fidelity system events while remaining lightweight and non-intrusive.'
        },

        {
          title: 'System Architecture',
          content:
            'The system consists of an eBPF program attached to kernel syscalls using kprobes, which emits structured events to user space via a perf ring buffer. A Python-based controller consumes these events, applies detection heuristics, aggregates metrics, and presents real-time insights.',
          image: '/portfolio/projects/ebpf-monitor/ebpf_architecture.png',
          imageAlt: 'eBPF monitoring architecture',
          imageCaption: 'Working of a hello eBPF program with perf buffers and kprobes attached to execve()'
        },

        {
          title: 'Core Capabilities',
          items: [
            'Kernel-level tracing of process execution, file access, and network connections',
            'Real-time monitoring with color-coded event visualization',
            'Detection of suspicious file paths, processes, directory traversal, and sensitive ports',
            'Per-event metadata capture including PID, UID, command, file paths, and network endpoints',
            'Low-overhead design using eBPF perf buffers with zero event loss'
          ]
        },

        {
          title: 'Security Use Cases',
          items: [
            'Host-based intrusion detection and behavioral monitoring',
            'Detection of unauthorized access to sensitive system files',
            'Identification of suspicious binaries and post-exploitation tools',
            'Monitoring outbound network connections to risky or uncommon ports',
            'Forensic analysis and system activity auditing'
          ]
        },

        {
          title: 'Experimental Results',
          content:
            'The monitor was evaluated under real system workloads and demonstrated high throughput and reliability. Over a 32-second runtime, the system captured more than 14,000 kernel events with zero perf buffer drops, while flagging security-relevant behavior in real time.',
          image: '/portfolio/projects/ebpf-monitor/result_statistics.png',
          imageAlt: 'Monitoring statistics',
          imageCaption: 'Event distribution, suspicious activity ratio, and throughput metrics'
        },

        {
          title: 'Performance Overhead Analysis',
          content:
            'To evaluate runtime overhead, syscall latency was measured using strace. The results show an approximate 2× increase in execution time for a simple ls command, highlighting the tradeoff between deep kernel visibility and performance.',
          images: [
            {
              src: '/portfolio/projects/ebpf-monitor/strace_ls.png',
              alt: 'strace without eBPF',
              caption: 'Baseline syscall latency without eBPF monitoring'
            },
            {
              src: '/portfolio/projects/ebpf-monitor/strace_ls_with_ebpf.png',
              alt: 'strace with eBPF',
              caption: 'Syscall latency with eBPF kprobes enabled'
            }
          ]
        },

        {
          title: 'Key Results',
          items: [
            '14,447 total kernel events captured in 32.33 seconds (~447 events/sec)',
            '404 suspicious events detected (2.8% of total activity)',
            '193 sensitive path accesses and 211 suspicious process executions identified',
            'Zero event loss under sustained monitoring',
            'Measured syscall latency increase from ~0.015s to ~0.031s'
          ]
        },

        {
          title: 'Limitations & Future Work',
          items: [
            'Resolve file descriptors to full file paths for write events',
            'Add per-process behavioral baselining and anomaly detection',
            'Export structured logs for SIEM integration',
            'Support IPv6 and advanced network correlation',
            'Transition from BCC to libbpf for production deployment'
          ]
        }
      ]
    },

      'roomsense': {
        title: 'RoomSense',
        icon: Glasses,
        tagline: 'AR-Enhanced Classroom Engagement System',
        overview:
          'RoomSense is an augmented reality classroom engagement system that helps instructors gauge student attention in real time while enabling anonymous question submission. Using Snap Spectacles and a companion web application, RoomSense enhances situational awareness during live lectures without interrupting teaching flow.',
        website:'sites.google.com/view/roomsense',
        tech: [
          'Next.js',
          'TypeScript',
          'Flask',
          'MongoDB',
          'AWS',
          'Snap AR',
          'Lens Studio',
          'Computer Vision',
          'Human-Computer Interaction'
        ],
        sections: [
          {
            title: 'Project Overview',
            content:
              'In traditional classrooms, instructors often struggle to assess student engagement and students may hesitate to ask questions publicly. RoomSense addresses these challenges by combining AR-based engagement visualization with a privacy-focused web platform for anonymous interaction.'
          },
          {
            title: 'Demo Video',
            content:
              'A short walkthrough demonstrating student interaction, instructor analytics, and real-time engagement flow.',
            video: '/portfolio/projects/roomsense/demo.mp4',
            videoCaption: 'RoomSense system AR demonstration'
          },

          {
            title: 'System Architecture',
            content:
              'RoomSense is composed of three core components: a web application for instructors and students, a backend API for session management and data flow, and an AR application running on Snap Spectacles. The system emphasizes low-latency, real-time feedback while maintaining student privacy.',
            image: '/portfolio/projects/roomsense/architecture.png',
            imageAlt: 'RoomSense system architecture',
            imageCaption: 'Web app, backend API, and Snap Spectacles integration'
          },

          {
            title: 'Core Capabilities',
            items: [
              'Real-time AR visualization of student engagement using color-coded bars',
              'Anonymous question submission through a web interface',
              'Floating AR lecture notes, timelines, and session summaries',
              'On-device engagement estimation using facial landmarks',
              'Instructor dashboard for lecture and session management'
            ]
          },

          {
            title: 'Engagement Visualization',
            content:
              'Engagement is estimated directly on the Snap Spectacles using facial landmark analysis. Metrics such as eyebrow furrowing, head tilt, yaw, and pitch are combined into a normalized engagement score that is visualized as a floating bar above each student’s head. The visualization updates smoothly to avoid jitter and visual overload.',
            images:[
              {
                  src: '/portfolio/projects/roomsense/engagement.png',
                  alt: 'AR engagement bars',
                  caption: 'Color-coded engagement bars rendered above detected faces'
              },
              {
                  src: '/portfolio/projects/roomsense/landmarks.png',
                  alt: 'Facial landmarks',
                  caption: 'Facial landmark detection used for engagement estimation'
              }
            ]
          },

          {
            title: 'User Workflow',
            content:
              'Instructors create and manage lectures through the web application, while students join sessions using a lecture code without providing personal information. During the lecture, instructors view engagement indicators and incoming questions through the AR interface, enabling adaptive teaching without disrupting delivery.',
            image: '/portfolio/projects/roomsense/workflow.png',
            imageAlt: 'User workflow diagram',
            imageCaption: 'Instructor and student interaction flow'
          },

          

          {
            title: 'Evaluation & User Study',
            content:
              'RoomSense was evaluated through a formative user study involving 8 participants, including teaching assistants and students. Despite limited prior exposure to AR technologies, all participants were able to complete core tasks with minimal guidance.',
            image: '/portfolio/projects/roomsense/results.png',
            imageAlt: 'User study results',
            imageCaption: 'Usability and satisfaction ratings from post-study surveys'
          },

          {
            title: 'Key Results',
            items: [
              'Average overall satisfaction score of 8.75/10',
              'No participant rated the system below 8/10',
              'Web interface navigation rated ~4.1/5',
              'AR overlays and engagement bars rated ~4.5/5',
              'All participants successfully completed instructor and student workflows'
            ]
          },

          {
            title: 'Performance Characteristics',
            content:
              'Engagement estimation runs entirely on-device at approximately 20 FPS, avoiding network latency. AR overlays, notifications, and timeline updates appeared within one second of user interaction, supporting real-time classroom use without disrupting lecture flow.'
          },

          {
            title: 'Design Insights',
            items: [
              'AR engagement bars were immediately understandable and easy to scan',
              'Floating notes helped instructors maintain eye contact with students',
              'User-controlled toggles reduced visual overload',
              'Anonymous questions increased participation and reduced hesitation'
            ]
          },
          {
            title: 'Dashboard Views',
            images: [
              {
                src: '/portfolio/projects/roomsense/student-view.png',
                alt: 'Student Web Interface',
                caption: 'Student interface for joining lectures and submitting questions'
              },
              {
                src: '/portfolio/projects/roomsense/instructor-view.png',
                alt: 'Instructor Web Dashboard',
                caption: 'Instructor dashboard for managing lectures, adding notes, and viewing questions'
              }
            ]
          },

          

          {
            title: 'Limitations & Future Work',
            items: [
              'Improve real-time communication using WebSockets',
              'Refine AR overlay ergonomics to reduce visual clutter',
              'Expand face tracking for late-arriving students',
              'Conduct studies with larger and more diverse classrooms',
              'Integrate adaptive transparency and context-aware overlays'
            ]
          }
        ]
      },

    'lhupr': {
      title: 'LHUPR',
      icon: Code,
      tagline: 'Modular Software System with Strong Engineering Practices',
      overview:
        'LHUPR is a modular, extensible software system developed as a team project following formal software engineering practices. The project emphasizes clean module boundaries, extensibility, documentation, and collaborative development rather than a monolithic implementation.',
      tech: [
        'Modular Design',
        'Software Engineering',
        'Version Control',
        'Documentation',
        'Design Specifications'
      ],
      sections: [
        {
          title: 'Project Overview',
          content:
            'LHuPR was developed as a group project with a strong focus on software engineering fundamentals. The goal was to design and implement a system that is modular, maintainable, and easily extensible, while following industry-style development workflows.'
        },

        {
          title: 'Engineering Approach',
          items: [
            'Modular architecture with clearly defined responsibilities',
            'Separation of concerns through independent components',
            'Design-first development using module specifications',
            'Code structured for future extension and feature growth',
            'Consistent interfaces between modules'
          ]
        },

        {
          title: 'System Architecture',
          content:
            'The system is composed of multiple independent modules that interact through well-defined interfaces. Each module was designed, specified, and reviewed independently to minimize coupling and improve maintainability.',
          image: '/portfolio/projects/lhupr/module.png',
          imageAlt: 'LHuPR module architecture',
          imageCaption: 'High-level module diagram illustrating separation of concerns and extensibility'
        },

        {
          title: 'Software Engineering Practices',
          items: [
            'Formal module specifications and design documentation',
            'Software Project Management Plan (SPMP)',
            'Weekly progress reports and milestone tracking',
            'Regular group discussions and design reviews',
            'Peer code reviews and collaborative debugging',
            'Version control with structured commits'
          ]
        },

        {
          title: 'Team Collaboration',
          content:
            'The project was developed collaboratively, with responsibilities distributed across team members. Design decisions were discussed and documented, ensuring alignment across the team and consistent implementation of system-wide standards.'
        },

        {
          title: 'Key Outcomes',
          items: [
            'Delivered a fully modular system designed for extension',
            'Improved maintainability through clear module boundaries',
            'Reduced integration issues via interface-driven development',
            'Gained hands-on experience with real-world software engineering workflows',
            'Demonstrated effective collaboration in a multi-developer environment'
          ]
        },

        {
          title: 'Future Extensions',
          items: [
            'Add new modules without modifying core components',
            'Improve automated testing and CI integration',
            'Refine module interfaces based on usage feedback',
            'Expand documentation for external contributors'
          ]
        }
      ]
    },

    'cryptopals': {
      title: 'Cryptopals Challenges',
      icon: Lock,
      tagline: 'Practical Cryptanalysis & Implementation',
      overview: 'Comprehensive solutions to the Cryptopals cryptography challenges, covering block ciphers, stream ciphers, padding oracle attacks, and cryptographic key recovery. Includes both Python reference implementations and optimized C versions.',
      tech: ['Python', 'C', 'Cryptography', 'Number Theory', 'Algorithms'],
      github: 'github.com/pwaghanna/CrytoPals',
      sections: [
        {
          title: 'Challenge Sets Completed',
          items: [
            'Set 1: Basics - XOR, Base64, frequency analysis',
            'Set 2: Block crypto - CBC, ECB detection, padding oracle',
            'Set 3: Block & stream crypto - CTR mode, MT19937',
            'Set 4: Stream crypto and randomness - Break CTR statistically',
            'Set 5: Diffie-Hellman - MITM, parameter injection',
            'Set 6: RSA and DSA - Signature forgery, key recovery'
          ]
        },
        {
          title: 'Key Implementations',
          content: 'Built working implementations of AES-128 in ECB and CBC modes, Diffie-Hellman key exchange, RSA encryption/signatures, DSA, HMAC-SHA1, and various padding schemes. Each implementation is tested against known test vectors.'
        },
        {
          title: 'Attack Techniques',
          items: [
            'Padding oracle attacks on CBC mode',
            'ECB mode detection via block analysis',
            'MT19937 state recovery',
            'CBC-MAC length extension',
            'RSA signature forgery',
            'Timing attacks on MAC verification'
          ]
        },
        {
          title: 'Performance Optimization',
          content: 'Refactored critical operations from Python to C, achieving 60% performance improvement in cryptographic primitives. Used profiling to identify bottlenecks and optimized hot paths with SIMD instructions where applicable.'
        },
        {
          title: 'Security Insights',
          content: 'These challenges demonstrate why implementing cryptography is dangerous - subtle implementation mistakes can completely break security. Key takeaways include: never roll your own crypto, timing attacks are real, and proper randomness is critical.'
        }
      ]
    },
    'huf': {
      title: 'Huf India Pvt.Ltd.',
      icon: Factory,
      tagline: 'Real-Time Production Tracking & Workflow Digitization Platform',
      overview:
        'A full-stack Industry 4.0 web platform designed for real-time production monitoring, workflow digitization, and operational analytics in a manufacturing environment. Built in collaboration with HUF India Pvt. Ltd., the system replaces manual paperwork with a role-based digital workflow powered by IoT-enabled machine data.',
      tech: [
        'MongoDB',
        'Express.js',
        'React',
        'Node.js',
        'AWS EC2',
        'ESP32',
        'IoT',
        'ThingSpeak',
        'Data Visualization',
        'Industry 4.0'
      ],
      sections: [
        {
          title: 'Project Overview',
          content:
            'Manufacturing plants often rely on manual logs and paper-based workflows, leading to inefficiencies, delays, and limited visibility into real-time production. Industry 4.0 digitizes these workflows by integrating IoT-based machine data with a centralized web platform, enabling live monitoring, analytics, and role-specific operational control.'
        },

        {
          title: 'System Architecture',
          content:
            'The system integrates hardware-level machine monitoring with a cloud-hosted web application. IoT devices attached to machines send live production data to the cloud, which is processed by a backend server and visualized through interactive dashboards.',
          image: '/portfolio/projects/huf/architecture.png',
          imageAlt: 'System architecture',
          imageCaption: 'IoT devices, cloud infrastructure, backend services, and web dashboards'
        },

        {
          title: 'Core Capabilities',
          items: [
            'Real-time machine production tracking using IoT sensors',
            'Role-based dashboards for operators, supervisors, managers, and executives',
            'Digital shift startup, handover, and QRCI workflows',
            'Production planning and throughput analytics',
            'Automated alerts for delays, breakdowns, and safety issues',
            'Historical, current, and future production plan visualization'
          ]
        },

        {
          title: 'IoT-Based Production Monitoring',
          content:
            'ESP32-based hardware modules are connected directly to industrial machines. Production counts are calculated using mold cavity counts and machine cycles, then transmitted to the cloud in real time. This enables accurate, live tracking without manual intervention.',
          images: [
            {
              src: '/portfolio/projects/huf/hardware.png',
              alt: 'IoT hardware integration',
              caption: 'ESP32-based data collection and real-time machine monitoring'
            },
            {
              src: '/portfolio/projects/huf/hardware_data_flow.jpeg',
              alt: 'Data flow diagram',
              caption: 'IoT data transmission from machine to thingspeak cloud and dashboards'
            }
          ]
        },

        {
          title: 'Role-Based Workflow',
          content:
            'The platform supports multiple hierarchical roles, each with customized workflows and permissions. Operators manage shift activities, supervisors handle line-level issues, managers oversee production plans, and executives gain plant-wide visibility.',
          images:[
            {
              src: '/portfolio/projects/huf/df.png',
              alt: 'User workflow diagram',
              caption: 'Digitized workflows across production hierarchy'
            },
            {
              src: '/portfolio/projects/huf/uc.png',
              alt: 'Use case diagram',
              caption: 'Role-specific capabilities and interactions'
            }
          ]
        },

        {
          title: 'Dashboards & Analytics',
          content:
            'Interactive dashboards provide insights into machine status, target vs actual production, throughput trends, and non-conformance costs. Graphs and tables update in near real time, enabling faster decision-making on the shop floor.',
          images: [
            {
              src: '/portfolio/projects/huf/graph1.jpg',
              alt: 'Production dashboard',
              caption: 'Live production metrics and analytics'
            },
            {
              src: '/portfolio/projects/huf/graphs2.jpg',
              alt: 'Analytics graphs',
              caption: 'Production trends, KPIS, and throughput analysis'
            }
          ]
        },
        {
          title: 'Dashboards',
          images: [
            {
              src: '/portfolio/projects/huf/operator.jpeg',
              alt: 'Operator dashboard',
              caption: 'Operator interface for shift and machine reporting'
            },
            {
              src: '/portfolio/projects/huf/supervi_dash.jpeg',
              alt: 'Supervisor dashboard',
              caption: 'Supervisor dashboard with production workers information and alerts'
            }
          ]
        },

        {
          title: 'QRCI & Alert Management',
          content:
            'The system digitizes Line QRCI and Plant QRCI processes with time-based escalation rules. Alerts are automatically forwarded across roles if issues are not resolved within defined time windows, ensuring accountability and faster resolution.',
          image: '/portfolio/projects/huf/qrci.jpg',
          imageAlt: 'QRCI workflow',
          imageCaption: 'Automated issue escalation and resolution tracking'
        },

        {
          title: 'Key Results',
          items: [
            'Replaced manual paperwork with fully digital workflows',
            'Enabled real-time visibility across multiple machines',
            'Improved production tracking accuracy using IoT automation',
            'Reduced delays in issue escalation and resolution',
            'Successfully deployed and tested in an industrial environment'
          ]
        },

        {
          title: 'Performance Characteristics',
          content:
            'Machine data is streamed continuously to the cloud and reflected on dashboards with minimal latency. The system is designed to scale across additional machines, production lines, and plant sections without architectural changes.'
        },

        {
          title: 'Design & Engineering Insights',
          items: [
            'Role-based UI design simplifies complex industrial workflows',
            'Real-time data visualization improves operational awareness',
            'IoT integration eliminates manual data entry errors',
            'Clear escalation logic increases accountability across teams'
          ]
        },

        {
          title: 'Limitations & Future Work',
          items: [
            'Expand deployment to additional plant sections',
            'Enhance predictive analytics using machine learning',
            'Improve scalability for higher data volumes',
            'Refine UI for faster on-floor interactions',
            'Integrate advanced maintenance prediction features'
          ]
        }
      ]
    },
    'hack-the-box': {
      title: 'Hack The Box',
      icon: Eye,
      tagline: 'Hands-On Penetration Testing & Offensive Security Training',
      overview:
        'I am actively training on the Hack The Box (HTB) platform, focusing on practical penetration testing techniques across Linux, Windows, web applications, and networks. This ongoing work emphasizes real-world attack chains, exploitation, and post-exploitation analysis in controlled lab environments.',
      tech: [
        'Linux',
        'Windows',
        'Networking',
        'Web Security',
        'Privilege Escalation',
        'Active Directory',
        'Burp Suite',
        'Metasploit',
        'Nmap'
      ],
      status: 'Ongoing',
      sections: [
        {
          title: 'Training Focus',
          items: [
            'Network reconnaissance and enumeration',
            'Web application vulnerabilities (OWASP Top 10)',
            'Linux and Windows privilege escalation',
            'Credential harvesting and lateral movement',
            'Active Directory attack paths',
            'Post-exploitation and persistence techniques'
          ]
        },

        {
          title: 'Learning Approach',
          content:
            'The training follows a hands-on methodology where each lab simulates a real-world target system. I approach each machine by enumerating services, identifying vulnerabilities, chaining exploits, and documenting findings to understand both attacker and defender perspectives.'
        },

        {
          title: 'Labs & Practice',
          content:
            'Practice includes guided HTB Academy modules as well as standalone machines with increasing difficulty. Emphasis is placed on understanding root cause vulnerabilities rather than relying on automated exploitation.'
        },

        {
          title: 'Security Mindset',
          items: [
            'Think like an attacker to design better defenses',
            'Understand exploitation mechanics, not just tools',
            'Map vulnerabilities to real-world threat models',
            'Translate offensive findings into defensive insights'
          ]
        }
      ]
    },


  };

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