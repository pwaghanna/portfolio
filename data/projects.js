import { Terminal, Shield, Code, Lock, Eye, Server, LucideBrickWallFire, Github, Linkedin, Mail, Glasses, Factory, ChevronDown, Trophy, Gamepad2, Activity, Flag, Monitor, ArrowLeft, ExternalLink, Layers } from 'lucide-react';
export const projects = [
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

export default projects;