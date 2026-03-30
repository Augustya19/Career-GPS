import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  X, 
  ChevronRight, 
  Target, 
  Zap, 
  Clock, 
  Map, 
  BarChart3, 
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  Upload,
  Sparkles,
  TrendingUp,
  Layers,
  BrainCircuit,
  ChevronDown,
  ExternalLink,
  Loader2,
  User,
  FileText,
  History,
  BookOpen,
  Sun,
  Moon
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { GoogleGenAI, Type } from "@google/genai";
import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import mammoth from 'mammoth';
import { ROLES, ALL_SKILLS } from './data';
import { CareerRole, SimulationResult, UserProfile } from './types';
import { cn } from './lib/utils';

// Set worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function App() {
  const [view, setView] = useState<'landing' | 'simulator'>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen bg-bg text-ink font-sans antialiased selection:bg-accent selection:text-white overflow-x-hidden transition-colors duration-300">
      <ThemeToggle theme={theme} toggle={toggleTheme} />
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/5 to-transparent" />
      </div>
      <div className="scanline" />
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <LandingPage onStart={() => setView('simulator')} theme={theme} />
        ) : (
          <SimulatorPage theme={theme} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ThemeToggle({ theme, toggle }: { theme: 'light' | 'dark', toggle: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full glass-panel hover:bg-accent/10 transition-all border-ink/10 flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
      ) : (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
      )}
    </motion.button>
  );
}

function LandingPage({ onStart, theme }: { onStart: () => void, theme: 'light' | 'dark' }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col pt-20 sm:pt-48 pb-20 items-center px-6 sm:px-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-accent/10 rounded-full blur-[80px] sm:blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-1/4 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-secondary/10 rounded-full blur-[80px] sm:blur-[120px]"
        />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 sm:space-y-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className="h-[1px] w-8 sm:w-12 bg-accent/30" />
              <span className="status-label text-accent glow-accent text-[8px] sm:text-[10px]">Neural Pathfinding Protocol v4.0</span>
              <div className="h-[1px] w-8 sm:w-12 bg-accent/30" />
            </div>
            <h1 className="heading-display text-4xl sm:text-7xl md:text-9xl tracking-tighter">
              CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">GPS</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl px-4"
          >
            <p className="text-lg md:text-2xl text-ink/80 font-light leading-relaxed">
              An advanced tactical engine designed to simulate professional trajectories and bridge the delta between your current state and target destination.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full md:w-auto px-4"
          >
            <button 
              onClick={onStart} 
              className="btn-tactical group flex items-center justify-center gap-4 w-full sm:min-w-[280px]"
            >
              INITIALIZE SESSION
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="glass-panel px-6 sm:px-8 py-4 flex items-center justify-center gap-4 border-ink/10">
              <div className="w-2 h-2 bg-secondary animate-pulse rounded-full shadow-[0_0_10px_#a34b32]" />
              <span className="status-label text-[10px] sm:text-xs">Simulation Engine: Online</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-20 sm:mt-32 px-4"
        >
          {[
            { icon: BrainCircuit, title: "Neural Analysis", desc: "Deep-learning gap analysis of your professional profile." },
            { icon: Map, title: "Tactical Roadmap", desc: "Step-by-step strategic pathing to your target role." },
            { icon: TrendingUp, title: "Outcome Prediction", desc: "Simulate match scores and transition complexity." }
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-6 sm:p-8 group hover:border-accent/30 transition-all">
              <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer Meta */}
      <div className="hidden sm:flex absolute bottom-8 left-8 right-8 justify-between items-end pointer-events-none opacity-40">
        <div className="status-label space-y-1">
          <div>LOC: GLOBAL_CLUSTER_01</div>
          <div>NET: ENCRYPTED_STREAM</div>
        </div>
        <div className="status-label text-right space-y-1">
          <div>© 2026 VOID_LABS</div>
          <div>TERM: ACTIVE_SESSION</div>
        </div>
      </div>
    </motion.div>
  );
}

function SimulatorPage({ theme }: { theme: 'light' | 'dark' }) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    skills: [],
    experienceYears: 0,
    summary: '',
    recentRoles: [],
    education: []
  });
  const [aiSuggestedSkills, setAiSuggestedSkills] = useState<string[]>([]);
  const [targetRoleTitle, setTargetRoleTitle] = useState<string>(ROLES[0].title);
  const [customRoleData, setCustomRoleData] = useState<CareerRole | null>(null);
  const [isGeneratingRole, setIsGeneratingRole] = useState(false);
  const [isImportingResume, setIsImportingResume] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const userSkills = userProfile.skills;
  const experience = userProfile.experienceYears;

  const setUserSkills = (skills: string[]) => {
    setUserProfile(prev => ({ ...prev, skills }));
  };

  const setExperience = (experienceYears: number) => {
    setUserProfile(prev => ({ ...prev, experienceYears }));
  };

  const targetRole = useMemo(() => {
    if (isGeneratingRole) {
      return {
        id: 'generating',
        title: targetRoleTitle,
        description: 'Generating detailed role requirements using AI...',
        requiredSkills: [],
        roadmap: [],
        clusters: []
      } as CareerRole;
    }
    const found = ROLES.find(r => r.title.toLowerCase() === targetRoleTitle.toLowerCase());
    return found || customRoleData || ROLES[0];
  }, [targetRoleTitle, customRoleData, isGeneratingRole]);

  const generateRoleData = async (title: string) => {
    if (ROLES.find(r => r.title.toLowerCase() === title.toLowerCase())) return;
    
    setIsGeneratingRole(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a career role definition for "${title}" in JSON format. 
        Include: 
        - description (string): A detailed overview of the role and its impact.
        - requiredSkills (array of objects with name, importance: 'Critical'|'High'|'Medium', timeToLearn: string): A comprehensive list of hard and soft skills.
        - clusters (array of objects with name, skills: array of strings): Group related skills into logical domains (e.g., "Technical Stack", "Leadership", "Domain Knowledge").
        - roadmap (array of 4 phases with phase, duration, tasks: array of strings, resources: array of strings): A strategic step-by-step guide to mastering this role.
        Make it professional, realistic, and highly detailed.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              requiredSkills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    importance: { type: Type.STRING, enum: ['Critical', 'High', 'Medium'] },
                    timeToLearn: { type: Type.STRING }
                  },
                  required: ['name', 'importance', 'timeToLearn']
                }
              },
              clusters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['name', 'skills']
                }
              },
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    resources: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['phase', 'duration', 'tasks']
                }
              }
            },
            required: ['description', 'requiredSkills', 'clusters', 'roadmap']
          }
        }
      });

      const data = JSON.parse(response.text);
      setCustomRoleData({
        id: `custom-${Date.now()}`,
        title,
        ...data
      });
    } catch (error) {
      console.error("Error generating role data:", error);
    } finally {
      setIsGeneratingRole(false);
    }
  };

  const suggestedSkills = useMemo(() => {
    const userSkillsLower = userSkills.map(s => s.toLowerCase());
    if (skillInput.trim()) {
      return ALL_SKILLS.filter(s => 
        s.toLowerCase().includes(skillInput.toLowerCase()) && 
        !userSkillsLower.includes(s.toLowerCase())
      );
    } else {
      return targetRole.requiredSkills.map(s => s.name).filter(s => 
        !userSkillsLower.includes(s.toLowerCase())
      );
    }
  }, [skillInput, userSkills, targetRole]);

  const runSimulation = async () => {
    setIsSimulating(true);
    setResult(null);
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Perform a comprehensive career gap analysis.
        
        User Profile:
        - Current Skills: ${userProfile.skills.join(', ')}
        - Experience Level: ${userProfile.experienceYears} years
        - Professional Summary: ${userProfile.summary || 'Not provided'}
        - Recent Roles: ${userProfile.recentRoles?.join(', ') || 'Not provided'}
        - Education: ${userProfile.education?.join(', ') || 'Not provided'}
        
        Target Destination:
        - Role: ${targetRole.title}
        - Description: ${targetRole.description}
        - Core Requirements: ${targetRole.requiredSkills.map(s => s.name).join(', ')}
        
        Task:
        1. Match Score: Calculate a realistic match percentage (0-100) considering skill overlaps, transferable skills, domain expertise, and total experience. Be generous with transferable skills (e.g., if they know Java, they can learn C# quickly).
        2. Skill Analysis: For each core requirement of the target role, determine if the user has it (current: 100) or lacks it (current: 0). Be smart about synonyms and inferred capabilities based on their summary and recent roles.
        3. Missing Skills: Identify the most critical gaps. For each, provide the name, importance (Critical/High/Medium), and a realistic timeToLearn (e.g., "2-3 Weeks").
        4. Insights: Provide 3-4 professional, data-driven insights about this transition, considering the user's background, education, and potential "hidden" strengths.
        5. Time Estimate: Provide a total time range for this transition (e.g., "3-5 Months").
        
        Return ONLY a JSON object matching this schema:
        {
          "matchScore": number,
          "difficulty": "Easy" | "Medium" | "Hard",
          "missingSkills": [{ "name": string, "importance": string, "timeToLearn": string }],
          "timeEstimate": string,
          "chartData": [{ "name": string, "current": number, "required": number }],
          "insights": string[],
          "timeBreakdown": [{ "name": string, "value": number }]
        }`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchScore: { type: Type.NUMBER },
              difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] },
              missingSkills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    importance: { type: Type.STRING },
                    timeToLearn: { type: Type.STRING }
                  },
                  required: ['name', 'importance', 'timeToLearn']
                }
              },
              timeEstimate: { type: Type.STRING },
              chartData: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    current: { type: Type.NUMBER },
                    required: { type: Type.NUMBER }
                  },
                  required: ['name', 'current', 'required']
                }
              },
              insights: { type: Type.ARRAY, items: { type: Type.STRING } },
              timeBreakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                  },
                  required: ['name', 'value']
                }
              }
            },
            required: ['matchScore', 'difficulty', 'missingSkills', 'timeEstimate', 'chartData', 'insights', 'timeBreakdown']
          }
        }
      });

      const data = JSON.parse(response.text);
      setResult({
        ...data,
        roadmap: targetRole.roadmap
      });
    } catch (error) {
      console.error("Simulation error:", error);
      // Simple fallback logic if AI fails
      const required = targetRole.requiredSkills;
      const userSkillsLower = userSkills.map(s => s.toLowerCase());
      const matched = required.filter(s => userSkillsLower.includes(s.name.toLowerCase()));
      const missing = required.filter(s => !userSkillsLower.includes(s.name.toLowerCase()));
      const matchScore = Math.round((matched.length / required.length) * 100);
      
      setResult({
        matchScore,
        difficulty: matchScore > 70 ? 'Easy' : matchScore > 40 ? 'Medium' : 'Hard',
        missingSkills: missing,
        timeEstimate: `${missing.length + 1}-${missing.length + 3} Months`,
        roadmap: targetRole.roadmap,
        chartData: required.map(s => ({ name: s.name, current: userSkillsLower.includes(s.name.toLowerCase()) ? 100 : 0, required: 100 })),
        insights: ["AI analysis failed. Showing basic comparison."],
        timeBreakdown: [{ name: 'Learning', value: 70 }, { name: 'Practice', value: 30 }]
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImportingResume(true);
    try {
      let text = '';
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          fullText += strings.join(' ') + '\n';
        }
        text = fullText;
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        text = await file.text();
      }

      if (!text.trim()) {
        throw new Error("No text content found in resume.");
      }

      // Use Gemini to extract skills with a more comprehensive prompt
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following resume text and perform a deep extraction of all professional attributes.
        
        Extract:
        1. Skills: Hard skills, soft skills, domain expertise, methodologies, tools, and inferred skills.
        2. Experience Years: Total years of professional experience.
        3. Summary: A brief professional summary (2-3 sentences).
        4. Recent Roles: List of most recent job titles.
        5. Education: List of degrees and institutions.
        
        Be exhaustive but precise. Consider all aspects of the resume including achievements and responsibilities to infer skills.
        
        Resume Text: ${text.substring(0, 15000)}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              experienceYears: { type: Type.NUMBER },
              summary: { type: Type.STRING },
              recentRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
              education: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['skills', 'experienceYears', 'summary', 'recentRoles', 'education']
          }
        }
      });

      const profileData = JSON.parse(response.text);
      setUserProfile(profileData);
    } catch (error) {
      console.error("Error importing resume:", error);
      alert("Failed to import resume. Please ensure it's a valid PDF or text file.");
    } finally {
      setIsImportingResume(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const suggestAISkills = async () => {
    if (isSuggestingSkills) return;
    setIsSuggestingSkills(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the user's full professional profile and the target role to suggest 10 additional relevant skills.
        
        User Profile:
        - Current Skills: ${userProfile.skills.join(', ')}
        - Experience Level: ${userProfile.experienceYears} years
        - Professional Summary: ${userProfile.summary || 'Not provided'}
        - Recent Roles: ${userProfile.recentRoles?.join(', ') || 'Not provided'}
        - Education: ${userProfile.education?.join(', ') || 'Not provided'}
        
        Target Role: ${targetRole.title}
        Role Description: ${targetRole.description}
        
        Consider:
        1. Adjacent skills: Skills that are often paired with their current skills.
        2. Transferable skills: Skills from their previous roles or education that are valuable for the target role.
        3. Emerging skills: New technologies or methodologies relevant to the target role.
        4. Soft skills: Leadership, communication, or problem-solving skills inferred from their summary and roles.
        
        Return ONLY a JSON array of strings.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      const suggested = JSON.parse(response.text);
      if (Array.isArray(suggested)) {
        const uniqueNew = suggested.filter(s => !userSkills.some(existing => existing.toLowerCase() === s.toLowerCase()));
        setAiSuggestedSkills(uniqueNew.slice(0, 8));
      }
    } catch (error) {
      console.error("Error suggesting skills:", error);
    } finally {
      setIsSuggestingSkills(false);
    }
  };

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (!s) return;
    const exists = userSkills.some(existing => existing.toLowerCase() === s.toLowerCase());
    if (!exists) {
      const canonicalSkill = ALL_SKILLS.find(as => as.toLowerCase() === s.toLowerCase()) || s;
      setUserSkills([...userSkills, canonicalSkill]);
      setSkillInput('');
      if (result) runSimulation(); // Auto-update if result exists
    }
  };

  const removeSkill = (skill: string) => {
    setUserSkills(userSkills.filter(s => s !== skill));
    if (result) runSimulation();
  };

  return (
    <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16 border-b border-ink/10 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#5a5a40]" />
            <span className="status-label text-accent glow-accent text-[10px] sm:text-xs">Active Session: Pathfinding_Alpha_01</span>
          </div>
          <h2 className="heading-display text-2xl sm:text-5xl md:text-6xl tracking-tighter">
            SIMULATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">DASHBOARD</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-panel px-6 py-3 border-ink/10">
            <div className="status-label mb-1">System Load</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-1 w-4 ${i < 4 ? 'bg-accent' : 'bg-ink/10'}`} />
              ))}
            </div>
          </div>
          {userProfile.summary && (
            <button 
              onClick={() => setUserProfile({ skills: [], experienceYears: 0, summary: '', recentRoles: [], education: [] })}
              className="btn-tactical-outline !px-4 !py-2 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
            >
              TERMINATE SESSION
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Input Engine (Sticky) */}
        <div className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-12">
          <div className="glass-panel p-5 sm:p-8 space-y-8 sm:space-y-10 border-ink/10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="terminal-text text-lg font-bold flex items-center gap-3">
                  <User className="w-5 h-5 text-accent" />
                  IDENTITY_PROFILE
                </h3>
                <div className="status-label text-[8px]">v2.6.4</div>
              </div>
              
              <div className="space-y-4">
                <label className="status-label block">Resume Data Import</label>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImportingResume}
                  className="w-full btn-tactical-outline flex items-center justify-center gap-3 group"
                >
                  {isImportingResume ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  )}
                  {isImportingResume ? 'PARSING_DATA...' : 'UPLOAD_RESUME'}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleResumeUpload}
                  className="hidden" 
                  accept=".pdf,.txt,.doc,.docx"
                />
              </div>

              <div className="space-y-4">
                <label className="status-label block">Target Destination</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={roleInput}
                    onChange={(e) => {
                      setRoleInput(e.target.value);
                      setShowRoleSuggestions(true);
                    }}
                    onFocus={() => setShowRoleSuggestions(true)}
                    placeholder="Enter target role title..."
                    className="w-full tactical-input pr-12"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  
                  <AnimatePresence>
                    {showRoleSuggestions && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-50 left-0 right-0 mt-2 glass-panel border-ink/10 max-h-64 overflow-y-auto"
                      >
                        {ROLES.filter(r => r.title.toLowerCase().includes(roleInput.toLowerCase())).map((role) => (
                          <button
                            key={role.id}
                            onClick={() => {
                              setTargetRoleTitle(role.title);
                              setRoleInput(role.title);
                              setShowRoleSuggestions(false);
                            }}
                            className="w-full text-left px-6 py-4 hover:bg-accent/10 transition-colors border-b border-slate-100 last:border-0"
                          >
                            <div className="font-mono text-sm font-bold">{role.title}</div>
                            <div className="status-label text-[8px] mt-1">{role.description.substring(0, 60)}...</div>
                          </button>
                        ))}
                        {roleInput && !ROLES.find(r => r.title.toLowerCase() === roleInput.toLowerCase()) && (
                          <button
                            onClick={() => {
                              setTargetRoleTitle(roleInput);
                              generateRoleData(roleInput);
                              setShowRoleSuggestions(false);
                            }}
                            className="w-full text-left px-6 py-4 hover:bg-secondary/10 transition-colors text-secondary"
                          >
                            <div className="font-mono text-sm font-bold flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              GENERATE_ROLE_DATA: "{roleInput}"
                            </div>
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="status-label text-[10px] text-muted">Suggested Skills</label>
                  <div className="flex flex-wrap gap-2.5">
                    {['Python', 'React', 'SQL', 'Figma', 'AWS', 'Docker', 'Agile', 'TypeScript'].map(skill => (
                      <button
                        key={skill}
                        onClick={() => addSkill(skill)}
                        disabled={userSkills.includes(skill)}
                        className="px-3 py-1.5 border border-ink/10 text-[10px] font-mono text-muted hover:text-accent hover:border-accent/30 transition-colors disabled:opacity-30 bg-surface/50"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill(skillInput)}
                    placeholder="Add skill manually..."
                    className="w-full tactical-input pr-12"
                  />
                  <Plus className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted cursor-pointer hover:text-accent transition-colors" onClick={() => addSkill(skillInput)} />
                </div>

                {/* Selected Skills Matrix (Moved here) */}
                {userSkills.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="status-label text-[10px]">Active Units</label>
                      <span className="status-label text-accent text-[10px]">{userSkills.length} Units</span>
                    </div>
                    <div className="flex flex-wrap gap-2 p-4 bg-bg/50 border border-ink/10 rounded-sm shadow-inner max-h-[250px] overflow-y-auto">
                      <AnimatePresence mode="popLayout">
                        {userSkills.map((skill) => (
                          <motion.span 
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            key={skill} 
                            className="px-3 py-1.5 bg-accent/10 border border-accent/30 text-accent text-[10px] font-mono flex items-center gap-2 group hover:bg-accent/20 transition-all"
                          >
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="hover:text-white transition-colors">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="status-label">Experience Delta</label>
                  <span className="status-label text-secondary">{experience} Years</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={experience} 
                  onChange={(e) => setExperience(parseInt(e.target.value))}
                  className="w-full accent-secondary bg-ink/10 h-1 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>

            <button 
              onClick={runSimulation}
              disabled={isSimulating || userSkills.length === 0}
              className="w-full btn-tactical flex items-center justify-center gap-4 group shadow-[0_0_20px_rgba(90,90,64,0.2)]"
            >
              {isSimulating ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Zap className="w-6 h-6 group-hover:scale-125 transition-transform" />
              )}
              {isSimulating ? 'SIMULATING_TRAJECTORY...' : 'EXECUTE_SIMULATION'}
            </button>
          </div>

          {/* AI Suggestions Panel */}
          <div className="glass-panel p-8 border-secondary/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="terminal-text text-sm font-bold flex items-center gap-3 text-secondary">
                <Sparkles className="w-4 h-4" />
                NEURAL_SUGGESTIONS
              </h3>
              <button 
                onClick={suggestAISkills}
                disabled={isSuggestingSkills}
                className="status-label hover:text-secondary transition-colors disabled:opacity-50"
              >
                {isSuggestingSkills ? 'ANALYZING...' : 'REFRESH'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aiSuggestedSkills.length > 0 ? (
                aiSuggestedSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => addSkill(skill)}
                    className="text-left p-3 bg-secondary/5 border border-secondary/10 hover:border-secondary/40 transition-all group"
                  >
                    <div className="text-[10px] font-mono text-secondary/60 group-hover:text-secondary truncate">{skill}</div>
                    <div className="status-label text-[8px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">ADD_TO_MATRIX</div>
                  </button>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 border border-dashed border-ink/10 rounded-sm">
                  <p className="status-label text-[8px]">Initialize simulation to trigger neural suggestions</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Output Dashboard */}
        <div className="lg:col-span-8 space-y-12">
          {!result && !isSimulating && (
            <div className="glass-panel p-10 sm:p-20 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 border-ink/10 min-h-[400px] sm:min-h-[600px]">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-[60px] animate-pulse-glow" />
                <Target className="w-24 h-24 text-accent relative z-10 opacity-20" />
              </div>
              <div className="space-y-4 max-w-md">
                <h3 className="heading-display text-4xl tracking-tight">Awaiting Input</h3>
                <p className="text-muted font-light leading-relaxed">
                  Configure your identity profile and target destination to initialize the pathfinding simulation.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="status-label px-4 py-2 border border-ink/10">CORE_ENGINE: READY</div>
                <div className="status-label px-4 py-2 border border-ink/10">DATA_STREAM: IDLE</div>
              </div>
            </div>
          )}

          {isSimulating && (
            <div className="glass-panel p-8 sm:p-20 flex flex-col items-center justify-center text-center space-y-12 border-ink/10 min-h-[400px] sm:min-h-[600px]">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-accent/20 border-t-accent rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-4 border-secondary/20 border-t-secondary rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit className="w-10 h-10 text-accent animate-pulse" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="heading-display text-4xl tracking-tight animate-pulse">Analyzing Trajectory</h3>
                <div className="flex flex-col items-center gap-2">
                  <div className="status-label text-accent">Processing Neural Gaps...</div>
                  <div className="w-64 h-1 bg-ink/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full bg-gradient-to-r from-transparent via-accent to-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && !isSimulating && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Primary Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-panel-accent p-6 sm:p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target className="w-20 h-20" />
                  </div>
                  <div className="status-label text-accent mb-4">MATCH_PROBABILITY</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-7xl font-sans font-extrabold tracking-tighter glow-accent">{result.matchScore}%</span>
                    <span className="status-label text-accent/60 text-[8px] sm:text-[10px]">CONFIDENCE</span>
                  </div>
                  <div className="mt-6 w-full h-1.5 bg-accent/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.matchScore}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-accent shadow-[0_0_10px_#5a5a40]"
                    />
                  </div>
                </div>

                <div className="glass-panel p-6 sm:p-8 relative overflow-hidden group border-secondary/20">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Clock className="w-20 h-20" />
                  </div>
                  <div className="status-label text-secondary mb-4">ESTIMATED_DELTA</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tighter glow-secondary">{result.timeEstimate}</span>
                  </div>
                  <p className="mt-4 text-xs text-muted font-mono">Projected timeline for full role proficiency based on current skill velocity.</p>
                </div>

                <div className="glass-panel p-6 sm:p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-20 h-20" />
                  </div>
                  <div className="status-label mb-4">TRANSITION_COMPLEXITY</div>
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl sm:text-4xl font-sans font-extrabold tracking-tighter ${
                      result.difficulty === 'Easy' ? 'text-green-400' : 
                      result.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {result.difficulty.toUpperCase()}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-2 h-6 ${
                          i <= (result.difficulty === 'Easy' ? 1 : result.difficulty === 'Medium' ? 2 : 3) 
                          ? 'bg-accent' : 'bg-ink/10'
                        }`} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted font-mono">Calculated based on structural differences between current and target domains.</p>
                </div>
              </div>

              {/* Data Visualization Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
                    <h3 className="terminal-text text-sm font-bold flex items-center gap-3">
                      <BarChart3 className="w-4 h-4 text-accent" />
                      SKILL_GAP_ANALYSIS
                    </h3>
                    <div className="status-label text-[8px]">RADAR_PROJECTION</div>
                  </div>
                  <div className="h-[300px] sm:h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={result.chartData} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                        <PolarGrid stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)'} />
                        <PolarAngleAxis 
                          dataKey="name" 
                          tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(15,23,42,0.5)', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                        />
                        <Radar
                          name="Current"
                          dataKey="current"
                          stroke={theme === 'dark' ? '#a3a375' : '#5a5a40'}
                          fill={theme === 'dark' ? '#a3a375' : '#5a5a40'}
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="Required"
                          dataKey="required"
                          stroke={theme === 'dark' ? '#f97316' : '#a34b32'}
                          fill={theme === 'dark' ? '#f97316' : '#a34b32'}
                          fillOpacity={0.1}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', 
                            border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(45,45,45,0.1)'}`, 
                            borderRadius: '4px' 
                          }}
                          itemStyle={{ color: theme === 'dark' ? '#f5f5f5' : '#2d2d2d', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-panel p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
                    <h3 className="terminal-text text-sm font-bold flex items-center gap-3">
                      <Layers className="w-4 h-4 text-secondary" />
                      TIME_ALLOCATION_MODEL
                    </h3>
                    <div className="status-label text-[8px]">DISTRIBUTION_PIE</div>
                  </div>
                  <div className="h-[300px] sm:h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={result.timeBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {result.timeBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? (theme === 'dark' ? '#a3a375' : '#5a5a40') : (theme === 'dark' ? '#f97316' : '#a34b32')} fillOpacity={0.8} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', 
                            border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(45,45,45,0.1)'}`, 
                            borderRadius: '4px' 
                          }}
                          itemStyle={{ color: theme === 'dark' ? '#f5f5f5' : '#2d2d2d', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {result.timeBreakdown.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-surface/50 border border-ink/10 rounded-sm">
                        <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-accent' : 'bg-secondary'}`} />
                        <div className="flex-1">
                          <div className="status-label text-[8px]">{item.name}</div>
                          <div className="font-mono text-xs font-bold">{item.value}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Insights & Missing Skills */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6 sm:p-8 space-y-6">
                  <h3 className="terminal-text text-sm font-bold flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    CRITICAL_GAPS
                  </h3>
                  <div className="space-y-4">
                    {result.missingSkills.map((skill, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-red-500/5 border border-red-500/10 group hover:border-red-500/30 transition-all gap-4">
                        <div className="space-y-1">
                          <div className="font-mono text-sm font-bold text-red-400">{skill.name}</div>
                          <div className="status-label text-[8px]">IMPORTANCE: {skill.importance}</div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="status-label text-[8px] mb-1">LEARN_TIME</div>
                          <div className="font-mono text-xs font-bold">{skill.timeToLearn}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-6 sm:p-8 space-y-6">
                  <h3 className="terminal-text text-sm font-bold flex items-center gap-3">
                    <Info className="w-4 h-4 text-accent" />
                    STRATEGIC_INSIGHTS
                  </h3>
                  <div className="space-y-4">
                    {result.insights.map((insight, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-accent/5 border border-accent/10">
                        <div className="status-label text-accent font-bold">0{i + 1}</div>
                        <p className="text-sm text-ink/80 leading-relaxed font-light italic">
                          {insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Roadmap Section */}
              <StrategicRoadmap roadmap={result.roadmap} expandedPhase={expandedPhase} setExpandedPhase={setExpandedPhase} />
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function StrategicRoadmap({ roadmap, expandedPhase, setExpandedPhase }: { 
  roadmap: any[], 
  expandedPhase: number | null, 
  setExpandedPhase: (i: number | null) => void 
}) {
  return (
    <div className="glass-panel p-5 sm:p-10 border-ink/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-4">
        <h3 className="heading-display text-xl sm:text-4xl tracking-tight flex items-center gap-4">
          <Map className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
          STRATEGIC_ROADMAP
        </h3>
        <div className="status-label text-accent glow-accent text-[10px] sm:text-xs">PATH_OPTIMIZATION: ACTIVE</div>
      </div>
      
      <div className="space-y-8 relative before:absolute before:left-[19px] sm:before:left-[23px] before:top-2 before:bottom-2 before:w-[1px] before:bg-ink/10">
        {roadmap.map((step, i) => (
          <div key={i} className="relative pl-14 sm:pl-20">
            <motion.button 
              onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
              className={`absolute left-0 top-0 w-9 h-9 sm:w-12 sm:h-12 rounded-sm border flex items-center justify-center z-10 transition-all ${
                expandedPhase === i ? 'bg-accent border-accent text-white shadow-[0_0_20px_rgba(90,90,64,0.4)]' : 'bg-surface border-ink/10 text-slate-400 hover:border-accent/50'
              }`}
            >
              <span className="font-mono text-sm sm:text-lg font-bold">0{i + 1}</span>
            </motion.button>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-4">
              <div className="space-y-1">
                <h5 className="heading-display text-lg sm:text-2xl tracking-tight text-ink">{step.phase}</h5>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="status-label text-secondary text-[8px] sm:text-[10px]">DURATION: {step.duration}</div>
                  <div className="w-1 h-1 bg-white/20 rounded-full hidden sm:block" />
                  <div className="status-label text-[8px] sm:text-[10px]">STATUS: {expandedPhase === i ? 'ANALYZING' : 'PENDING'}</div>
                </div>
              </div>
              <button 
                onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
                className="btn-tactical-outline !px-4 sm:!px-6 !py-2 text-[8px] sm:text-[10px] w-fit"
              >
                {expandedPhase === i ? 'CLOSE_DETAILS' : 'VIEW_STRATEGY'}
              </button>
            </div>

            <AnimatePresence>
              {expandedPhase === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-ink/10 mt-4">
                    <div className="space-y-4">
                      <div className="status-label text-accent">TACTICAL_OBJECTIVES</div>
                      <div className="space-y-3">
                        {step.tasks.map((task: string, j: number) => (
                          <div key={j} className="flex items-start gap-4 p-3 sm:p-4 bg-surface/50 border border-ink/10 rounded-sm group hover:border-accent/30 transition-all">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 group-hover:scale-150 transition-transform" />
                            <span className="text-sm text-ink/80 font-light leading-relaxed">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 sm:mt-32 py-8 sm:py-16 border-t border-ink/10 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="heading-display text-3xl sm:text-4xl tracking-tightest">
              CAREER <span className="text-accent">GPS</span>
            </h2>
            <p className="status-label max-w-xs opacity-60 text-[10px] sm:text-xs">
              Advanced trajectory simulation for professional pathfinding.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12">
            <div className="space-y-4">
              <div className="status-label text-accent">SYSTEM_METRICS</div>
              <div className="space-y-2 font-mono text-[10px] text-muted">
                <div>UPTIME: 99.99%</div>
                <div>LATENCY: 24MS</div>
                <div>NODES: 1,024</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="status-label text-secondary">PROTOCOL</div>
              <div className="space-y-2 font-mono text-[10px] text-muted">
                <div>VERSION: 4.0.2</div>
                <div>BUILD: STABLE</div>
                <div>AUTH: ENCRYPTED</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="status-label text-[8px] opacity-40">© 2026 VOID_LABS // ALL_RIGHTS_RESERVED</div>
          <div className="flex gap-6">
            {['TERMINAL', 'DOCS', 'API', 'STATUS'].map(link => (
              <a key={link} href="#" className="status-label text-[8px] hover:text-accent transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
