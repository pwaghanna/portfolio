import { Terminal, Shield, Code, Lock, Eye, Server, LucideBrickWallFire, Github, Linkedin, Mail, Glasses, Factory, ChevronDown, Trophy, Gamepad2, Activity, Flag, Monitor, ArrowLeft, ExternalLink, Layers } from 'lucide-react';
export const projectData = {
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
        github: 'https://github.com/pwaghanna/Houdini',
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
            image: '/projects/houdini/working.png',
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
            image: '/projects/houdini/load.png',
            imageAlt: 'Loading Houdini module',
            imageCaption: 'Loading the Houdini kernel module into FreeBSD'
          },

          {
            title: 'File & Process Visibility Control',
            content:
              'The project demonstrates how modifying VFS return paths can influence standard system utilities such as ls, find, and ps. By controlling visibility at the abstraction layer, the underlying filesystem and process structures remain untouched.',
            images: [
              {
                src: '/projects/houdini/ls_no_houdini.png',
                alt: 'File visibility',
                caption: 'Files visible without Houdini loaded'
              },
              {
                src: '/projects/houdini/ls_houdini.png',
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
                src: '/projects/houdini/cat_no_passwd.png',
                alt: 'File content without Houdini',
                caption: 'Original file content without Houdini'
              },
              {
                src: '/projects/houdini/cat_houdini.png',
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
          content: 'This project implements a kernel-level monitoring tool using eBPF kprobes to trace critical system calls such as execve, openat, write, unlinkat, and connect. By operating at the kernel boundary, the monitor captures high-fidelity system events while remaining lightweight and non-intrusive.',
          image: '/projects/ebpf-monitor/example.png',
          imageAlt: 'eBPF monitor flags suspicious activity',
          imageCaption: 'Example output showing flagged suspicious file access and process execution'
        },
        {
          title: 'System Architecture',
          content:
            'The system consists of an eBPF program attached to kernel syscalls using kprobes, which emits structured events to user space via a perf ring buffer. A Python-based controller consumes these events, applies detection heuristics, aggregates metrics, and presents real-time insights.',
          image: '/projects/ebpf-monitor/ebpf_architecture.png',
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
          ],
          
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
          image: '/projects/ebpf-monitor/result_statistics.png',
          imageAlt: 'Monitoring statistics',
          imageCaption: 'Event distribution, suspicious activity ratio, and throughput metrics'
        },

        {
          title: 'Performance Overhead Analysis',
          content:
            'To evaluate runtime overhead, syscall latency was measured using strace. The results show an approximate 2× increase in execution time for a simple ls command, highlighting the tradeoff between deep kernel visibility and performance.',
          images: [
            {
              src: '/projects/ebpf-monitor/strace_ls.png',
              alt: 'strace without eBPF',
              caption: 'Baseline syscall latency without eBPF monitoring'
            },
            {
              src: '/projects/ebpf-monitor/strace_ls_with_ebpf.png',
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
            video: '/projects/roomsense/demo.mp4',
            videoCaption: 'RoomSense system AR demonstration'
          },

          {
            title: 'System Architecture',
            content:
              'RoomSense is composed of three core components: a web application for instructors and students, a backend API for session management and data flow, and an AR application running on Snap Spectacles. The system emphasizes low-latency, real-time feedback while maintaining student privacy.',
            image: '/projects/roomsense/architecture.png',
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
                  src: '/projects/roomsense/engagement.png',
                  alt: 'AR engagement bars',
                  caption: 'Color-coded engagement bars rendered above detected faces'
              },
              {
                  src: '/projects/roomsense/landmarks.png',
                  alt: 'Facial landmarks',
                  caption: 'Facial landmark detection used for engagement estimation'
              }
            ]
          },

          {
            title: 'User Workflow',
            content:
              'Instructors create and manage lectures through the web application, while students join sessions using a lecture code without providing personal information. During the lecture, instructors view engagement indicators and incoming questions through the AR interface, enabling adaptive teaching without disrupting delivery.',
            image: '/projects/roomsense/workflow.png',
            imageAlt: 'User workflow diagram',
            imageCaption: 'Instructor and student interaction flow'
          },

          

          {
            title: 'Evaluation & User Study',
            content:
              'RoomSense was evaluated through a formative user study involving 8 participants, including teaching assistants and students. Despite limited prior exposure to AR technologies, all participants were able to complete core tasks with minimal guidance.',
            image: '/projects/roomsense/results.png',
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
                src: '/projects/roomsense/student-view.png',
                alt: 'Student Web Interface',
                caption: 'Student interface for joining lectures and submitting questions'
              },
              {
                src: '/projects/roomsense/instructor-view.png',
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
          image: '/projects/lhupr/module.png',
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
          image: '/projects/huf/architecture.png',
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
              src: '/projects/huf/hardware.png',
              alt: 'IoT hardware integration',
              caption: 'ESP32-based data collection and real-time machine monitoring'
            },
            {
              src: '/projects/huf/hardware_data_flow.jpeg',
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
              src: '/projects/huf/df.png',
              alt: 'User workflow diagram',
              caption: 'Digitized workflows across production hierarchy'
            },
            {
              src: '/projects/huf/uc.png',
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
              src: '/projects/huf/graph1.jpg',
              alt: 'Production dashboard',
              caption: 'Live production metrics and analytics'
            },
            {
              src: '/projects/huf/graphs2.jpg',
              alt: 'Analytics graphs',
              caption: 'Production trends, KPIS, and throughput analysis'
            }
          ]
        },
        {
          title: 'Dashboards',
          images: [
            {
              src: '/projects/huf/operator.jpeg',
              alt: 'Operator dashboard',
              caption: 'Operator interface for shift and machine reporting'
            },
            {
              src: '/projects/huf/supervi_dash.jpeg',
              alt: 'Supervisor dashboard',
              caption: 'Supervisor dashboard with production workers information and alerts'
            }
          ]
        },

        {
          title: 'QRCI & Alert Management',
          content:
            'The system digitizes Line QRCI and Plant QRCI processes with time-based escalation rules. Alerts are automatically forwarded across roles if issues are not resolved within defined time windows, ensuring accountability and faster resolution.',
          image: '/projects/huf/qrci.jpg',
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
    'ufw-firewall': {
      title: 'Uncomplicated FireWall (UFW)',
      icon: LucideBrickWallFire,
      tagline: 'Linux Firewall Configuration & Security Hardening',
      overview:
        'A comprehensive guide and reference implementation for securing Linux systems using UFW. The project demonstrates practical firewall configuration scenarios, security best practices, and defensive strategies for production servers, including SSH hardening, web service exposure control, and brute-force protection.',
      tech: [
        'Linux',
        'UFW',
        'iptables',
        'Network Security',
        'System Administration',
        'Shell Scripting',
        'Server Hardening'
      ],
      github: 'github.com/pwaghanna/ufw-guide',  // Update with your repo
      sections: [
        {
          title: 'Project Overview',
          content:
            'UFW (Uncomplicated Firewall) provides a user-friendly interface to iptables, making Linux firewall configuration accessible without sacrificing power. This project documents installation, configuration strategies, and real-world security scenarios for hardening production systems against network-based attacks.'
        },

        {
          title: 'Installation & Setup',
          content:
            'UFW installation and initial configuration is straightforward on Debian-based systems. The setup process includes installing the package, verifying the installation, and establishing a secure baseline configuration before enabling the firewall.',
          image: '/projects/ufw/install.png',  // Your screenshot path
          imageAlt: 'UFW installation process',
          imageCaption: 'Installing and verifying UFW on Ubuntu/Debian systems'
        },

        {
          title: 'Core Firewall Rules',
          items: [
            'allow - Permit communication through specified ports or from specific IPs',
            'deny - Silently drop packets without response (stealth mode)',
            'reject - Refuse connection with "destination unreachable" response',
            'limit - Rate-limit connection attempts (default: 6 per IP per 30 seconds)'
          ]
        },

        {
          title: 'Rule Configuration',
          content:
            'UFW uses an intuitive syntax that reads like natural English, making it easier to configure complex firewall rules without deep networking knowledge. Rules can target specific ports, protocols, IP addresses, and subnets with directional control.',
          image: '/projects/ufw/rules.png',  // Your screenshot path
          imageAlt: 'UFW rule configuration examples',
          imageCaption: 'Configuring firewall rules for ports, IPs, and protocols'
        },

        {
          title: 'Security Scenario 1: SSH Hardening',
          content:
            'Protect administrative SSH access on production servers by restricting access to trusted subnets and implementing rate limiting to prevent brute-force attacks. This configuration allows SSH only from a private network while logging all rejected connection attempts.',
          items: [
            'Restrict SSH to trusted subnet (192.168.1.0/24)',
            'Apply rate limiting to prevent brute-force attacks',
            'Enable logging for security monitoring',
            'Deny all other incoming connections by default'
          ]
        },

        {
          title: 'Security Scenario 2: Web Server Exposure',
          content:
            'Configure a secure baseline for public-facing web servers that need to accept HTTP/HTTPS traffic while keeping all other services hidden. This approach follows the principle of least privilege by only exposing required services.',
          items: [
            'Allow inbound HTTP (80) and HTTPS (443)',
            'Deny all other incoming connections',
            'Preserve outbound access for updates and APIs',
            'Implement default-deny policy for security'
          ]
        },

        {
          title: 'Security Scenario 3: Database Server Protection',
          content:
            'Isolate database services by allowing connections only from trusted internal application servers. This prevents direct internet exposure while maintaining necessary internal communication.',
          items: [
            'Deny all public access to database ports',
            'Allow PostgreSQL (5432) only from internal subnet (10.0.0.0/8)',
            'Implement subnet-based access control',
            'Maintain zero external attack surface for database'
          ]
        },

        {
          title: 'Advanced Rate Limiting',
          content:
            'The limit rule provides basic protection, but custom rate limiting using iptables offers more granular control. This technique is critical for protecting SSH, RDP, and authentication endpoints from credential stuffing and brute-force attacks.',
          items: [
            'Configure custom rate limits (e.g., 3 attempts per 60 seconds)',
            'Target specific services like SSH port 22',
            'Use iptables recent module for stateful tracking',
            'Silently drop excessive connection attempts'
          ]
        },

        {
          title: 'Logging & Monitoring',
          content:
            'UFW supports multiple logging verbosity levels and can be configured to log to dedicated files for easier analysis. Proper logging is essential for detecting attack patterns and understanding firewall effectiveness.',
          items: [
            'Log all denied/rejected packets for analysis',
            'Configure verbosity levels (low, medium, high, full)',
            'Route logs to dedicated files using rsyslog',
            'Enable automated log analysis for threat detection'
          ]
        },

        {
          title: 'Operational Best Practices',
          items: [
            'Always allow SSH before enabling UFW to avoid lockout',
            'Use deny for stealth, reject when you want to inform clients',
            'Enable UFW to start automatically on system boot',
            'Test rules in non-production before deploying',
            'Document all rule changes for compliance and troubleshooting',
            'Regularly review logs for unauthorized access attempts'
          ]
        },

        {
          title: 'Common Mistakes & Prevention',
          items: [
            'Locking yourself out by enabling UFW before allowing SSH port 22',
            'Using deny instead of reject during debugging (no client feedback)',
            'Forgetting that rule order matters (first match wins)',
            'Not testing rules before production deployment',
            'Failing to enable firewall persistence across reboots'
          ]
        },

        {
          title: 'Security Architecture',
          content:
            'The documented configurations follow defense-in-depth principles with default-deny policies, minimal service exposure, and layered protection against common attack vectors. Each scenario demonstrates how to balance security requirements with operational needs.'
        },

        {
          title: 'Key Outcomes',
          items: [
            'Implemented secure baseline configurations for multiple server types',
            'Documented real-world security scenarios with production-ready rules',
            'Demonstrated SSH hardening techniques against brute-force attacks',
            'Established rate-limiting strategies for authentication endpoints',
            'Created reusable firewall templates for common deployment patterns'
          ]
        },

        {
          title: 'Ethical Scope',
          content:
            'This project is intended for defensive security, system hardening, and educational purposes only. All configurations assume systems you own or have explicit permission to configure. The techniques documented here are designed to protect infrastructure, not to facilitate unauthorized access.'
        }
      ]
    },


  };

export default projectData;