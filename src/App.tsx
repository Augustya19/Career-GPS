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
  BookOpen
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
import { ROLES, ALL_SKILLS } from './data';
import { CareerRole, SimulationResult, UserProfile } from './types';
import { cn } from './lib/utils';

// Set worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function App() {
  const [view, setView] = useState<'landing' | 'simulator'>('landing');

  return (
    <div className="min-h-screen grid-bg overflow-x-hidden">
      <div className="fixed inset-0 glow-mesh pointer-events-none" />
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <LandingPage onStart={() => setView('simulator')} />
        ) : (
          <SimulatorPage />
        )}
      </AnimatePresence>
    </div>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Animated nodes background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0.1
            }}
            animate={{ 
              x: [null, Math.random() * window.innerWidth], 
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{ 
              duration: 20 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-2 h-2 bg-neon-blue rounded-full blur-[1px]"
          />
        ))}
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neon-blue text-sm font-bold mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          AI-POWERED CAREER INTELLIGENCE
        </motion.div>
        
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          NAVIGATE YOUR <br />
          <span className="text-gradient">CAREER LIKE GPS</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Simulate decisions. Predict outcomes. Reduce uncertainty. 
          The ultimate engine for professional growth and role transitions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={onStart} className="btn-neon group flex items-center">
            Start Simulation
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-8 text-gray-500 font-bold text-sm tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
              Real-time Analysis
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
              Gap Prediction
            </div>
          </div>
        </div>
      </motion.div>

      {/* Visual Flow Line */}
      <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-40 h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent"
        />
      </div>
    </motion.div>
  );
}

function SimulatorPage() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    skills: [],
    experienceYears: 0
  });
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
        - description (string)
        - requiredSkills (array of objects with name, importance: 'Critical'|'High'|'Medium', timeToLearn: string)
        - clusters (array of objects with name, skills: array of strings)
        - roadmap (array of 4 phases with phase, duration, tasks: array of strings, resources: array of strings)
        Make it professional and realistic.`,
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
        contents: `Based on the user's current skills and target role, suggest 10 additional relevant skills they might have or should consider.
        
        Current Skills: ${userSkills.join(', ')}
        Target Role: ${targetRole.title}
        Role Description: ${targetRole.description}
        
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
        // We don't add them automatically, just show them in the UI
        // For now, let's just add them to a temporary list or just alert for demo
        // Actually, let's just add them to the userSkills if they are not there
        const uniqueNew = suggested.filter(s => !userSkills.some(existing => existing.toLowerCase() === s.toLowerCase()));
        if (uniqueNew.length > 0) {
          setUserSkills([...userSkills, ...uniqueNew.slice(0, 5)]);
        }
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
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white flex items-center">
            <Target className="w-8 h-8 mr-3 text-neon-blue" />
            CAREER <span className="text-neon-blue ml-2">GPS</span>
          </h2>
          <p className="text-gray-400 font-medium mt-1">Professional Transition Simulator</p>
        </div>
        <div className="flex items-center gap-4">
          {userProfile.summary && (
            <button 
              onClick={() => setUserProfile({ skills: [], experienceYears: 0 })}
              className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear Profile
            </button>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleResumeUpload} 
            accept=".pdf,.txt" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isImportingResume}
            className={cn(
              "px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-colors flex items-center",
              isImportingResume && "opacity-50 cursor-not-allowed"
            )}
          >
            {isImportingResume ? (
              <>
                <BrainCircuit className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Import Resume
              </>
            )}
          </button>
          <div className="h-10 w-px bg-white/10" />
          <div className="flex items-center gap-2 text-xs font-bold text-neon-blue bg-neon-blue/10 px-4 py-2 rounded-full border border-neon-blue/20">
            <BrainCircuit className="w-4 h-4" />
            INSIGHT ENGINE ACTIVE
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel: Input Engine */}
        <div className="lg:col-span-4 space-y-6 sticky top-12">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <Layers className="w-5 h-5 mr-3 text-neon-blue" />
              Input Engine
            </h3>

            <div className="space-y-8">
              {/* Profile Context (from Resume) */}
              {userProfile.summary && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-neon-purple" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Context</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic mb-3">"{userProfile.summary}"</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.recentRoles?.map(role => (
                      <span key={role} className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                        {role}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Skills Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Skills</label>
                  <button 
                    onClick={suggestAISkills}
                    disabled={isSuggestingSkills}
                    className="text-[10px] font-bold text-neon-blue uppercase tracking-widest hover:underline disabled:opacity-50 flex items-center gap-1"
                  >
                    {isSuggestingSkills ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    AI Suggest
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill(skillInput)}
                    placeholder="Search or type skills..."
                    className="glass-input w-full pr-12"
                  />
                  <button onClick={() => addSkill(skillInput)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-blue hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.slice(0, 6).map(skill => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-neon-blue/50 hover:text-neon-blue transition-all"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>

                {/* Selected Skills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <AnimatePresence>
                    {userSkills.map(skill => (
                      <motion.span 
                        key={skill}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center px-3 py-1.5 rounded-xl bg-neon-blue/10 text-neon-blue text-xs font-bold border border-neon-blue/20"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-white">
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Target Role */}
              <div className="space-y-4 relative z-30">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Target Role</label>
                <div className="relative group">
                  <div className="relative">
                    <input 
                      type="text"
                      value={roleInput || targetRoleTitle}
                      onChange={(e) => {
                        setRoleInput(e.target.value);
                        setShowRoleSuggestions(true);
                      }}
                      onFocus={() => setShowRoleSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 200)}
                      placeholder="Search or type a custom role..."
                      className="glass-input w-full pr-16 focus:border-neon-blue/50 focus:shadow-[0_0_15px_rgba(0,210,255,0.1)] transition-all duration-300"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {(roleInput || targetRoleTitle) && (
                        <button 
                          onClick={() => {
                            setRoleInput('');
                            setTargetRoleTitle('');
                            setCustomRoleData(null);
                          }}
                          className="p-1 hover:text-white text-gray-500 transition-colors rounded-md hover:bg-white/5"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <div className="w-px h-4 bg-white/10 mx-1" />
                      <ChevronDown className={cn(
                        "w-4 h-4 text-gray-500 transition-transform duration-300",
                        showRoleSuggestions && "rotate-180"
                      )} />
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {showRoleSuggestions && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-2">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Suggestions</p>
                          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                            {ROLES.filter(r => r.title.toLowerCase().includes(roleInput.toLowerCase())).length > 0 ? (
                              ROLES.filter(r => r.title.toLowerCase().includes(roleInput.toLowerCase())).map(role => (
                                <button
                                  key={role.id}
                                  onClick={() => {
                                    setTargetRoleTitle(role.title);
                                    setRoleInput('');
                                    setShowRoleSuggestions(false);
                                    setCustomRoleData(null);
                                  }}
                                  className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/30 hover:bg-neon-blue/5 transition-all group flex items-center gap-3"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-neon-blue/10 group-hover:text-neon-blue transition-colors">
                                    <Target className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-bold text-xs text-gray-300 group-hover:text-white truncate">{role.title}</div>
                                  </div>
                                </button>
                              ))
                            ) : roleInput && (
                              <button
                                onClick={() => {
                                  setTargetRoleTitle(roleInput);
                                  generateRoleData(roleInput);
                                  setRoleInput('');
                                  setShowRoleSuggestions(false);
                                }}
                                className="w-full text-left px-4 py-4 rounded-xl bg-neon-blue/5 border border-neon-blue/20 hover:bg-neon-blue/10 transition-all group flex items-center gap-4"
                              >
                                <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center shrink-0 text-neon-blue shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                                  <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="font-black text-xs text-neon-blue uppercase tracking-tight">Create Custom Role</div>
                                  <div className="text-[10px] text-neon-blue/70 font-bold">"{roleInput}" via AI</div>
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {isGeneratingRole ? (
                  <div className="flex items-center gap-2 text-[10px] text-neon-blue font-bold animate-pulse px-1">
                    <BrainCircuit className="w-3 h-3" />
                    GENERATING ROLE REQUIREMENTS...
                  </div>
                ) : targetRoleTitle ? (
                  <div className="flex items-start gap-3 px-1">
                    {customRoleData && customRoleData.title === targetRoleTitle && (
                      <div className="mt-0.5 px-2 py-0.5 rounded-md bg-neon-purple/20 border border-neon-purple/30 text-[8px] font-black text-neon-purple uppercase tracking-widest shrink-0 shadow-[0_0_10px_rgba(157,80,187,0.2)]">
                        AI GEN
                      </div>
                    )}
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">
                      {targetRole.description}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Experience Slider */}
              <div className="space-y-4 relative z-20">
                <div className="flex justify-between">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Experience</label>
                  <span className="text-xs font-bold text-neon-blue">{experience} Years</span>
                </div>
                <input 
                  type="range" min="0" max="5" step="1"
                  value={experience}
                  onChange={(e) => setExperience(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-blue"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                  <span>ENTRY</span>
                  <span>SENIOR</span>
                </div>
              </div>

              <button 
                onClick={runSimulation}
                disabled={isSimulating || isGeneratingRole}
                className="w-full btn-neon flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSimulating ? (
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <BrainCircuit className="w-5 h-5" />
                    </motion.div>
                    SIMULATING...
                  </div>
                ) : isGeneratingRole ? (
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    PREPARING ROLE...
                  </div>
                ) : (
                  <>
                    RUN SIMULATION
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Simulate Improvement Card */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 border-neon-purple/30 bg-neon-purple/5"
            >
              <h4 className="text-sm font-bold mb-4 flex items-center text-neon-purple">
                <Sparkles className="w-4 h-4 mr-2" />
                Simulate Improvement
              </h4>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Add one of these critical skills to see your match score jump instantly.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {result.missingSkills.slice(0, 4).map(skill => (
                  <button 
                    key={skill.name}
                    onClick={() => addSkill(skill.name)}
                    className="text-[10px] font-bold text-left p-2 rounded-lg bg-white/5 border border-white/10 hover:border-neon-purple/50 transition-all"
                  >
                    + {skill.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Panel: Output Dashboard */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {!result && !isSimulating ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card h-[700px] flex flex-col items-center justify-center text-center p-12 border-dashed"
              >
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                  <Target className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-3xl font-black mb-4">READY TO NAVIGATE</h3>
                <p className="text-gray-500 max-w-md mx-auto text-lg">
                  Configure your current profile and target destination to generate your professional flight path.
                </p>
              </motion.div>
            ) : isSimulating ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card h-[700px] flex flex-col items-center justify-center text-center p-12"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-40 h-40 bg-neon-blue rounded-full blur-3xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    >
                      <BrainCircuit className="w-16 h-16 text-neon-blue" />
                    </motion.div>
                  </div>
                </div>
                <h3 className="text-2xl font-black mt-12 tracking-widest">CALCULATING TRAJECTORY</h3>
                <p className="text-gray-500 mt-4 font-medium">Running gap analysis and roadmap generation...</p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Centerpiece: Match Score & Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-7 glass-card p-8 flex items-center justify-between">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                        <motion.circle 
                          cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                          strokeDasharray={553}
                          initial={{ strokeDashoffset: 553 }}
                          animate={{ strokeDashoffset: 553 - (553 * result!.matchScore) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={cn(
                            "transition-all duration-1000",
                            result!.matchScore > 70 ? "text-neon-green" : result!.matchScore > 40 ? "text-yellow-400" : "text-red-500"
                          )}
                          style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black">{result!.matchScore}%</span>
                        <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Match Score</span>
                      </div>
                    </div>
                    <div className="flex-1 pl-12 space-y-6">
                      <div>
                        <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Difficulty Meter</h4>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-neon-green via-yellow-400 to-red-500 opacity-20" />
                          <motion.div 
                            initial={{ left: 0 }}
                            animate={{ left: `${result!.difficulty === 'Easy' ? 20 : result!.difficulty === 'Medium' ? 50 : 80}%` }}
                            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white] z-10"
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-500">
                          <span>EASY</span>
                          <span>MEDIUM</span>
                          <span>HARD</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-gray-400">Transition Difficulty</span>
                          <span className={cn(
                            "text-xs font-black uppercase",
                            result!.difficulty === 'Easy' ? "text-neon-green" : result!.difficulty === 'Medium' ? "text-yellow-400" : "text-red-500"
                          )}>{result!.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 glass-card p-8 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Time Estimation</h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-neon-blue">{result!.timeEstimate.split(' ')[0]}</span>
                        <span className="text-xl font-bold text-gray-400">Months</span>
                      </div>
                    </div>
                    <div className="h-24 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={result!.timeBreakdown}
                            innerRadius={30}
                            outerRadius={40}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill="#00d2ff" />
                            <Cell fill="#9d50bb" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-neon-blue rounded-full" />
                        LEARNING (70%)
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-neon-purple rounded-full" />
                        PRACTICE (30%)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Wow: Radar Chart & Missing Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card p-8">
                    <h4 className="text-sm font-bold mb-8 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-3 text-neon-blue" />
                      Skill Coverage Analysis
                    </h4>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result!.chartData}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis dataKey="name" tick={{ fill: '#999', fontSize: 10, fontWeight: 'bold' }} />
                          <Radar
                            name="Your Skills"
                            dataKey="current"
                            stroke="#00d2ff"
                            fill="#00d2ff"
                            fillOpacity={0.3}
                          />
                          <Radar
                            name="Required"
                            dataKey="required"
                            stroke="#9d50bb"
                            fill="transparent"
                            strokeDasharray="4 4"
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="glass-card p-8">
                    <h4 className="text-sm font-bold mb-8 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-3 text-red-500" />
                      Critical Skill Gaps
                    </h4>
                    <div className="space-y-4">
                      {result!.missingSkills.map((skill, i) => (
                        <motion.div 
                          key={skill.name}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-neon-blue/30 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black",
                              skill.importance === 'Critical' ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                            )}>
                              {skill.importance[0]}
                            </div>
                            <div>
                              <p className="font-bold text-sm">{skill.name}</p>
                              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{skill.importance} Priority</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-neon-blue">{skill.timeToLearn}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase">To Master</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Career Path Visualizer */}
                <div className="glass-card p-8">
                  <h4 className="text-sm font-bold mb-10 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-3 text-neon-blue" />
                    Career Path Visualizer
                  </h4>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
                    {/* Background Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 hidden md:block -translate-y-1/2" />
                    
                    {/* Steps */}
                    {[
                      { label: 'Current State', icon: Target, color: 'gray' },
                      { label: 'Intermediate', icon: Layers, color: 'purple' },
                      { label: 'Target Role', icon: Sparkles, color: 'blue' }
                    ].map((step, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 group-hover:scale-110",
                          step.color === 'gray' ? "bg-gray-900 border-gray-700 text-gray-500" :
                          step.color === 'purple' ? "bg-neon-purple/20 border-neon-purple/50 text-neon-purple shadow-[0_0_15px_rgba(157,80,187,0.3)]" :
                          "bg-neon-blue/20 border-neon-blue/50 text-neon-blue shadow-[0_0_15px_rgba(0,210,255,0.3)]"
                        )}>
                          <step.icon className="w-8 h-8" />
                        </div>
                        <p className="mt-4 text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{step.label}</p>
                        {i < 2 && (
                          <div className="md:hidden my-4">
                            <ChevronDown className="w-6 h-6 text-gray-700" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insight Engine */}
                <div className="glass-card p-8 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 border-neon-blue/20">
                  <h4 className="text-sm font-bold mb-6 flex items-center">
                    <BrainCircuit className="w-5 h-5 mr-3 text-neon-blue" />
                    Insight Engine Report
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {result!.insights.map((insight, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-neon-blue/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-neon-blue" />
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed font-medium">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roadmap: Timeline UI */}
                <div className="glass-card p-10">
                  <h4 className="text-2xl font-black mb-12 flex items-center tracking-tight">
                    <Map className="w-8 h-8 mr-4 text-neon-blue" />
                    STRATEGIC ROADMAP
                  </h4>
                  <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                    {result!.roadmap.map((step, i) => (
                      <div key={i} className="relative pl-16">
                        <motion.button 
                          onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
                          className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-[#050505] border-2 border-neon-blue flex items-center justify-center z-10 shadow-[0_0_10px_rgba(0,210,255,0.3)] hover:scale-110 transition-transform"
                        >
                          <span className="text-xs font-black">{i + 1}</span>
                        </motion.button>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                          <div>
                            <h5 className="text-xl font-black tracking-tight">{step.phase}</h5>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Duration: {step.duration}</p>
                          </div>
                          <button 
                            onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
                            className="text-xs font-bold text-neon-blue hover:underline"
                          >
                            {expandedPhase === i ? 'Collapse Details' : 'Expand Details'}
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
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                                <div className="space-y-3">
                                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Key Objectives</p>
                                  {step.tasks.map((task, j) => (
                                    <div key={j} className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                                      <div className="w-1.5 h-1.5 rounded-full bg-neon-blue mr-4" />
                                      {task}
                                    </div>
                                  ))}
                                </div>
                                {step.resources && (
                                  <div className="space-y-3">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Recommended Resources</p>
                                    {step.resources.map((res, j) => (
                                      <a key={j} href="#" className="flex items-center justify-between p-4 rounded-2xl bg-neon-blue/5 border border-neon-blue/10 text-sm font-bold text-neon-blue hover:bg-neon-blue/10 transition-all group">
                                        {res}
                                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-12 border-t border-white/10 text-center">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.3em]">
          Powered by Career GPS Rule Engine v2.4.0
        </p>
      </footer>
    </div>
  );
}
