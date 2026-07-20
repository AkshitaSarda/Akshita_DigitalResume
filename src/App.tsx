import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  Cloud,
  Cpu,
  Download,
  Layers,
  Sparkles,
  // MessageSquare, // Chatbot disabled temporarily
  // Send, // Chatbot disabled temporarily
  X,
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

interface Project {
  title: string;
  description: string;
  category: string;
  metrics: string;
  vibe: string;
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
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  /* CHATBOT DISABLED TEMPORARILY
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am Akshita's AI Twin. Ask me anything about her cloud infrastructure projects, frontend design philosophy, or her journey from junior developer to Lead Architect.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  */

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  const [tilts, setTilts] = useState<Record<number, { x: number; y: number }>>({});

  const milestones: Milestone[] = [
    {
      year: '2018 - 2020',
      title: 'Junior Full-Stack Developer',
      role: 'System Foundations',
      description:
        'Laid down core software engineering foundations. Focused on building high-performance TypeScript/React user interfaces backed by robust Node.js microservices.',
      achievements: [
        'Architected clean state engines using React context and Redux, reducing screen latency by 40%.',
        'Designed schema migrations for MySQL and MongoDB, ensuring robust data normalization.',
        'Created VisionOS-inspired layered interface templates with high functional modularity.',
      ],
      metrics: [
        { label: 'Bugs Crushed', value: '1,200+' },
        { label: 'Uptime Achieved', value: '99.9%' },
        { label: 'PRs Merged', value: '350+' },
      ],
      tags: ['React', 'TypeScript', 'Node.js', 'Express', 'SQL', 'Git'],
    },
    {
      year: '2020 - 2023',
      title: 'Senior Cloud Solutions Architect',
      role: 'High-Scale Orchestration',
      description:
        'Advanced into designing self-healing, automated cloud infrastructure. Championed massive GCP/AWS migrations and established scalable serverless deployment engines.',
      achievements: [
        'Spearheaded complete migration of a legacy logistics service to GCP GKE (Kubernetes), scaling to 5M+ active daily requests.',
        'Implemented Docker containerization and CI/CD pipelines with GitHub Actions, reducing delivery cycles by 60%.',
        'Optimized cloud spend through automated node-autoscaling rules, saving $85K+ annually.',
      ],
      metrics: [
        { label: 'Scale Handled', value: '5M req/day' },
        { label: 'Deployment Cost', value: '-35%' },
        { label: 'Serverless Functions', value: '120+' },
      ],
      tags: ['Docker', 'Kubernetes', 'GCP', 'AWS', 'Terraform', 'CI/CD', 'Prometheus'],
    },
    {
      year: '2023 - Present',
      title: 'Lead Creative Technologist & Spatial Developer',
      role: 'Spatial Intelligence & AI Systems',
      description:
        'Pioneering the intersection of AI modeling and fluid spatial computing layout. Designing highly tactile browser canvases and secure AI agents for global enterprises.',
      achievements: [
        'Crafted custom browser rendering canvases using WebGL and Canvas2D, simulating multi-dimensional spatial depth.',
        'Integrated secure, server-side Gemini 3.5 LLM endpoints, powering intelligent multi-agent business classifiers.',
        'Authored custom UI systems that map head-pose tracking vector arrays onto viewport scroll coordinates.',
      ],
      metrics: [
        { label: 'AI Pipeline speed', value: '180ms' },
        { label: 'WebGL Render Rate', value: '60 FPS' },
        { label: 'User Satisfaction', value: '98.7%' },
      ],
      tags: ['Gemini SDK', 'WebGL', 'Vite', 'Tailwind v4', 'Next.js', 'Agentic Workflows'],
    },
  ];

  const projects: Project[] = [
    {
      title: 'VisionOS Spatial Browser Simulator',
      description:
        'A gorgeous, high-performance browser interface that replicates spatial gaze, depth layers, and glassmorphism directly inside standard web viewports.',
      category: 'Spatial Computing',
      metrics: '60 FPS Render Rate',
      vibe: 'Glassmorphic Layering',
    },
    {
      title: 'Spatial Cloud Distributed Pipeline',
      description:
        'An automated multi-cloud data pipeline that handles parallel model-training workflows through layered visualization cards and real-time telemetry widgets.',
      category: 'Cloud & DevOps',
      metrics: '99.99% Availability',
      vibe: 'Layered Telemetry',
    },
    {
      title: 'Gemini-Powered Professional Clone',
      description:
        'A context-aware digital twin API proxy that uses system-prompt guidance to represent professional experience to visiting recruiters in real time.',
      category: 'Generative AI',
      metrics: '180ms Token Latency',
      vibe: 'Neural Intelligence',
    },
  ];

  /* CHATBOT DISABLED TEMPORARILY
  const presetSuggestions = [
    "Tell me about Akshita's Cloud architecture experience.",
    'What spatial computing projects has she built?',
    'How did she start her IT journey?',
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isChatLoading]);
  */

  useEffect(() => {
    if (!isProfileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsProfileOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProfileOpen]);

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

  const handleMouseMoveTilt = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTilts((previous) => ({
      ...previous,
      [index]: {
        x: (y / rect.height - 0.5) * -12,
        y: (x / rect.width - 0.5) * 12,
      },
    }));
  };

  const handleMouseLeaveTilt = (index: number) => {
    setTilts((previous) => ({
      ...previous,
      [index]: { x: 0, y: 0 },
    }));
  };

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

  const activeMilestone = milestones[currentMilestoneIdx];
  const milestoneProgress = (currentMilestoneIdx / (milestones.length - 1)) * 100;

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
        <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full border-white/10 bg-white/5 p-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3 pl-2 md:pl-4">
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              aria-label={isProfileOpen ? 'Hide Akshita Sarda profile picture' : 'Enlarge Akshita Sarda profile picture'}
              aria-haspopup="dialog"
              aria-expanded={isProfileOpen}
              aria-controls="profile-image-dialog"
              className="group relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-blue-400/50 bg-neutral-900 shadow-[0_0_18px_rgba(59,130,246,0.24)] transition duration-200 hover:scale-105 hover:border-purple-400/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030307]"
            >
              <img
                src="/Akshita_Profile_Thumb.webp"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
              />
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
            </button>
            <span className="text-sm font-semibold tracking-[0.25em] text-white">AKSHITA</span>
          </div>

          <a
            href="/Akshita_Sarda_Resume.pdf"
            download="Akshita_Sarda_Resume.pdf"
            aria-label="Download Akshita Sarda resume"
            className="mr-2 flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-200"
          >
            <Download className="h-3.5 w-3.5" />
            Download Resume
          </a>

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
          className="relative flex min-h-[430px] flex-col items-center justify-center gap-8 py-4 min-[1000px]:block"
        >
          {isProfileOpen ? (
            <div
              id="profile-image-dialog"
              role="dialog"
              aria-modal="false"
              aria-label="Enlarged profile picture of Akshita Sarda"
              className="relative z-20 w-[225px] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/15 bg-neutral-950/90 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl min-[1000px]:absolute min-[1000px]:left-0 min-[1000px]:top-3"
            >
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                aria-label="Close profile picture"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src="/Akshita_Profile.webp"
                alt="Akshita Sarda wearing a black blazer"
                className="block h-[300px] w-full rounded-[1.3rem] object-contain"
              />
            </div>
          ) : null}

          <div className="w-full max-w-3xl space-y-6 text-center min-[1000px]:mx-auto min-[1000px]:flex min-[1000px]:min-h-[400px] min-[1000px]:flex-col min-[1000px]:justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                SYS_ONLINE: ACTIVE ARCHITECT
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="shimmer-text text-4xl font-light tracking-tight md:text-6xl">Akshita</h1>
              <h2 className="text-xl font-medium tracking-wide text-blue-400 md:text-2xl">
                Lead Solutions Architect & Creative Technologist
              </h2>
            </div>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
              Designing next-generation cloud architectures and tactile spatial computer user interfaces. Leveraging
              heavy full-stack structures (TS/Node), cloud scalability models, and real-time generative intelligence to
              construct high-performance digital products.
            </p>

            <div className="mx-auto grid max-w-lg grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
              {[
                ['08+', 'Years IT Exp'],
                ['99.9%', 'Infrastructure Uptime'],
                ['14+', 'Enterprise Deploys'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="glass-panel rounded-3xl border-white/10 bg-white/[0.04] p-3 text-center backdrop-blur-xl"
                >
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="mt-1 text-[9px] uppercase tracking-widest text-neutral-500">{label}</div>
                </div>
              ))}
            </div>
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
                  Career Temporal Path
                </span>
              </div>
              <h2 className="mt-1 text-xl font-light md:text-2xl">Spatial Journey Thread</h2>
            </div>

            <div className="glass-panel flex items-center gap-6 rounded-xl p-3 font-mono text-xs">
              <div>
                <span className="block text-[9px] text-neutral-500">ACTIVE PHASE</span>
                <span className="text-lg font-bold text-blue-400">
                  {String(currentMilestoneIdx + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}
                </span>
              </div>
              <div className="h-8 w-px bg-neutral-800" />
              <div>
                <span className="block text-[9px] text-neutral-500">SPATIAL SYNC</span>
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
              className="absolute bottom-[23px] z-10 transition-all duration-1000 ease-out"
              style={{ left: `calc(${milestoneProgress}% - 50px)` }}
            >
              <div className="relative flex h-10 w-24 flex-col items-center justify-center">
                <div className="absolute bottom-0 h-2 w-16 animate-pulse rounded-full bg-blue-500/40 blur-xs" />
                <div className="flex h-6 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
                  <Sparkles className="h-3 w-3 animate-spin text-blue-400" />
                  <span className="ml-1 font-mono text-[8px] tracking-widest text-neutral-300">VISION_POD</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1 left-0 right-0 flex justify-between px-2 pointer-events-none md:px-8">
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
                      <Cpu className="h-3 w-3" />
                    ) : index === 1 ? (
                      <Cloud className="h-3 w-3" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
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
                  Key Engagements
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
                  Diagnostic Yields
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
                  System Libraries
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

        <section id="projects-section" className="space-y-8">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-400" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                Layered Spatial Windows
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-light md:text-3xl">Gaze-Response Project Deck</h2>
            <p className="mt-1 font-mono text-xs text-neutral-500">
              [Hover over cards below to experience 3D Spatial Gaze Tilt]
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.map((project, index) => {
              const tilt = tilts[index] || { x: 0, y: 0 };

              return (
                <div
                  key={project.title}
                  onMouseMove={(event) => handleMouseMoveTilt(index, event)}
                  onMouseLeave={() => handleMouseLeaveTilt(index)}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="glass-panel glass-panel-hover flex h-72 flex-col justify-between rounded-[36px] border-white/10 p-8 transform-gpu"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-400">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      VIBE: {project.vibe.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 py-4">
                    <h3 className="text-base font-bold text-white">{project.title}</h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-neutral-400">{project.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-neutral-800 pt-3">
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500">Diagnostic Yield</span>
                    <span className="font-mono text-xs font-bold text-purple-400">{project.metrics}</span>
                  </div>
                </div>
              );
            })}
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

      <footer className="border-t border-white/5 bg-[#030307] px-4 py-12 text-center">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-1 text-left">
            <span className="block font-mono text-xs uppercase tracking-widest text-white">
              AKSHITA / IT CAREER JOURNAL
            </span>
            <span className="block text-[10px] text-neutral-500">
              © {new Date().getFullYear()} Akshita. Inspired by VisionOS spatial computing guidelines.
            </span>
          </div>

          <div className="flex gap-4">
            <span className="font-mono text-[10px] uppercase text-neutral-500">SYS_STABLE: 100%</span>
            <span className="font-mono text-[10px] uppercase text-neutral-500">VITE_BUILD: OK</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
