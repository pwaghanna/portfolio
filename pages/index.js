import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Code, Lock, Eye, Server, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef({});

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Update active section
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

  const skills = {
    'Security & Crypto': ['Penetration Testing', 'Cryptography', 'Web Fuzzing', 'Footprinting', 'nmap', 'Sockets'],
    'Systems & Low-Level': ['C', 'C++', 'Rust', 'Shell/Bash', 'Unix', 'Kernel Programming'],
    'Software Engineering': ['MERN Stack', 'React', 'Node.js', 'Python', 'Java', 'Git'],
    'Cloud & DevOps': ['AWS EC2', 'AWS S3', 'Docker', 'CI/CD']
  };

  const projects = [
    {
      title: 'Houdini - VFS Rootkit',
      description: 'Advanced kernel-level rootkit targeting VFS layer to hide files, spoof data, and maintain persistence. Implements stealth techniques to evade detection.',
      tech: ['C', 'Kernel Programming', 'FreeBSD'],
      icon: Shield,
      status: 'In Progress',
      highlight: true
    },
    {
      title: 'Cryptopals Challenges',
      description: 'Implemented solutions covering block cipher modes, stream ciphers, padding oracle attacks, and key recovery. Refactored in C for 60% performance improvement.',
      tech: ['Python', 'C', 'Cryptography'],
      icon: Lock,
      link: 'github.com/pwaghanna'
    },
    {
      title: 'HTB Penetration Testing',
      description: 'Completed 7+ HackTheBox labs demonstrating reconnaissance, exploitation, and reporting. Developed custom automation scripts reducing exploit time by 30%.',
      tech: ['Python', 'Bash', 'Metasploit', 'nmap'],
      icon: Eye,
      link: 'github.com/pwaghanna'
    },
    {
      title: 'Industrial IoT Platform',
      description: 'Led team of 8 engineers building MERN stack application for real-time production monitoring. Integrated ESP32 microprocessors and ThingSpeak for data collection.',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
      icon: Server
    }
  ];

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
      {['hero', 'about', 'skills', 'projects', 'experience', 'contact'].map(section => (
        <button
          key={section}
          onClick={() => sectionsRef.current[section]?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === section 
              ? 'bg-emerald-500 w-8' 
              : 'bg-gray-600 hover:bg-gray-500'
          }`}
          aria-label={section}
        />
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-mono">
      <ScrollIndicator />
      <Navigation />

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
                className={`bg-gray-900 rounded-lg p-6 border transition-all duration-300 hover:scale-105 ${
                  project.highlight 
                    ? 'border-red-500 shadow-lg shadow-red-500/20' 
                    : 'border-gray-800 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <project.icon className={project.highlight ? 'text-red-400' : 'text-emerald-500'} size={32} />
                  {project.status && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold">
                      {project.status}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-gray-800 text-cyan-400 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer"
                     className="text-emerald-500 hover:text-emerald-400 text-sm flex items-center gap-1">
                    View on GitHub →
                  </a>
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

export default Portfolio;