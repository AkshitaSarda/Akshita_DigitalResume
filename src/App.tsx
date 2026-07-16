import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Cloud, 
  Terminal, 
  ChevronRight, 
  // Send, // Chatbot disabled temporarily 
  Upload, 
  Layers, 
  Zap, 
  Activity, 
  Shield, 
  Compass, 
  // MessageSquare, // Chatbot disabled temporarily
  // X, // Chatbot disabled temporarily
  Play,
  RotateCcw,
  Maximize2,
  FileText
} from 'lucide-react';

// Interfaces
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
  // Theme state: 'vision' (Apple Vision Pro) or 'cyber' (Tesla Cybertruck)
  const [theme, setTheme] = useState<'vision' | 'cyber'>('vision');
  
  // Interactive Simulator States
  const [currentMilestoneIdx, setCurrentMilestoneIdx] = useState<number>(0);
  const [cyberSpeed, setCyberSpeed] = useState<number>(0);
  const [autopilotState, setAutopilotState] = useState<'IDLE' | 'ACCELERATING' | 'CRUISING'>('IDLE');
  
  // Profile Image State (Persists in LocalStorage for great UX)
  const [profileImage, setProfileImage] = useState<string>('/src/assets/images/profile_avatar_1784208215310.jpg');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* CHATBOT DISABLED TEMPORARILY
  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am Akshita's AI Twin. Ask me anything about her cloud infrastructure projects, frontend design philosophy, or her journey from junior developer to Lead Architect.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  */

  // Canvas ref for interactive particle background
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });

  // 3D Parallax Tilt state for projects
  const [tilts, setTilts] = useState<{[key: number]: {x: number, y: number}}>({});

  // Career Milestone Database
  const milestones: Milestone[] = [
    {
      year: "2018 - 2020",
      title: "Junior Full-Stack Developer",
      role: "System Foundations",
      description: "Laid down core software engineering foundations. Focused on building high-performance TypeScript/React user interfaces backed by robust Node.js microservices.",
      achievements: [
        "Architected clean state engines using React context and Redux, reducing screen latency by 40%.",
        "Designed schema migrations for MySQL and MongoDB, ensuring robust data normalization.",
        "Created Cybertruck-inspired low-poly layout templates with high functional modularity."
      ],
      metrics: [
        { label: "Bugs Crushed", value: "1,200+" },
        { label: "Uptime Achieved", value: "99.9%" },
        { label: "PRs Merged", value: "350+" }
      ],
      tags: ["React", "TypeScript", "Node.js", "Express", "SQL", "Git"]
    },
    {
      year: "2020 - 2023",
      title: "Senior Cloud Solutions Architect",
      role: "High-Scale Orchestration",
      description: "Advanced into designing self-healing, automated cloud infrastructure. Championed massive GCP/AWS migrations and established scalable serverless deployment engines.",
      achievements: [
        "Spearheaded complete migration of a legacy logistics service to GCP GKE (Kubernetes), scaling to 5M+ active daily requests.",
        "Implemented Docker containerization and CI/CD pipelines with GitHub Actions, reducing delivery cycles by 60%.",
        "Optimized cloud spend through automated node-autoscaling rules, saving $85K+ annually."
      ],
      metrics: [
        { label: "Scale Handled", value: "5M req/day" },
        { label: "Deployment Cost", value: "-35%" },
        { label: "Serverless Functions", value: "120+" }
      ],
      tags: ["Docker", "Kubernetes", "GCP", "AWS", "Terraform", "CI/CD", "Prometheus"]
    },
    {
      year: "2023 - Present",
      title: "Lead Creative Technologist & Spatial Developer",
      role: "Spatial Intelligence & AI Systems",
      description: "Pioneering the intersection of AI modeling and fluid spatial computing layout. Designing highly tactile browser canvases and secure AI agents for global enterprises.",
      achievements: [
        "Crafted custom browser rendering canvases using WebGL and Canvas2D, simulating multi-dimensional spatial depth.",
        "Integrated secure, server-side Gemini 3.5 LLM endpoints, powering intelligent multi-agent business classifiers.",
        "Authored custom UI systems that map head-pose tracking vector arrays onto viewport scroll coordinates."
      ],
      metrics: [
        { label: "AI Pipeline speed", value: "180ms" },
        { label: "WebGL Render Rate", value: "60 FPS" },
        { label: "User Satisfaction", value: "98.7%" }
      ],
      tags: ["Gemini SDK", "WebGL", "Vite", "Tailwind v4", "Next.js", "Agentic Workflows"]
    }
  ];

  // Projects list
  const projects: Project[] = [
    {
      title: "VisionOS Spatial Browser Simulator",
      description: "A gorgeous, high-performance browser interface that replicates spatial gaze, depth layers, and glassmorphism directly inside standard web viewports.",
      category: "Spatial Computing",
      metrics: "60 FPS Render Rate",
      vibe: "Glassmorphic Layering"
    },
    {
      title: "Cyber-Grid Distributed Pipeline",
      description: "An automated multi-cloud data pipeline that handles parallel model training workflows, utilizing low-poly visualization cards and telemetry widgets.",
      category: "Cloud & Devops",
      metrics: "99.99% Availability",
      vibe: "Stainless Brutalism"
    },
    {
      title: "Gemini-Powered Professional Clone",
      description: "A context-aware digital twin API proxy that uses system-prompt guidance to represent professional experience to visiting recruiters in real-time.",
      category: "Generative AI",
      metrics: "180ms Token Latency",
      vibe: "Neural Intelligence"
    }
  ];

  /* CHATBOT DISABLED TEMPORARILY
  // Suggestion chips for Chat
  const presetSuggestions = [
    "Tell me about Akshita's Cloud architecture experience.",
    "What spatial computing projects has she built?",
    "How did she start her IT journey?"
  ];
  */

  // Load saved profile image on mount
  useEffect(() => {
    const savedImg = localStorage.getItem('akshita_profile_pic');
    if (savedImg) {
      setProfileImage(savedImg);
    }
  }, []);

  /* CHATBOT DISABLED TEMPORARILY
  // Scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isChatLoading]);
  */

  // Autopilot simulation logic (animates Cybertruck speed)
  useEffect(() => {
    if (autopilotState === 'ACCELERATING') {
      const interval = setInterval(() => {
        setCyberSpeed(prev => {
          if (prev >= 120) {
            setAutopilotState('CRUISING');
            clearInterval(interval);
            return 120;
          }
          return prev + 12;
        });
      }, 50);
      return () => clearInterval(interval);
    } else if (autopilotState === 'IDLE') {
      const interval = setInterval(() => {
        setCyberSpeed(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 15;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [autopilotState]);

  // Particle System Background Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      angle?: number;
      spin?: number;
    }> = [];

    // Setup dimensions via ResizeObserver (Optimal for frames and containers)
    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Set initial size
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    // Initialize Particles depending on active theme
    const initParticles = () => {
      particles = [];
      const count = theme === 'vision' ? 45 : 30;
      
      for (let i = 0; i < count; i++) {
        const size = theme === 'vision' 
          ? Math.random() * 6 + 2 
          : Math.random() * 3 + 1;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          speedX: (Math.random() - 0.5) * (theme === 'vision' ? 0.6 : 1.2),
          speedY: (Math.random() - 0.5) * (theme === 'vision' ? 0.6 : 1.2),
          color: theme === 'vision' 
            ? ['rgba(139, 92, 246, ', 'rgba(59, 130, 246, ', 'rgba(236, 72, 153, '][Math.floor(Math.random() * 3)]
            : '#ff3e3e',
          alpha: Math.random() * 0.4 + 0.1,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02
        });
      }
    };

    initParticles();

    // Mouse movement track
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (theme === 'vision') {
        // --- VISION MODE BACKGROUND ---
        // Radial deep glow centers
        const gradient1 = ctx.createRadialGradient(
          canvas.width * 0.25, canvas.height * 0.3, 50,
          canvas.width * 0.25, canvas.height * 0.3, 400
        );
        gradient1.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
        gradient1.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gradient2 = ctx.createRadialGradient(
          canvas.width * 0.75, canvas.height * 0.7, 50,
          canvas.width * 0.75, canvas.height * 0.7, 500
        );
        gradient2.addColorStop(0, 'rgba(168, 85, 247, 0.06)');
        gradient2.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render soft interactive orbs
        particles.forEach(p => {
          // Attract slightly to mouse
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }

          p.x += p.speedX;
          p.y += p.speedY;

          // Bounce edges
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color === 'rgba(59, 130, 246, ' ? '#3b82f6' : '#a855f7';
          ctx.fill();
        });
        ctx.shadowBlur = 0; // Reset
      } else {
        // --- CYBER MODE BACKGROUND ---
        // Render mechanical digital coordinates grid
        ctx.strokeStyle = 'rgba(255, 62, 62, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 60;
        
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Drifting red nodes & vector nets
        particles.forEach((p, idx) => {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

          // Draw node
          ctx.beginPath();
          ctx.rect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2); // Squared low-poly nodes
          ctx.fillStyle = `rgba(255, 62, 62, ${p.alpha * 1.8})`;
          ctx.fill();

          // Mouse coordinate readout lines
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(255, 62, 62, ${(1 - dist / 180) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        // Laser line scanner sweeping downward
        const time = Date.now() * 0.001;
        const scanY = (time * 120) % (canvas.height + 200) - 100;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(canvas.width, scanY);
        ctx.strokeStyle = 'rgba(255, 62, 62, 0.07)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas.parentElement) {
        resizeObserver.unobserve(canvas.parentElement);
      }
    };
  }, [theme]);

  // Handle Project interactive gaze/tilt
  const handleMouseMoveTilt = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt angle based on hover position (max 12 deg tilt)
    const tiltX = ((y / rect.height) - 0.5) * -12;
    const tiltY = ((x / rect.width) - 0.5) * 12;
    
    setTilts(prev => ({
      ...prev,
      [index]: { x: tiltX, y: tiltY }
    }));
  };

  const handleMouseLeaveTilt = (index: number) => {
    setTilts(prev => ({
      ...prev,
      [index]: { x: 0, y: 0 }
    }));
  };

  // Image Upload Mechanics (Supports click & Drag-and-Drop)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
          localStorage.setItem('akshita_profile_pic', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
          localStorage.setItem('akshita_profile_pic', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  /* CHATBOT DISABLED TEMPORARILY
  // Chat API call to Express Backend
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || chatMessage;
    if (!textToSend.trim() || isChatLoading) return;

    // Append user message immediately
    const userMsg: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    if (!customText) setChatMessage('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory.map(h => ({
            role: h.role,
            content: h.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Could not connect to AI Clone API');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: data.text || "I apologize, my communication system encountered a brief telemetry gap. Please ask again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        role: 'assistant',
        content: "⚠️ [SYSTEM OFFLINE] I couldn't reach Akshita's server proxy. Please verify the backend status or reload the session.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };
  */

  // Trigger milestone driving simulation
  const handleMilestoneSelect = (idx: number) => {
    setCurrentMilestoneIdx(idx);
    setAutopilotState('ACCELERATING');
    // Cruise for a short period then settle down
    setTimeout(() => {
      setAutopilotState('IDLE');
    }, 2400);
  };

  return (
    <div 
      id="root-container"
      ref={containerRef}
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
        theme === 'vision' 
          ? 'bg-[#030307] text-[#ebebfa]' 
          : 'bg-[#000000] text-[#e5e5e5]'
      }`}
    >
      {/* Background Interactive Particle Canvas */}
      <canvas 
        id="bg-canvas"
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Iridescent background glows for Vision Mode */}
      {theme === 'vision' && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[200px] -left-[100px] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-orb-1" />
          <div className="absolute top-[100px] right-[-100px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-orb-2" />
          <div className="absolute -bottom-[100px] left-[20%] w-[700px] h-[400px] bg-slate-500/10 rounded-full blur-[120px] animate-[spin_50s_linear_infinite]" />
        </div>
      )}

      {/* HEADER / NAVIGATION BAR */}
      <header 
        id="header-nav"
        className="sticky top-0 w-full z-50 px-4 py-3 md:px-8 transition-all duration-500"
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between p-2 rounded-full transition-all duration-500 ${
          theme === 'vision' 
            ? 'glass-panel backdrop-blur-md bg-white/5 border-white/10 shadow-lg' 
            : 'bg-neutral-950/90 border border-neutral-800'
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-3 pl-4">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-500 ${
              theme === 'vision' ? 'bg-gradient-to-tr from-blue-500 to-purple-600' : 'bg-red-600'
            }`}>
              {theme === 'vision' ? (
                <Compass className="h-4 w-4 text-white" />
              ) : (
                <Zap className="h-4 w-4 text-black font-extrabold" />
              )}
            </div>
            <span className={`text-sm tracking-[0.25em] font-semibold transition-colors duration-500 ${
              theme === 'vision' ? 'text-white' : 'text-neutral-200'
            }`}>
              AKSHITA
            </span>
          </div>

          {/* Dynamic Theme Mode Control */}
          <div className="flex items-center gap-1 bg-neutral-900/60 p-1 rounded-full border border-neutral-800">
            <button
              id="toggle-vision-btn"
              onClick={() => setTheme('vision')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-500 ${
                theme === 'vision'
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-md border border-blue-500/30'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Sparkles className="h-3 w-3" />
              Vision Pro
            </button>
            <button
              id="toggle-cyber-btn"
              onClick={() => setTheme('cyber')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-500 ${
                theme === 'cyber'
                  ? 'bg-neutral-800 text-[#ff3e3e] shadow-md border border-neutral-700'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Terminal className="h-3 w-3" />
              Cybertruck
            </button>
          </div>

          {/* CHATBOT DISABLED TEMPORARILY
          <div className="pr-4 hidden md:block">
            <button
              id="action-chat-btn"
              onClick={() => setIsChatOpen(true)}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full font-medium transition-all duration-500 ${
                theme === 'vision'
                  ? 'bg-white/10 hover:bg-white/20 border border-white/10 text-white'
                  : 'bg-transparent border border-[#ff3e3e] text-[#ff3e3e] hover:bg-[#ff3e3e]/10'
              }`}
            >
              Direct AI Inquiry
            </button>
          </div>
          */}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-24 relative z-10 grid grid-cols-1 gap-16">
        
        {/* HERO / PROFILE DISPLAY SECTION */}
        <section 
          id="hero-profile-section"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Interactive Avatar & Drag-Drop Upload */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerUpload}
              className={`relative cursor-pointer group transition-all duration-700 ${
                isDragging ? 'scale-105' : ''
              }`}
            >
              {/* Dynamic Theme Frame Styles */}
              {theme === 'vision' ? (
                // Apple Vision Pro Glowing Spherical Ring frame
                <div className="relative p-6 rounded-full">
                  {/* Rotating Gradient Ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/40 animate-[spin_40s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-pink-500/20 blur-md" />
                  <div className="absolute inset-3 rounded-full border-2 border-white/15 animate-[spin_25s_linear_infinite_reverse]" />
                  
                  {/* The Profile Portrait */}
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl backdrop-blur-sm">
                    <img 
                      id="profile-avatar-img-vision"
                      src={profileImage} 
                      alt="Akshita - Professional Profile Portrait" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      onError={() => {
                        // Fallback portrait in case of loading issues
                        setProfileImage('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400');
                      }}
                    />
                    
                    {/* Hover Upload Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Upload className="h-8 w-8 text-white mb-2 animate-bounce" />
                      <span className="text-[10px] tracking-widest text-white uppercase font-medium">Upload Professional Pic</span>
                      <span className="text-[8px] text-neutral-300 mt-1">Drag & Drop or Click</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Tesla Cybertruck Octagonal Industrial Frame with Laser headlamp
                <div className="relative p-3 bg-[#0a0a0a] border border-neutral-800 rounded-none shadow-2xl">
                  {/* Top LED Laser Light Line representing Cybertruck's signature lightbar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff3e3e] cyber-laser-glow" />
                  
                  {/* Corner brackets */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-neutral-500" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-neutral-500" />
                  
                  {/* Corner Telemetry details */}
                  <div className="absolute bottom-2 left-2 text-[8px] font-mono text-neutral-500 tracking-wider">
                    SPEC: CYBR-TRK / OPT_01
                  </div>
                  
                  {/* Octagonal Masked Container */}
                  <div className="w-56 h-56 md:w-64 md:h-64 overflow-hidden border border-neutral-700 bg-neutral-900">
                    <img 
                      id="profile-avatar-img-cyber"
                      src={profileImage} 
                      alt="Akshita - Cyber Telemetry Profile Portrait" 
                      className="w-full h-full object-cover grayscale brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={() => {
                        setProfileImage('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400');
                      }}
                    />

                    {/* Hover Upload Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Upload className="h-8 w-8 text-[#ff3e3e] mb-2 animate-pulse" />
                      <span className="text-[9px] font-mono tracking-widest text-[#ff3e3e] uppercase">UPDATE SYSTEM IMAGE</span>
                      <span className="text-[8px] text-neutral-400 font-mono mt-1">CLICK_TO_IMPORT.SYS</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Hidden file selector input */}
              <input 
                id="profile-file-input"
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </div>
            
            {/* Helpful upload prompt */}
            <span className="text-[10px] tracking-wider text-neutral-500 mt-3 font-mono">
              [Click or drop image file to change profile picture]
            </span>
          </div>

          {/* Right Column: Hero copy and main stats */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top label / status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-800">
              <span className={`h-2 w-2 rounded-full ${theme === 'vision' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-400">
                {theme === 'vision' ? 'SYS_ONLINE: ACTIVE ARCHITECT' : 'PILOT_MODE: MANUAL_OVERRIDE'}
              </span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-2">
              <h1 className={`text-4xl md:text-6xl tracking-tight transition-all duration-700 ${
                theme === 'vision' 
                  ? 'font-light shimmer-text' 
                  : 'font-extrabold uppercase tracking-wide text-neutral-100 font-mono'
              }`}>
                Akshita
              </h1>
              
              <h2 className={`text-xl md:text-2xl font-medium tracking-wide transition-colors duration-500 ${
                theme === 'vision' ? 'text-blue-400' : 'text-[#ff3e3e] font-mono uppercase'
              }`}>
                Lead Solutions Architect & Creative Technologist
              </h2>
            </div>

            {/* Bio paragraph */}
            <p className={`text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-500 ${
              theme === 'vision' ? 'text-neutral-400' : 'text-neutral-400 font-mono'
            }`}>
              Designing next-generation cloud architectures and tactile spatial computer user interfaces. Leveraging heavy full-stack structures (TS/Node), cloud scalability models, and real-time generative intelligence to construct high-performance digital products.
            </p>

            {/* Quick dashboard figures */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 pt-4">
              <div className={`p-3 text-center transition-all duration-500 ${
                theme === 'vision' ? 'glass-panel backdrop-blur-xl bg-white/[0.04] border-white/10 rounded-3xl' : 'bg-[#0a0a0a] border border-neutral-800'
              }`}>
                <div className={`text-xl font-bold ${theme === 'vision' ? 'text-white' : 'text-neutral-100 font-mono'}`}>08+</div>
                <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Years IT Exp</div>
              </div>
              <div className={`p-3 text-center transition-all duration-500 ${
                theme === 'vision' ? 'glass-panel backdrop-blur-xl bg-white/[0.04] border-white/10 rounded-3xl' : 'bg-[#0a0a0a] border border-neutral-800'
              }`}>
                <div className={`text-xl font-bold ${theme === 'vision' ? 'text-white' : 'text-neutral-100 font-mono'}`}>99.9%</div>
                <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Infrastructure Uptime</div>
              </div>
              <div className={`p-3 text-center transition-all duration-500 ${
                theme === 'vision' ? 'glass-panel backdrop-blur-xl bg-white/[0.04] border-white/10 rounded-3xl' : 'bg-[#0a0a0a] border border-neutral-800'
              }`}>
                <div className={`text-xl font-bold ${theme === 'vision' ? 'text-white' : 'text-neutral-100 font-mono'}`}>14+</div>
                <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Enterprise Deploys</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: AUTOPILOT CAREER DRIVER SIMULATOR (Cybertruck Highlight) */}
        <section 
          id="autopilot-simulator-section"
          className={`p-6 md:p-8 transition-all duration-1000 ${
            theme === 'vision' 
              ? 'glass-panel rounded-[40px] p-8 md:p-10 border-white/10 backdrop-blur-3xl shadow-2xl' 
              : 'bg-neutral-950 border border-neutral-800 relative'
          }`}
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Activity className={`h-4 w-4 ${theme === 'vision' ? 'text-purple-400' : 'text-[#ff3e3e]'}`} />
                <span className={`text-[10px] tracking-widest uppercase font-mono ${theme === 'vision' ? 'text-neutral-400' : 'text-[#ff3e3e]'}`}>
                  {theme === 'vision' ? 'Career Temporal Path' : 'INTERACTIVE CYBER AUTOMATION SIMULATOR'}
                </span>
              </div>
              <h2 className={`text-xl md:text-2xl mt-1 ${theme === 'vision' ? 'font-light' : 'font-black uppercase tracking-wider font-mono'}`}>
                {theme === 'vision' ? 'Spatial Journey Thread' : 'IT ROUTE AUTOMATION / AUTOPILOT'}
              </h2>
            </div>

            {/* Dashboard Telemetry Widget */}
            <div className={`p-3 flex items-center gap-6 text-xs font-mono transition-all duration-500 ${
              theme === 'vision' ? 'glass-panel rounded-xl' : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
            }`}>
              <div>
                <span className="text-[9px] text-neutral-500 block">CURRENT SPEED</span>
                <span className={`text-lg font-bold ${theme === 'vision' ? 'text-blue-400' : 'text-[#ff3e3e]'}`}>{cyberSpeed} MPH</span>
              </div>
              <div className="h-8 w-px bg-neutral-800" />
              <div>
                <span className="text-[9px] text-neutral-500 block">AI DIAGNOSTIC</span>
                <span className="text-lg font-bold text-emerald-400 uppercase">{autopilotState === 'IDLE' ? 'READY' : 'ENGAGED'}</span>
              </div>
            </div>
          </div>

          {/* SIMULATOR TRACK CANVAS */}
          <div className={`relative h-44 mb-8 rounded-xl overflow-hidden flex flex-col justify-end p-4 transition-all duration-500 ${
            theme === 'vision' ? 'bg-neutral-950/60 border border-white/5' : 'bg-[#050505] border border-neutral-800'
          }`}>
            {/* Drift lines in background */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-neutral-800/80 border-dashed border-t border-neutral-700/60" />
            
            {/* The Active Milestone glowing path */}
            <div 
              className="absolute bottom-6 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
              style={{ width: `${(currentMilestoneIdx / (milestones.length - 1)) * 100}%` }}
            />

            {/* THE CYBERTRUCK MODEL (Vector Custom SVG) */}
            <div 
              className="absolute bottom-[23px] transition-all duration-1000 ease-out z-10"
              style={{ 
                left: `calc(${(currentMilestoneIdx / (milestones.length - 1)) * 100}% - 50px)`,
                transform: `scale(${theme === 'vision' ? 0.8 : 1})`
              }}
            >
              {theme === 'vision' ? (
                // Futuristic Glowing Spatial Hover Pod
                <div className="w-24 h-10 flex flex-col items-center justify-center relative">
                  <div className="absolute bottom-0 w-16 h-2 bg-blue-500/40 rounded-full blur-xs animate-pulse" />
                  <div className="w-20 h-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="h-3 w-3 text-blue-400 animate-spin" />
                    <span className="text-[8px] font-mono tracking-widest text-neutral-300 ml-1">VISION_POD</span>
                  </div>
                </div>
              ) : (
                // Accurate 2D Octagonal CyberTruck Shape
                <svg className="w-28 h-10 overflow-visible" viewBox="0 0 120 40">
                  {/* Cyber Body */}
                  <polygon 
                    points="0,30 20,18 75,18 115,28 120,30 115,35 5,35" 
                    fill="#171717" 
                    stroke="#525252" 
                    strokeWidth="1.5" 
                  />
                  {/* Stainless Roof */}
                  <polyline 
                    points="20,18 45,6 75,18" 
                    fill="none" 
                    stroke="#737373" 
                    strokeWidth="1.5" 
                  />
                  {/* Glowing red tail light */}
                  <line x1="0" y1="30" x2="3" y2="30" stroke="#ff3e3e" strokeWidth="2.5" className="cyber-laser-glow" />
                  {/* Bright white LED Headlight */}
                  <line x1="117" y1="30" x2="120" y2="30" stroke="#60a5fa" strokeWidth="2.5" />
                  
                  {/* Spinning wheels */}
                  <circle cx="28" cy="33" r="6" fill="#0a0a0a" stroke="#404040" strokeWidth="2" />
                  <circle cx="28" cy="33" r="2" fill="#d4d4d4" className={autopilotState === 'ACCELERATING' ? 'animate-spin' : ''} />
                  
                  <circle cx="92" cy="33" r="6" fill="#0a0a0a" stroke="#404040" strokeWidth="2" />
                  <circle cx="92" cy="33" r="2" fill="#d4d4d4" className={autopilotState === 'ACCELERATING' ? 'animate-spin' : ''} />
                </svg>
              )}
            </div>

            {/* Milestones Node Buttons along the track */}
            <div className="absolute bottom-1 left-0 right-0 flex justify-between px-2 md:px-8 pointer-events-none">
              {milestones.map((ms, idx) => (
                <button
                  id={`milestone-node-${idx}`}
                  key={idx}
                  onClick={() => handleMilestoneSelect(idx)}
                  className="pointer-events-auto flex flex-col items-center group cursor-pointer focus:outline-hidden"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    idx === currentMilestoneIdx
                      ? theme === 'vision'
                        ? 'bg-gradient-to-tr from-blue-500 to-purple-600 text-white ring-4 ring-blue-500/20'
                        : 'bg-[#ff3e3e] text-black font-extrabold ring-4 ring-[#ff3e3e]/30'
                      : theme === 'vision'
                        ? 'bg-neutral-900 border border-white/10 text-neutral-500 group-hover:border-white/30'
                        : 'bg-neutral-900 border border-neutral-700 text-neutral-400 group-hover:border-neutral-500'
                  }`}>
                    {idx === 0 ? <Cpu className="h-3 w-3" /> : idx === 1 ? <Cloud className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                  </div>
                  <span className={`text-[10px] font-mono mt-1 font-semibold transition-colors duration-300 ${
                    idx === currentMilestoneIdx 
                      ? theme === 'vision' ? 'text-white' : 'text-[#ff3e3e]'
                      : 'text-neutral-500'
                  }`}>
                    {ms.year.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC TIMELINE BLOCK DETAIL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* Card Content Description */}
            <div className={`lg:col-span-8 p-6 transition-all duration-700 ${
              theme === 'vision' 
                ? 'backdrop-blur-2xl bg-white/[0.06] border border-white/10 rounded-3xl p-6 shadow-md' 
                : 'bg-neutral-900/60 border border-neutral-800'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className={`text-xl font-bold ${theme === 'vision' ? 'text-white' : 'text-neutral-100 font-mono uppercase'}`}>
                    {milestones[currentMilestoneIdx].title}
                  </h3>
                  <span className={`text-xs ${theme === 'vision' ? 'text-blue-400' : 'text-neutral-400 font-mono'}`}>
                    {milestones[currentMilestoneIdx].role}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                  theme === 'vision' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-[#ff3e3e] border border-red-500/20'
                }`}>
                  {milestones[currentMilestoneIdx].year}
                </span>
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${theme === 'vision' ? 'text-neutral-300' : 'text-neutral-300 font-mono'}`}>
                {milestones[currentMilestoneIdx].description}
              </p>

              {/* Achievements Checklist */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block">Key Engagements</span>
                {milestones[currentMilestoneIdx].achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${theme === 'vision' ? 'bg-purple-400' : 'bg-red-500'}`} />
                    <p className={`text-xs ${theme === 'vision' ? 'text-neutral-400' : 'text-neutral-400 font-mono'}`}>
                      {ach}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics & Technology Tags Sidecard */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Dynamic Metrics */}
              <div className={`p-4 flex-1 transition-all duration-700 ${
                theme === 'vision' 
                  ? 'backdrop-blur-2xl bg-white/[0.06] border border-white/10 rounded-3xl p-5' 
                  : 'bg-neutral-900/60 border border-neutral-800'
              }`}>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-3">Diagnostic Yields</span>
                <div className="space-y-4">
                  {milestones[currentMilestoneIdx].metrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className={`text-xs ${theme === 'vision' ? 'text-neutral-400' : 'text-neutral-400 font-mono'}`}>
                        {metric.label}
                      </span>
                      <span className={`text-sm font-bold ${theme === 'vision' ? 'text-white' : 'text-emerald-400 font-mono'}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Tag Cloud */}
              <div className={`p-4 flex-1 transition-all duration-700 ${
                theme === 'vision' 
                  ? 'backdrop-blur-2xl bg-white/[0.06] border border-white/10 rounded-3xl p-5' 
                  : 'bg-neutral-900/60 border border-neutral-800'
              }`}>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-3">System Libraries</span>
                <div className="flex flex-wrap gap-1.5">
                  {milestones[currentMilestoneIdx].tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`text-[9px] font-mono px-2.5 py-1 rounded-full ${
                        theme === 'vision' 
                          ? 'bg-white/5 text-neutral-300 border border-white/5' 
                          : 'bg-neutral-850 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PROJECTS PARALLAX STAGE (Apple Vision Gaze Highlight) */}
        <section id="projects-section" className="space-y-8">
          <div>
            <div className="flex items-center gap-2">
              <Layers className={`h-4 w-4 ${theme === 'vision' ? 'text-blue-400' : 'text-[#ff3e3e]'}`} />
              <span className={`text-[10px] tracking-widest uppercase font-mono ${theme === 'vision' ? 'text-neutral-400' : 'text-[#ff3e3e]'}`}>
                {theme === 'vision' ? 'Layered Spatial Windows' : 'SYSTEM ARCHITECT REGISTRY'}
              </span>
            </div>
            <h2 className={`text-2xl md:text-3xl mt-1 ${theme === 'vision' ? 'font-light' : 'font-black uppercase tracking-wider font-mono'}`}>
              {theme === 'vision' ? 'Gaze-Response Project Deck' : 'DEPLOYED_CORE_SERVICES.SYS'}
            </h2>
            <p className="text-xs text-neutral-500 font-mono mt-1">
              [Hover over cards below to experience 3D Spatial Gaze Tilt]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => {
              const tilt = tilts[idx] || { x: 0, y: 0 };
              return (
                <div
                  key={idx}
                  onMouseMove={(e) => handleMouseMoveTilt(idx, e)}
                  onMouseLeave={() => handleMouseLeaveTilt(idx)}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.15s ease-out'
                  }}
                  className={`p-6 flex flex-col justify-between h-72 transition-all duration-500 transform-gpu ${
                    theme === 'vision'
                      ? 'glass-panel glass-panel-hover rounded-[36px] p-8 border-white/10'
                      : 'cyber-panel rounded-none'
                  }`}
                >
                  {/* Top line */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      theme === 'vision' ? 'bg-blue-500/10 text-blue-400' : 'bg-neutral-800 text-[#ff3e3e] border border-neutral-700'
                    }`}>
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      VIBE: {proj.vibe.toUpperCase()}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 py-4">
                    <h3 className={`text-base font-bold ${theme === 'vision' ? 'text-white' : 'text-neutral-100 font-mono uppercase'}`}>
                      {proj.title}
                    </h3>
                    <p className={`text-xs line-clamp-3 leading-relaxed ${theme === 'vision' ? 'text-neutral-400' : 'text-neutral-400 font-mono'}`}>
                      {proj.description}
                    </p>
                  </div>

                  {/* Metrics footer */}
                  <div className="border-t border-neutral-800 pt-3 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500">DIAGNOSTIC YIELD</span>
                    <span className={`text-xs font-mono font-bold ${theme === 'vision' ? 'text-purple-400' : 'text-emerald-400'}`}>
                      {proj.metrics}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* CHATBOT DISABLED TEMPORARILY
      
      <div 
        id="ai-chatbot-dock"
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      >
        
        {isChatOpen ? (
          <div className={`w-[90vw] sm:w-[380px] h-[480px] flex flex-col mb-4 transition-all duration-500 shadow-2xl ${
            theme === 'vision'
              ? 'glass-panel backdrop-blur-3xl bg-white/5 border-white/10 rounded-[32px]'
              : 'bg-black border border-neutral-800 rounded-none'
          }`}>
            
            <div className={`p-4 flex items-center justify-between border-b ${
              theme === 'vision' ? 'border-white/5' : 'border-neutral-800'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${theme === 'vision' ? 'bg-blue-400 animate-pulse' : 'bg-[#ff3e3e]'}`} />
                <div>
                  <h4 className={`text-xs font-bold ${theme === 'vision' ? 'text-white' : 'text-neutral-200 font-mono uppercase'}`}>
                    Akshita AI Twin
                  </h4>
                  <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">Powered by Gemini 3.5</span>
                </div>
              </div>
              <button
                id="close-chat-btn"
                onClick={() => setIsChatOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-full focus:outline-hidden"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? theme === 'vision'
                        ? 'bg-blue-600/20 text-white border border-blue-500/20 rounded-t-2xl rounded-l-2xl'
                        : 'bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-none font-mono'
                      : theme === 'vision'
                        ? 'bg-white/5 text-neutral-300 border border-white/5 rounded-t-2xl rounded-r-2xl'
                        : 'bg-neutral-950 text-neutral-400 border border-neutral-850 rounded-none font-mono'
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[8px] text-neutral-500 mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              
              
              {isChatLoading && (
                <div className="flex flex-col items-start gap-2">
                  <div className={`p-3 rounded-xl flex items-center gap-3 ${
                    theme === 'vision' ? 'bg-white/5 border border-white/5' : 'bg-neutral-900/40 border border-neutral-800'
                  }`}>
                    
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-blue-500 rounded-full animate-[bounce_0.6s_infinite]" />
                      <div className="w-1 h-5 bg-purple-500 rounded-full animate-[bounce_0.6s_infinite_0.1s]" />
                      <div className="w-1 h-4 bg-pink-500 rounded-full animate-[bounce_0.6s_infinite_0.2s]" />
                      <div className="w-1 h-2 bg-blue-400 rounded-full animate-[bounce_0.6s_infinite_0.3s]" />
                    </div>
                    <span className="text-[9px] text-neutral-400 font-mono tracking-widest uppercase">Consulting Twin Memory...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            
            <div className={`p-2 border-t flex gap-1.5 overflow-x-auto ${
              theme === 'vision' ? 'border-white/5' : 'border-neutral-800'
            }`}>
              {presetSuggestions.map((sug, idx) => (
                <button
                  id={`suggestion-tag-${idx}`}
                  key={idx}
                  onClick={() => handleSendMessage(sug)}
                  className={`shrink-0 text-[9px] px-2 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                    theme === 'vision'
                      ? 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
                      : 'bg-neutral-950 text-neutral-500 hover:text-[#ff3e3e] border border-neutral-850 font-mono'
                  }`}
                >
                  {sug}
                </button>
              ))}
            </div>

            
            <div className={`p-3 border-t flex items-center gap-2 ${
              theme === 'vision' ? 'border-white/5' : 'border-neutral-800'
            }`}>
              <input
                id="chat-input"
                type="text"
                placeholder={theme === 'vision' ? "Type to ask Akshita's Twin..." : "QUERY_PROMPT.SYS"}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className={`flex-1 text-xs px-3 py-2 bg-neutral-950 outline-hidden border transition-colors duration-500 ${
                  theme === 'vision'
                    ? 'border-white/10 text-white rounded-full focus:border-blue-500/50'
                    : 'border-neutral-800 text-neutral-200 rounded-none focus:border-[#ff3e3e] font-mono'
                }`}
              />
              <button
                id="submit-chat-btn"
                onClick={() => handleSendMessage()}
                disabled={isChatLoading}
                className={`p-2 flex items-center justify-center transition-all duration-500 cursor-pointer ${
                  theme === 'vision'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white rounded-full'
                    : 'bg-neutral-900 border border-neutral-700 text-[#ff3e3e] hover:bg-[#ff3e3e]/10 rounded-none'
                }`}
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        ) : null}

        
        <button
          id="chat-launcher-btn"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`flex items-center gap-2 px-4 py-3 shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer ${
            theme === 'vision'
              ? 'bg-gradient-to-tr from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full border border-white/20'
              : 'bg-neutral-950 border-2 border-[#ff3e3e] text-[#ff3e3e] rounded-none'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-[10px] tracking-wider uppercase font-mono font-bold">
            {isChatOpen ? 'MINIMIZE_AGENT' : 'INQUIRE_WITH_AI'}
          </span>
        </button>
      </div>
      */}

      {/* FOOTER */}
      <footer className={`border-t py-12 px-4 text-center transition-colors duration-1000 ${
        theme === 'vision' ? 'border-white/5 bg-[#030307]' : 'border-neutral-800 bg-[#000000]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <span className={`text-xs uppercase tracking-widest font-mono block ${theme === 'vision' ? 'text-white' : 'text-[#ff3e3e]'}`}>
              AKSHITA / IT CAREER JOURNAL
            </span>
            <span className="text-[10px] text-neutral-500 block">
              © {new Date().getFullYear()} Akshita. Inspired by VisionOS Spatial computing guidelines & Cybertruck steel aesthetics.
            </span>
          </div>
          
          <div className="flex gap-4">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">SYS_STABLE: 100%</span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">VITE_BUILD: OK</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
