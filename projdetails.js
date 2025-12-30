'ebpf-monitor': {
      title: 'eBPF System & File Access Monitor',
      icon: Monitor,
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
          image: '/portfolio/projects/ebpf-monitor/example.png',
          imageAlt: 'eBPF monitoring architecture',
          imageCaption: 'High-level architecture showing kernel probes and user-space event processing'
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
  icon: Eye,
  tagline: 'AR-Enhanced Classroom Engagement System',
  overview:
    'RoomSense is an augmented reality classroom engagement system that helps instructors gauge student attention in real time while enabling anonymous question submission. Using Snap Spectacles and a companion web application, RoomSense enhances situational awareness during live lectures without interrupting teaching flow.',
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
      title: 'Demo Video',
      content:
        'A short walkthrough demonstrating student interaction, instructor analytics, and real-time engagement flow.',
      video: '/projects/roomsense/demo.mp4',
      videoCaption: 'RoomSense system AR demonstration'
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
}

