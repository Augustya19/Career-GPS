export interface SkillRequirement {
  name: string;
  importance: 'Critical' | 'High' | 'Medium';
  timeToLearn: string;
}

export interface SkillCluster {
  name: string;
  skills: string[];
}

export interface RoadmapStep {
  phase: string;
  duration: string;
  tasks: string[];
  resources?: string[];
}

export interface CareerRole {
  id: string;
  title: string;
  description: string;
  requiredSkills: SkillRequirement[];
  clusters: SkillCluster[];
  roadmap: RoadmapStep[];
}

export interface UserProfile {
  skills: string[];
  experienceYears: number;
  summary?: string;
  recentRoles?: string[];
  education?: string[];
}

export interface SimulationResult {
  matchScore: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  missingSkills: SkillRequirement[];
  timeEstimate: string;
  roadmap: RoadmapStep[];
  chartData: { name: string; current: number; required: number }[];
  insights: string[];
  timeBreakdown: { name: string; value: number }[];
}
