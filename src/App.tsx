import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowDown,
  Award,
  Briefcase,
  Clock3,
  Database,
  Download,
  GraduationCap,
  Github,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Search,
  Server,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  // MessageSquare, // Chatbot disabled temporarily
  // Send, // Chatbot disabled temporarily
} from 'lucide-react';

interface Milestone {
  year: string;
  title: string;
  role: string;
  description: string;
  achievements: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
}

interface TerminalEntry {
  id: number;
  command?: string;
  lines: string[];
  tone?: 'default' | 'success' | 'error';
}


/* CHATBOT DISABLED TEMPORARILY
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
*/

export default function App() {
  const [currentMilestoneIdx, setCurrentMilestoneIdx] = useState<number>(0);
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([
    {
      id: 0,
      lines: [
        "Welcome to Akshita's interactive portfolio terminal.",
        'Type "help" to view available commands.',
      ],
      tone: 'success',
    },
  ]);
  const [terminalCommand, setTerminalCommand] = useState<string>('');
  const [terminalCommandHistory, setTerminalCommandHistory] = useState<string[]>([]);
  const [terminalHistoryIndex, setTerminalHistoryIndex] = useState<number>(-1);
  const [contactStatus, setContactStatus] = useState<{
    state: 'idle' | 'sending' | 'success' | 'error';
    message: string;
  }>({ state: 'idle', message: '' });

  /* CHATBOT DISABLED TEMPORARILY
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am Akshita's AI Twin. Ask me about her TCS BaNCS production support experience, core banking operations, technical skills, or education.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  */

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const terminalEntryIdRef = useRef<number>(1);

  const milestones: Milestone[] = [
    {
      year: 'Aug 2021 - Aug 2024',
      title: 'Bachelor of Science in Information Technology',
      role: 'Amity University Rajasthan',
      description:
        'Completed a Bachelor of Science in Information Technology, building a strong foundation in software, databases, operating systems, and IT service concepts.',
      achievements: [
        'Completed a three-year B.Sc. in Information Technology.',
        'Developed the technical foundation used in current Unix, Linux, SQL, and shell-scripting work.',
        'Strengthened communication and collaboration skills across academic and team environments.',
      ],
      metrics: [
        { label: 'Degree', value: 'B.Sc. IT' },
        { label: 'Duration', value: '3 Years' },
        { label: 'Institution', value: 'Amity University' },
      ],
      tags: ['IT Fundamentals', 'Databases', 'Operating Systems', 'Software Engineering', 'Communication'],
    },
    {
      year: 'Sep 2024 - Present',
      title: 'Application Support Executive',
      role: 'Tata Consultancy Services | State Bank of India, Belapur',
      description:
        'Supporting the TCS BaNCS Core Banking Application for SBI through production monitoring, incident resolution, data validation, batch operations, and cross-functional coordination.',
      achievements: [
        'Provide application and production support for critical banking applications and business processes.',
        'Monitor End-of-Day, Start-of-Day, and batch-processing activities to ensure smooth execution.',
        'Investigate application issues, perform root-cause analysis, and coordinate with development teams for resolution.',
        'Create and execute SQL queries for data validation, troubleshooting, verification, and reconciliation.',
        'Manage incident tickets, status reports, issue trackers, and process documentation within defined SLAs.',
        'Support deployments, post-release validation, defect tracking, testing, and production support activities.',
        'Participate in DR drills and fail-over switch activities for the Core Banking System.',
      ],
      metrics: [
        { label: 'Employer', value: 'TCS' },
        { label: 'Client', value: 'SBI' },
        { label: 'Location', value: 'Belapur' },
      ],
      tags: [
        'Unix',
        'Linux',
        'SQL',
        'Autosys',
        'Shell Scripting',
        'Production Support',
        'Incident Management',
        'Change Management',
        'Batch Monitoring',
        'Root Cause Analysis',
        'Core Banking',
        'IT Service Management',
      ],
    },
  ];



  /* CHATBOT DISABLED TEMPORARILY
  const presetSuggestions = [
    "Tell me about Akshita's TCS and SBI experience.",
    'What are her core production support skills?',
    'How does she support EOD, batch, and DR operations?',
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isChatLoading]);
  */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
    }> = [];

    const initParticles = () => {
      particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        color: ['rgba(139, 92, 246, ', 'rgba(59, 130, 246, ', 'rgba(236, 72, 153, '][
          Math.floor(Math.random() * 3)
        ],
        alpha: Math.random() * 0.4 + 0.1,
      }));
    };

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    handleResize();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.25,
        canvas.height * 0.3,
        50,
        canvas.width * 0.25,
        canvas.height * 0.3,
        400,
      );
      gradient1.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.75,
        canvas.height * 0.7,
        50,
        canvas.width * 0.75,
        canvas.height * 0.7,
        500,
      );
      gradient2.addColorStop(0, 'rgba(168, 85, 247, 0.06)');
      gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0 && distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          particle.x += (dx / distance) * force * 1.2;
          particle.y += (dy / distance) * force * 1.2;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${particle.alpha})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color === 'rgba(59, 130, 246, ' ? '#3b82f6' : '#a855f7';
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);



  /* CHATBOT DISABLED TEMPORARILY
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || chatMessage;
    if (!textToSend.trim() || isChatLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((previous) => [...previous, userMessage]);
    if (!customText) setChatMessage('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory.map((item) => ({ role: item.role, content: item.content })),
        }),
      });

      if (!response.ok) throw new Error('Could not connect to AI Clone API');

      const data = await response.json();
      setChatHistory((previous) => [
        ...previous,
        {
          role: 'assistant',
          content: data.text || 'I encountered a brief communication gap. Please ask again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      console.error(error);
      setChatHistory((previous) => [
        ...previous,
        {
          role: 'assistant',
          content: "I couldn't reach Akshita's server proxy. Please verify the backend status or reload the session.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };
  */

  useEffect(() => {
    const terminalOutput = terminalOutputRef.current;
    if (!terminalOutput) return;

    terminalOutput.scrollTo({
      top: terminalOutput.scrollHeight,
      behavior: terminalEntries.length > 1 ? 'smooth' : 'auto',
    });
  }, [terminalEntries]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  const terminalCommands = [
    'help',
    'whoami',
    'focus',
    'skills',
    'experience',
    'awards',
    'about',
    'contact',
    'resume',
    'github',
    'linkedin',
    'email',
    'date',
    'clear',
  ];

  const addTerminalEntry = (
    command: string,
    lines: string[],
    tone: TerminalEntry['tone'] = 'default',
  ) => {
    setTerminalEntries((previous) => [
      ...previous,
      {
        id: terminalEntryIdRef.current++,
        command,
        lines,
        tone,
      },
    ]);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTerminalCommand = (rawCommand: string) => {
    const enteredCommand = rawCommand.trim();
    if (!enteredCommand) return;

    const command = enteredCommand.toLowerCase();
    setTerminalCommandHistory((previous) => [...previous, enteredCommand]);
    setTerminalHistoryIndex(-1);
    setTerminalCommand('');

    if (command === 'clear') {
      setTerminalEntries([]);
      return;
    }

    switch (command) {
      case 'help':
        addTerminalEntry(enteredCommand, [
          'AVAILABLE COMMANDS',
          'whoami     Display professional identity',
          'focus      Show current role and domain',
          'skills     List core technical skills',
          'experience Open Technical Operations',
          'awards     Open Awards & Recognition',
          'about      Open the About section',
          'contact    Show verified contact details',
          'resume     Download the resume PDF',
          'github     Open GitHub profile',
          'linkedin   Open LinkedIn profile',
          'email      Compose an email',
          'date       Display local date and time',
          'clear      Clear the terminal screen',
        ], 'success');
        break;
      case 'whoami':
        addTerminalEntry(enteredCommand, [
          'Akshita Sarda',
          'System Engineer · Application Support Executive',
          'Tata Consultancy Services · SBI Core Banking, Belapur',
        ]);
        break;
      case 'focus':
        addTerminalEntry(enteredCommand, [
          'TCS BaNCS Core Banking production support for SBI.',
          'EOD/SOD monitoring · incident resolution · batch operations · data validation',
        ]);
        break;
      case 'skills':
        addTerminalEntry(enteredCommand, [
          'Unix · Linux · SQL · Autosys · Shell Scripting',
          'Production Support · Incident Management · Root Cause Analysis · DR Support',
        ]);
        break;
      case 'experience':
        addTerminalEntry(enteredCommand, ['Opening Technical Operations section...'], 'success');
        window.setTimeout(() => scrollToSection('experience-section'), 180);
        break;
      case 'awards':
        addTerminalEntry(enteredCommand, ['Opening Awards & Recognition section...'], 'success');
        window.setTimeout(() => scrollToSection('awards-section'), 180);
        break;
      case 'about':
        addTerminalEntry(enteredCommand, ['Opening professional profile...'], 'success');
        window.setTimeout(() => scrollToSection('about-section'), 180);
        break;
      case 'contact':
        addTerminalEntry(enteredCommand, [
          'Email: akshita2k2@gmail.com',
          'Phone: +91 94135 86475',
          'LinkedIn: linkedin.com/in/akshita-maheshwari-42b577244',
          'Location: SBI, Belapur · Navi Mumbai',
        ]);
        break;
      case 'resume': {
        addTerminalEntry(enteredCommand, ['Preparing Akshita_Sarda_Resume.pdf...'], 'success');
        const downloadLink = document.createElement('a');
        downloadLink.href = '/Akshita_Sarda_Resume.pdf';
        downloadLink.download = 'Akshita_Sarda_Resume.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        break;
      }
      case 'github':
        addTerminalEntry(enteredCommand, ['Opening github.com/AkshitaSarda...'], 'success');
        window.open('https://github.com/AkshitaSarda', '_blank', 'noopener,noreferrer');
        break;
      case 'linkedin':
        addTerminalEntry(enteredCommand, ['Opening LinkedIn profile...'], 'success');
        window.open(
          'https://www.linkedin.com/in/akshita-maheshwari-42b577244',
          '_blank',
          'noopener,noreferrer',
        );
        break;
      case 'email':
        addTerminalEntry(enteredCommand, ['Opening your default email application...'], 'success');
        window.location.href = 'mailto:akshita2k2@gmail.com?subject=Portfolio%20enquiry';
        break;
      case 'date':
        addTerminalEntry(enteredCommand, [new Date().toLocaleString()]);
        break;
      default:
        addTerminalEntry(
          enteredCommand,
          [`Command not found: ${enteredCommand}`, 'Type "help" to view available commands.'],
          'error',
        );
    }
  };

  const handleTerminalKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleTerminalCommand(terminalCommand);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!terminalCommandHistory.length) return;
      const nextIndex =
        terminalHistoryIndex < terminalCommandHistory.length - 1
          ? terminalHistoryIndex + 1
          : terminalHistoryIndex;
      setTerminalHistoryIndex(nextIndex);
      setTerminalCommand(terminalCommandHistory[terminalCommandHistory.length - 1 - nextIndex] || '');
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (terminalHistoryIndex <= 0) {
        setTerminalHistoryIndex(-1);
        setTerminalCommand('');
        return;
      }
      const nextIndex = terminalHistoryIndex - 1;
      setTerminalHistoryIndex(nextIndex);
      setTerminalCommand(terminalCommandHistory[terminalCommandHistory.length - 1 - nextIndex] || '');
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const match = terminalCommands.find((item) => item.startsWith(terminalCommand.toLowerCase()));
      if (match) setTerminalCommand(match);
    }
  };

  const activeMilestone = milestones[currentMilestoneIdx];
  const milestoneProgress = (currentMilestoneIdx / (milestones.length - 1)) * 100;

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (contactStatus.state === 'sending') return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const honey = String(formData.get('_honey') || '').trim();

    if (!name || !email || !message) {
      setContactStatus({
        state: 'error',
        message: 'Please complete your name, email address, and message.',
      });
      return;
    }

    setContactStatus({ state: 'sending', message: 'Transmitting your message...' });

    try {
      const response = await fetch('https://formsubmit.co/ajax/akshita2k2@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `Portfolio enquiry from ${name}`,
          _template: 'table',
          _captcha: 'false',
          _honey: honey,
        }),
      });

      const result = await response.json().catch(() => null);
      const submissionFailed =
        !response.ok || result?.success === false || result?.success === 'false';

      if (submissionFailed) {
        throw new Error(result?.message || 'The message could not be delivered.');
      }

      form.reset();
      setContactStatus({
        state: 'success',
        message: 'Message sent successfully. Akshita will receive it by email.',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setContactStatus({
        state: 'error',
        message: 'Message could not be sent. Please try again or use the email link below.',
      });
    }
  };

  return (
    <div
      id="root-container"
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-[#030307] text-[#ebebfa]"
    >
      <canvas
        id="bg-canvas"
        ref={canvasRef}
        className="absolute left-0 top-0 z-0 h-full w-full pointer-events-none"
      />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[200px] -left-[100px] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px] animate-orb-1" />
        <div className="absolute top-[100px] right-[-100px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-orb-2" />
        <div className="absolute -bottom-[100px] left-[20%] h-[400px] w-[700px] rounded-full bg-slate-500/10 blur-[120px] animate-[spin_50s_linear_infinite]" />
      </div>

      <header id="header-nav" className="sticky top-0 z-50 w-full px-4 py-3 md:px-8">
        <div className="glass-panel mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center rounded-full border-white/10 bg-white/5 p-2 shadow-lg backdrop-blur-md">
          <div className="flex min-w-0 items-center gap-3 pl-2 md:pl-4">
            <div className="group/profile relative shrink-0">
              <button
                type="button"
                aria-label="Preview Akshita Sarda profile picture"
                className="relative block h-9 w-9 overflow-hidden rounded-full border border-blue-400/50 bg-neutral-900 shadow-[0_0_18px_rgba(59,130,246,0.24)] transition duration-200 hover:scale-105 hover:border-purple-400/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030307]"
              >
                <img
                  src="/Akshita_Profile_Thumb.webp"
                  alt="Akshita Sarda"
                  className="h-full w-full object-cover transition duration-300 group-hover/profile:scale-110"
                />
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
              </button>

              <div
                role="img"
                aria-label="Enlarged profile picture of Akshita Sarda"
                className="pointer-events-none absolute left-0 top-[calc(100%+0.75rem)] z-[70] w-[190px] origin-top-left translate-y-2 scale-95 overflow-hidden rounded-[1.4rem] border border-white/15 bg-neutral-950/95 p-1.5 opacity-0 shadow-[0_24px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-200 group-hover/profile:translate-y-0 group-hover/profile:scale-100 group-hover/profile:opacity-100 group-focus-within/profile:translate-y-0 group-focus-within/profile:scale-100 group-focus-within/profile:opacity-100 sm:w-[225px]"
              >
                <img
                  src="/Akshita_Profile.webp"
                  alt=""
                  aria-hidden="true"
                  className="block h-[250px] w-full rounded-[1.05rem] object-cover object-top sm:h-[300px]"
                />
              </div>
            </div>
            <span className="hidden truncate text-sm font-semibold tracking-[0.25em] text-white lg:inline">AKSHITA</span>
          </div>

          <nav aria-label="Primary navigation" className="flex items-center justify-center gap-1 px-1 sm:gap-2 sm:px-2">
            {[
              { label: 'Experience', href: '#experience-section' },
              { label: 'Awards', href: '#awards-section' },
              { label: 'About', href: '#about-section' },
              { label: 'Contact', href: '#contact-section' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative px-2 py-2 text-[10px] font-medium tracking-wide text-slate-300 transition hover:text-cyan-300 sm:px-3 sm:text-xs"
              >
                {item.label}
                <span className="absolute inset-x-2 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-transform duration-200 group-hover:scale-x-100 sm:inset-x-3" />
              </a>
            ))}
          </nav>

          <div className="flex justify-end pr-0.5 md:pr-2">
            <a
              href="/Akshita_Sarda_Resume.pdf"
              download="Akshita_Sarda_Resume.pdf"
              aria-label="Download Akshita Sarda resume"
              className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-blue-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-200 sm:text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download Resume</span>
              <span className="sm:hidden">Resume</span>
            </a>
          </div>

          {/* CHATBOT DISABLED TEMPORARILY
          <button
            id="action-chat-btn"
            onClick={() => setIsChatOpen(true)}
            className="mr-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-white/20"
          >
            Direct AI Inquiry
          </button>
          */}
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 pb-24 pt-8 md:px-8">
        <section
          id="hero-profile-section"
          className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden py-8 md:min-h-[550px]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[43%] h-[220px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/[0.045] blur-[90px]" />
          </div>

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
            <div className="relative grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 overflow-visible px-2 sm:gap-5 md:px-5">
              <div aria-hidden="true" className="hidden min-w-[72px] items-center justify-end pr-3 md:flex md:min-w-[112px] md:pr-5">
                <span className="h-px min-w-8 flex-1 bg-gradient-to-r from-transparent via-cyan-400/45 to-cyan-400/80" />
              </div>

              <div className="relative justify-self-center overflow-visible">
                <div className="pointer-events-none absolute left-[24%] top-[56%] hidden h-6 w-32 -skew-x-12 bg-[#030307] shadow-[0_0_26px_rgba(34,211,238,0.18)] md:block" />
                <div className="pointer-events-none absolute right-[19%] top-[56%] hidden h-6 w-28 skew-x-12 bg-[#030307] shadow-[0_0_26px_rgba(168,85,247,0.16)] md:block" />

                <h1 className="relative overflow-visible text-[clamp(2.8rem,7vw,6.4rem)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-white">
                  <span className="block sm:inline">Akshita</span>{' '}
                  <span className="inline-block bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-500 bg-clip-text pr-[0.12em] text-transparent">
                    Sarda
                  </span>
                </h1>
              </div>

              <div aria-hidden="true" className="hidden min-w-[72px] items-center justify-start pl-3 md:flex md:min-w-[112px] md:pl-5">
                <span className="h-px min-w-8 flex-1 bg-gradient-to-r from-purple-400/80 via-purple-400/45 to-transparent" />
              </div>
            </div>

            <h2 className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300 sm:text-xs md:text-base md:tracking-[0.28em]">
              System Engineer <span className="text-cyan-400">·</span> TCS BaNCS Support Specialist
            </h2>

            <p className="mt-4 max-w-2xl font-mono text-sm leading-6 text-slate-400 md:text-[15px] md:leading-7">
              Managing enterprise SBI Core Banking production environments.
              <br className="hidden md:block" /> Optimizing high-scale databases and automating critical overnight batches.
            </p>

            <div className="mt-7 flex w-full justify-center">
              <a
                href="#spatial-journey-section"
                className="group relative inline-flex min-h-12 w-full max-w-xs items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 px-8 text-sm font-extrabold uppercase tracking-wide text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(168,85,247,0.28)]"
              >
                <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]" />
                <span className="relative">Explore Journey</span>
              </a>
            </div>

            <a
              href="#spatial-journey-section"
              aria-label="Scroll to career journey"
              className="mt-6 inline-flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500 transition hover:text-cyan-300"
            >
              Scroll to begin
              <ArrowDown className="h-5 w-5 animate-bounce text-cyan-400" />
            </a>
          </div>
        </section>

        <section
          id="spatial-journey-section"
          className="glass-panel rounded-[40px] border-white/10 p-8 shadow-2xl backdrop-blur-3xl md:p-10"
        >
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                  Resume Career Path
                </span>
              </div>
              <h2 className="mt-1 text-xl font-light md:text-2xl">Education & Professional Experience</h2>
            </div>

            <div className="glass-panel flex items-center gap-6 rounded-xl p-3 font-mono text-xs">
              <div>
                <span className="block text-[9px] text-neutral-500">SELECTED PHASE</span>
                <span className="text-lg font-bold text-blue-400">
                  {String(currentMilestoneIdx + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}
                </span>
              </div>
              <div className="h-8 w-px bg-neutral-800" />
              <div>
                <span className="block text-[9px] text-neutral-500">PROFILE STATUS</span>
                <span className="text-lg font-bold uppercase text-emerald-400">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="relative mb-8 flex h-44 flex-col justify-end overflow-hidden rounded-xl border border-white/5 bg-neutral-950/60 p-4">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-6 left-0 right-0 h-0.5 border-t border-dashed border-neutral-700/60 bg-neutral-800/80" />
            <div
              className="absolute bottom-6 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
              style={{ width: `${milestoneProgress}%` }}
            />

            <div
              className="absolute bottom-[56px] z-10 transition-all duration-1000 ease-out"
              style={{ left: `calc(${milestoneProgress}% - ${milestoneProgress * 0.96}px)` }}
            >
              <div className="relative flex h-10 w-24 flex-col items-center justify-center">
                <div className="absolute bottom-0 h-2 w-16 animate-pulse rounded-full bg-blue-500/40 blur-xs" />
                <div className="flex h-6 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
                  <Sparkles className="h-3 w-3 animate-spin text-blue-400" />
                  <span className="ml-1 font-mono text-[8px] tracking-widest text-neutral-300">CAREER_NODE</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1 left-0 right-0 flex justify-between px-8 pointer-events-none">
              {milestones.map((milestone, index) => (
                <button
                  id={`milestone-node-${index}`}
                  key={milestone.year}
                  onClick={() => setCurrentMilestoneIdx(index)}
                  className="group flex flex-col items-center pointer-events-auto cursor-pointer focus:outline-hidden"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ${
                      index === currentMilestoneIdx
                        ? 'bg-gradient-to-tr from-blue-500 to-purple-600 text-white ring-4 ring-blue-500/20'
                        : 'border border-white/10 bg-neutral-900 text-neutral-500 group-hover:border-white/30'
                    }`}
                  >
                    {index === 0 ? (
                      <GraduationCap className="h-3 w-3" />
                    ) : (
                      <Briefcase className="h-3 w-3" />
                    )}
                  </div>
                  <span
                    className={`mt-1 font-mono text-[10px] font-semibold transition-colors duration-300 ${
                      index === currentMilestoneIdx ? 'text-white' : 'text-neutral-500'
                    }`}
                  >
                    {milestone.year.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-12">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-md backdrop-blur-2xl lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{activeMilestone.title}</h3>
                  <span className="text-xs text-blue-400">{activeMilestone.role}</span>
                </div>
                <span className="rounded-full bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-400">
                  {activeMilestone.year}
                </span>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-neutral-300">{activeMilestone.description}</p>

              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Highlights & Responsibilities
                </span>
                {activeMilestone.achievements.map((achievement) => (
                  <div key={achievement} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                    <p className="text-xs text-neutral-400">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-4">
              <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
                <span className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Profile Snapshot
                </span>
                <div className="space-y-4">
                  {activeMilestone.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between">
                      <span className="text-xs text-neutral-400">{metric.label}</span>
                      <span className="text-sm font-bold text-white">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
                <span className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Skills & Tools
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeMilestone.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 font-mono text-[9px] text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience-section" className="scroll-mt-28 space-y-8">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-fuchsia-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fuchsia-300">
                  02 / Operational Capabilities
                </span>
              </div>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                Technical <span className="bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent">Operations</span>
              </h2>
            </div>

            <p className="w-full text-center font-mono text-xs leading-relaxed text-slate-400">
              Production-focused experience supporting SBI Core Banking systems, critical batch cycles, incident
              resolution, data validation, and service-continuity activities.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
            <div className="glass-panel relative min-h-[390px] overflow-hidden rounded-[30px] border-white/10 bg-white/[0.035] p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-[9px] uppercase tracking-widest text-slate-500">
                <span>Core Banking Operations Map</span>
                <span className="text-cyan-300">SBI / TCS BaNCS</span>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(rgba(34,211,238,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.07)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_top,black,transparent)]" />
              <div className="pointer-events-none absolute left-1/2 top-[56%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.03] blur-sm" />

              <div className="relative flex min-h-[315px] items-end justify-between gap-5 pt-8">
                <div className="relative flex h-48 w-[30%] flex-col justify-end rounded-t-xl border border-cyan-400/15 bg-slate-950/80 p-4 shadow-[0_0_35px_rgba(34,211,238,0.08)]">
                  <Server className="mb-auto h-5 w-5 text-cyan-300" />
                  <span className="mb-3 font-mono text-[9px] uppercase tracking-widest text-slate-500">Production</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2, 3, 4, 5].map((light) => (
                      <span
                        key={`production-light-${light}`}
                        className={`h-1.5 w-1.5 rounded-full ${light % 3 === 0 ? 'bg-fuchsia-400' : 'bg-cyan-300'} shadow-[0_0_10px_currentColor]`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative mb-7 flex w-[34%] flex-col items-center gap-3">
                  <div className="absolute left-1/2 top-1/2 h-px w-[220%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-400/10 via-cyan-300/70 to-purple-400/10" />
                  {[0, 1, 2].map((disk) => (
                    <div
                      key={`database-disk-${disk}`}
                      className="relative z-10 h-11 w-full rounded-[50%] border border-cyan-300/45 bg-slate-950/90 shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                    >
                      <div className="absolute inset-x-2 top-2 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                      <div className="absolute inset-x-4 bottom-2 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
                    </div>
                  ))}
                  <Database className="relative z-10 mt-1 h-5 w-5 text-purple-300" />
                  <span className="relative z-10 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-400">
                    Data Validation
                  </span>
                </div>

                <div className="relative flex h-48 w-[30%] flex-col justify-end rounded-t-xl border border-purple-400/15 bg-slate-950/80 p-4 shadow-[0_0_35px_rgba(168,85,247,0.08)]">
                  <ShieldCheck className="mb-auto h-5 w-5 text-purple-300" />
                  <span className="mb-3 font-mono text-[9px] uppercase tracking-widest text-slate-500">Continuity</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2, 3, 4, 5].map((light) => (
                      <span
                        key={`continuity-light-${light}`}
                        className={`h-1.5 w-1.5 rounded-full ${light % 2 === 0 ? 'bg-emerald-300' : 'bg-purple-400'} shadow-[0_0_10px_currentColor]`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="glass-panel rounded-[24px] border-cyan-400/15 bg-cyan-400/[0.035] p-5 sm:col-span-2">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Settings2 className="h-5 w-5" />
                  <h3 className="text-base font-bold text-white">SBI Core Banking Application Support</h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Supporting the TCS BaNCS Core Banking Application for SBI through production monitoring, issue
                  investigation, batch coordination, deployment validation, and collaboration with technical and
                  business teams.
                </p>
              </article>

              <article className="glass-panel rounded-[22px] border-white/10 p-4">
                <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-300">Critical Banking Apps</span>
                <div className="mt-2 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />
                  <h3 className="text-sm font-bold text-white">Production Support</h3>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  Monitoring business-critical services and coordinating timely recovery within defined SLAs.
                </p>
              </article>

              <article className="glass-panel rounded-[22px] border-white/10 p-4">
                <span className="font-mono text-[8px] uppercase tracking-widest text-purple-300">IT Service Management</span>
                <div className="mt-2 flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-purple-300" />
                  <h3 className="text-sm font-bold text-white">Incident Management</h3>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  Investigating alerts, managing tickets, tracking issues, and coordinating cross-team resolution.
                </p>
              </article>

              <article className="glass-panel rounded-[22px] border-white/10 p-4">
                <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-300">Data Validation</span>
                <div className="mt-2 flex items-center gap-2">
                  <Database className="h-4 w-4 text-cyan-300" />
                  <h3 className="text-sm font-bold text-white">SQL Querying</h3>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  Creating SQL queries for troubleshooting, verification, reconciliation, and banking-data checks.
                </p>
              </article>

              <article className="glass-panel rounded-[22px] border-white/10 p-4">
                <span className="font-mono text-[8px] uppercase tracking-widest text-purple-300">Operating Systems</span>
                <div className="mt-2 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-purple-300" />
                  <h3 className="text-sm font-bold text-white">Unix & Linux Systems</h3>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  Working with Unix/Linux environments, logs, commands, scripts, and operational troubleshooting.
                </p>
              </article>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Terminal,
                label: 'Automation',
                title: 'Shell Scripting',
                description: 'Using shell scripts and command-line tools to support repeatable operational tasks.',
              },
              {
                icon: Workflow,
                label: 'Batch Control',
                title: 'Autosys Orchestration',
                description: 'Monitoring scheduled workloads, dependencies, failures, and production batch flow.',
              },
              {
                icon: Clock3,
                label: 'Banking Cycle',
                title: 'EOD / SOD Monitoring',
                description: 'Tracking End-of-Day, Start-of-Day, and overnight processing through completion.',
              },
              {
                icon: Search,
                label: 'Problem Solving',
                title: 'Root Cause Analysis',
                description: 'Tracing application issues, isolating causes, and coordinating permanent resolution.',
              },
            ].map(({ icon: Icon, label, title, description }) => (
              <article key={title} className="glass-panel rounded-[22px] border-white/10 p-4 transition hover:-translate-y-1 hover:border-cyan-400/20">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">{label}</span>
                  <Icon className="h-4 w-4 text-cyan-300" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-white">{title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="awards-section" className="scroll-mt-28 space-y-8">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-fuchsia-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fuchsia-300">
                  03 / Commendations
                </span>
              </div>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                Awards &amp;{' '}
                <span className="bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent">
                  Recognition
                </span>
              </h2>
            </div>

            <p className="w-full text-center font-mono text-xs leading-relaxed text-slate-400">
              Team recognition earned through dependable production support, collaboration, and contribution to
              business-critical SBI Core Banking operations.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="glass-panel relative min-h-[390px] overflow-hidden rounded-[30px] border-white/10 bg-white/[0.035] p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-[9px] uppercase tracking-widest text-slate-500">
                <span>Recognition Gallery</span>
                <span className="text-fuchsia-300">Team Excellence</span>
              </div>

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[16%] top-[28%] h-1 w-1 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.9)]" />
                <div className="absolute left-[27%] top-[48%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                <div className="absolute right-[22%] top-[24%] h-1 w-1 rounded-full bg-fuchsia-300 shadow-[0_0_12px_rgba(240,171,252,0.9)]" />
                <div className="absolute right-[14%] top-[54%] h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_12px_rgba(196,181,253,0.9)]" />
                <div className="absolute bottom-0 left-1/2 h-48 w-[78%] -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-500/[0.07] via-purple-500/[0.035] to-transparent blur-2xl" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(rgba(168,85,247,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:linear-gradient(to_top,black,transparent)]" />
              </div>

              <div className="relative grid min-h-[315px] grid-cols-2 items-end gap-7 px-2 pb-5 pt-10 sm:px-8">
                <div className="flex flex-col items-center">
                  <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
                    <div className="absolute inset-3 rounded-full border border-amber-300/35 shadow-[0_0_34px_rgba(251,191,36,0.13)]" />
                    <div className="absolute inset-7 rotate-45 rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-300/15 to-orange-500/5" />
                    <Award className="relative z-10 h-14 w-14 text-amber-300 drop-shadow-[0_0_18px_rgba(252,211,77,0.4)]" />
                  </div>
                  <div className="h-16 w-20 bg-gradient-to-b from-slate-700/80 to-slate-950 [clip-path:polygon(37%_0,63%_0,75%_100%,25%_100%)]" />
                  <div className="h-5 w-28 rounded-t-lg border border-amber-300/20 bg-slate-950/95 shadow-[0_0_24px_rgba(251,191,36,0.08)]" />
                  <span className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-amber-200/80">
                    Star Team Award
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
                    <div className="absolute inset-2 rounded-full border-2 border-cyan-300/35 shadow-[0_0_34px_rgba(34,211,238,0.14)]" />
                    <div className="absolute inset-6 rotate-45 rounded-[28px] border border-purple-300/30 bg-gradient-to-br from-cyan-300/10 via-purple-400/15 to-fuchsia-400/5" />
                    <Sparkles className="relative z-10 h-14 w-14 text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]" />
                  </div>
                  <div className="h-16 w-20 bg-gradient-to-b from-slate-700/80 to-slate-950 [clip-path:polygon(35%_0,65%_0,76%_100%,24%_100%)]" />
                  <div className="h-5 w-28 rounded-t-lg border border-cyan-300/20 bg-slate-950/95 shadow-[0_0_24px_rgba(34,211,238,0.08)]" />
                  <span className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-cyan-200/80">
                    Best Team Award
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <article className="glass-panel relative overflow-hidden rounded-[26px] border-fuchsia-400/15 bg-fuchsia-400/[0.025] p-6 transition hover:-translate-y-1 hover:border-fuchsia-400/30">
                <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-fuchsia-400 via-purple-500 to-cyan-400" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-fuchsia-400/15 bg-fuchsia-400/10 px-3 py-1 font-mono text-[8px] uppercase tracking-widest text-fuchsia-300">
                    Team Recognition
                  </span>
                  <Award className="h-5 w-5 text-fuchsia-300" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">Star Team Award</h3>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-cyan-300">
                  Tata Consultancy Services
                </p>
                <p className="mt-4 text-xs leading-relaxed text-slate-400">
                  Recognition for contributing to dependable Core Banking production support through coordination,
                  ownership, and consistent teamwork.
                </p>
                <div className="mt-5 border-t border-white/5 pt-4 font-mono text-[8px] uppercase leading-relaxed tracking-wider text-slate-500">
                  Focus: <span className="text-cyan-300">Collaboration · Reliability · Operational Support</span>
                </div>
              </article>

              <article className="glass-panel relative overflow-hidden rounded-[26px] border-cyan-400/15 bg-cyan-400/[0.025] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30">
                <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 font-mono text-[8px] uppercase tracking-widest text-cyan-300">
                    Operational Excellence
                  </span>
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">Best Team Award</h3>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-purple-300">
                  SBI Core Banking Support Team
                </p>
                <p className="mt-4 text-xs leading-relaxed text-slate-400">
                  Team recognition for collaborative production support and disciplined handling of critical banking
                  operations and service responsibilities.
                </p>
                <div className="mt-5 border-t border-white/5 pt-4 font-mono text-[8px] uppercase leading-relaxed tracking-wider text-slate-500">
                  Focus: <span className="text-cyan-300">Teamwork · Service Continuity · SLA Discipline</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="about-section" className="scroll-mt-28 space-y-8">
          <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">
                  04 / Professional Profile
                </span>
              </div>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                About{' '}
                <span className="bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent">
                  Akshita
                </span>
              </h2>
            </div>

            <p className="w-full text-center font-mono text-xs leading-relaxed text-slate-400">
              A focused overview of my Core Banking production-support experience, technical strengths, education,
              and communication capabilities.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="glass-panel relative flex min-h-[520px] flex-col overflow-hidden rounded-[30px] border-white/10 bg-white/[0.035] p-5 shadow-2xl">
              <div className="relative z-20 flex items-center justify-between border-b border-white/5 pb-3 font-mono text-[9px] uppercase tracking-widest text-slate-500">
                <span>Professional Identity</span>
                <span className="text-cyan-300">TCS · SBI</span>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.06)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:linear-gradient(to_top,black,transparent)]" />

              <div className="relative flex flex-1 items-center justify-center py-6">
                <div className="relative flex h-[405px] w-full max-w-[405px] items-center justify-center">
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-purple-500/[0.08] blur-2xl" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[285px] w-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/15" />

                  <div className="relative z-10 h-[300px] w-[230px] overflow-hidden rounded-[30px] border border-cyan-300/25 bg-slate-950/80 p-1.5 shadow-[0_0_45px_rgba(34,211,238,0.14)] sm:h-[330px] sm:w-[250px]">
                    <img
                      src="/Akshita_Profile.webp"
                      alt="Akshita Sarda"
                      className="h-full w-full rounded-[25px] object-cover object-center"
                    />
                    <div className="pointer-events-none absolute inset-1.5 rounded-[25px] bg-gradient-to-t from-[#030307]/55 via-transparent to-cyan-300/[0.03]" />
                  </div>
                </div>
              </div>

              <div className="relative z-20 -mt-2 pb-1 text-center">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Akshita Sarda
                </p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
                  System Engineer · Core Banking Support
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                Building banking resilience through disciplined production support.
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                I am a System Engineer and Application Support Executive at Tata Consultancy Services, supporting the
                TCS BaNCS Core Banking Application for State Bank of India in Belapur. My work covers production and
                batch monitoring, incident handling, SQL-based validation, root-cause analysis, deployment support,
                and coordination across application, infrastructure, development, and business teams.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Search,
                    title: 'Critical Problem Solver',
                    description: 'Tracing production issues, validating data, reviewing logs, and coordinating durable fixes.',
                    accent: 'text-cyan-300 border-cyan-400/15 bg-cyan-400/[0.025]',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'SLA & Incident Agility',
                    description: 'Managing incidents, trackers, escalations, and service restoration within defined timelines.',
                    accent: 'text-purple-300 border-purple-400/15 bg-purple-400/[0.025]',
                  },
                  {
                    icon: Settings2,
                    title: 'Automation Mindset',
                    description: 'Using Unix, Linux, shell scripting, SQL, and Autosys to support repeatable operations.',
                    accent: 'text-cyan-300 border-cyan-400/15 bg-cyan-400/[0.025]',
                  },
                  {
                    icon: Activity,
                    title: 'Business Continuity',
                    description: 'Supporting EOD/SOD cycles, critical batches, DR drills, and fail-over activities.',
                    accent: 'text-fuchsia-300 border-fuchsia-400/15 bg-fuchsia-400/[0.025]',
                  },
                ].map(({ icon: Icon, title, description, accent }) => (
                  <article key={title} className={`glass-panel rounded-[20px] border p-4 ${accent}`}>
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{title}</h4>
                        <p className="mt-2 text-[10px] leading-relaxed text-slate-400">{description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <article className="glass-panel rounded-[20px] border-white/10 p-4">
                  <Briefcase className="h-4 w-4 text-cyan-300" />
                  <span className="mt-3 block font-mono text-[8px] uppercase tracking-widest text-slate-500">Current Role</span>
                  <p className="mt-1 text-xs font-semibold text-white">TCS · SBI Core Banking</p>
                </article>

                <article className="glass-panel rounded-[20px] border-white/10 p-4">
                  <GraduationCap className="h-4 w-4 text-purple-300" />
                  <span className="mt-3 block font-mono text-[8px] uppercase tracking-widest text-slate-500">Education</span>
                  <p className="mt-1 text-xs font-semibold text-white">B.Sc. Information Technology</p>
                </article>

                <article className="glass-panel rounded-[20px] border-white/10 p-4">
                  <Languages className="h-4 w-4 text-fuchsia-300" />
                  <span className="mt-3 block font-mono text-[8px] uppercase tracking-widest text-slate-500">Languages</span>
                  <p className="mt-1 text-xs font-semibold text-white">Hindi · English · German</p>
                </article>
              </div>
            </div>
          </div>
        </section>


        <section id="contact-section" className="scroll-mt-28 space-y-8">
          <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-300" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">
                  05 / Contact Channel
                </span>
              </div>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                Contact{' '}
                <span className="bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent">
                  Hub
                </span>
              </h2>
            </div>

            <p className="w-full max-w-[470px] font-mono text-xs leading-relaxed text-slate-400 lg:justify-self-end">
              Initiate a secure terminal packet with Akshita. Use either the command terminal console or standard
              communication lines.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <article
              className="glass-panel relative flex h-[390px] cursor-text flex-col overflow-hidden rounded-[28px] border-white/10 bg-white/[0.03] p-4 shadow-2xl sm:h-[410px] md:p-5 lg:h-[430px]"
              onClick={() => terminalInputRef.current?.focus()}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.08),transparent_38%)]" />
              <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                </div>
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-cyan-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                  Interactive Terminal
                </div>
              </div>

              <div
                ref={terminalOutputRef}
                className="terminal-scrollbar relative z-10 mt-4 min-h-0 flex-1 overflow-y-auto pr-2 font-mono text-[11px] leading-5 sm:text-xs"
                aria-live="polite"
              >
                {terminalEntries.map((entry) => (
                  <div key={entry.id} className="mb-4 last:mb-0">
                    {entry.command && (
                      <p className="break-words text-cyan-300">
                        akshita@portfolio:~$ <span className="text-purple-300">{entry.command}</span>
                      </p>
                    )}
                    <div
                      className={`space-y-0.5 whitespace-pre-wrap break-words ${entry.command ? 'pl-4' : ''} ${
                        entry.tone === 'error'
                          ? 'text-rose-300'
                          : entry.tone === 'success'
                            ? 'text-slate-300'
                            : 'text-slate-400'
                      }`}
                    >
                      {entry.lines.map((line, lineIndex) => (
                        <p key={`${entry.id}-${lineIndex}`}>{line || '\u00a0'}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-3 border-t border-white/5 pt-3">
                <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
                  <label htmlFor="portfolio-terminal-input" className="shrink-0 text-cyan-300">
                    akshita@portfolio:~$
                  </label>
                  <input
                    id="portfolio-terminal-input"
                    ref={terminalInputRef}
                    type="text"
                    value={terminalCommand}
                    onChange={(event) => setTerminalCommand(event.target.value)}
                    onKeyDown={handleTerminalKeyDown}
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    aria-label="Portfolio terminal command"
                    placeholder='Type "help" and press Enter'
                    className="min-w-0 flex-1 bg-transparent text-purple-200 caret-cyan-300 outline-none placeholder:text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleTerminalCommand(terminalCommand);
                      terminalInputRef.current?.focus();
                    }}
                    className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
                  >
                    Run
                  </button>
                </div>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-widest text-slate-600">
                  Enter to run · ↑/↓ history · Tab autocomplete · clear to reset
                </p>
              </div>
            </article>

            <div className="flex w-full max-w-[470px] flex-col gap-2.5 lg:justify-self-end">
              <form
                onSubmit={handleContactSubmit}
                className="glass-panel rounded-[24px] border-white/10 bg-white/[0.035] p-4 shadow-2xl md:p-5"
              >
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-purple-300">
                      Transmission Packet
                    </span>
                    <h3 className="mt-1 text-base font-bold text-white">Send a message</h3>
                  </div>
                  <Send className="h-4 w-4 text-cyan-300" />
                </div>

                <div className="mt-4 space-y-2.5">
                  <label className="block">
                    <span className="sr-only">Your name</span>
                    <input
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/55 px-3.5 py-2.5 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </label>

                  <label className="block">
                    <span className="sr-only">Your email address</span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Your email address"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/55 px-3.5 py-2.5 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </label>

                  <label className="block">
                    <span className="sr-only">Your message</span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Describe your inquiry or opportunity..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/55 px-3.5 py-2.5 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/10"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={contactStatus.state === 'sending'}
                  className="group relative mt-3 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-widest text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(168,85,247,0.22)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]" />
                  <Send
                    className={`relative h-4 w-4 ${
                      contactStatus.state === 'sending' ? 'animate-pulse' : ''
                    }`}
                  />
                  <span className="relative">
                    {contactStatus.state === 'sending'
                      ? 'Sending...'
                      : contactStatus.state === 'success'
                        ? 'Message Sent'
                        : 'Send Message'}
                  </span>
                </button>

                <p
                  aria-live="polite"
                  className={`mt-2 text-center font-mono text-[8px] leading-relaxed ${
                    contactStatus.state === 'success'
                      ? 'text-emerald-300'
                      : contactStatus.state === 'error'
                        ? 'text-rose-300'
                        : 'text-slate-500'
                  }`}
                >
                  {contactStatus.message ||
                    'Your message is sent directly to Akshita without opening an email application.'}
                </p>
              </form>

              <div className="grid gap-2 sm:grid-cols-2">
                <a
                  href="https://github.com/AkshitaSarda"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel glass-panel-hover flex items-center justify-center gap-2 rounded-xl border-white/10 px-3 py-2.5 text-[11px] font-semibold text-slate-300 hover:text-cyan-300"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/akshita-maheshwari-42b577244"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Akshita Sarda's LinkedIn profile"
                  className="glass-panel glass-panel-hover flex items-center justify-center gap-2 rounded-xl border-white/10 px-3 py-2.5 text-[11px] font-semibold text-slate-300 hover:text-cyan-300"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>

                <a
                  href="tel:+919413586475"
                  className="glass-panel glass-panel-hover flex items-center justify-center gap-2 rounded-xl border-white/10 px-3 py-2.5 text-[11px] font-semibold text-slate-300 hover:text-purple-300"
                >
                  <Phone className="h-4 w-4" />
                  +91 94135 86475
                </a>

                <a
                  href="mailto:akshita2k2@gmail.com"
                  className="glass-panel glass-panel-hover flex items-center justify-center gap-2 rounded-xl border-white/10 px-3 py-2.5 text-[11px] font-semibold text-slate-300 hover:text-cyan-300"
                >
                  <Mail className="h-4 w-4" />
                  <span className="truncate">akshita2k2@gmail.com</span>
                </a>

                <div className="glass-panel flex items-center justify-center gap-2 rounded-xl border-white/10 px-3 py-2.5 text-[11px] font-semibold text-slate-400 sm:col-span-2">
                  <MapPin className="h-4 w-4 text-purple-300" />
                  SBI, Belapur · Navi Mumbai
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CHATBOT DISABLED TEMPORARILY
      <div id="ai-chatbot-dock" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen ? (
          <div className="glass-panel mb-4 flex h-[480px] w-[90vw] flex-col rounded-[32px] border-white/10 bg-white/5 shadow-2xl backdrop-blur-3xl sm:w-[380px]">
            <div className="flex items-center justify-between border-b border-white/5 p-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400" />
                <div>
                  <h4 className="text-xs font-bold text-white">Akshita AI Twin</h4>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500">
                    Powered by Gemini 3.5
                  </span>
                </div>
              </div>
              <button
                id="close-chat-btn"
                onClick={() => setIsChatOpen(false)}
                className="rounded-full p-1 text-neutral-400 hover:text-white focus:outline-hidden"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                      message.role === 'user'
                        ? 'rounded-l-2xl rounded-t-2xl border border-blue-500/20 bg-blue-600/20 text-white'
                        : 'rounded-r-2xl rounded-t-2xl border border-white/5 bg-white/5 text-neutral-300'
                    }`}
                  >
                    {message.content}
                  </div>
                  <span className="mt-1 font-mono text-[8px] text-neutral-500">{message.timestamp}</span>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-1 animate-[bounce_0.6s_infinite] rounded-full bg-blue-500" />
                      <div className="h-5 w-1 animate-[bounce_0.6s_infinite_0.1s] rounded-full bg-purple-500" />
                      <div className="h-4 w-1 animate-[bounce_0.6s_infinite_0.2s] rounded-full bg-pink-500" />
                      <div className="h-2 w-1 animate-[bounce_0.6s_infinite_0.3s] rounded-full bg-blue-400" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                      Consulting Twin Memory...
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <div className="flex gap-1.5 overflow-x-auto border-t border-white/5 p-2">
              {presetSuggestions.map((suggestion, index) => (
                <button
                  id={`suggestion-tag-${index}`}
                  key={suggestion}
                  onClick={() => handleSendMessage(suggestion)}
                  className="shrink-0 rounded-full border border-white/5 bg-white/5 px-2 py-1 text-[9px] text-neutral-400 transition hover:bg-white/10 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-white/5 p-3">
              <input
                id="chat-input"
                type="text"
                placeholder="Type to ask Akshita's Twin..."
                value={chatMessage}
                onChange={(event) => setChatMessage(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && handleSendMessage()}
                className="flex-1 rounded-full border border-white/10 bg-neutral-950 px-3 py-2 text-xs text-white outline-hidden transition focus:border-blue-500/50"
              />
              <button
                id="submit-chat-btn"
                onClick={() => handleSendMessage()}
                disabled={isChatLoading}
                className="flex items-center justify-center rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-500"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        ) : null}

        <button
          id="chat-launcher-btn"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-tr from-blue-500 to-purple-600 px-4 py-3 text-white shadow-2xl transition hover:scale-105 hover:from-blue-600 hover:to-purple-700 active:scale-95"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
            {isChatOpen ? 'MINIMIZE_AGENT' : 'INQUIRE_WITH_AI'}
          </span>
        </button>
      </div>
      */}

      <footer className="border-t border-white/5 bg-[#030307] px-4 py-10 text-center">
        <p className="mx-auto max-w-7xl font-mono text-[10px] tracking-wide text-neutral-400 sm:text-xs">
          Designed and engineered by Akshita Sarda © 2026. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
