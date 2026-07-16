export interface CareerMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  company: string;
  role: string;
  description: string;
  details: string[];
  achievements: string[];
  techStack: string[];
  coordinates: string; // Cybertruck geometric reference coordinates
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "spatial" | "cyber" | "core";
  tech: string[];
  metrics: string;
  impact: string;
  role: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface ConfigOption {
  id: string;
  category: "engine" | "armor" | "range" | "cabin";
  name: string;
  description: string;
  value: string;
  badge: string;
  powerRating: number; // For performance indicators
}

export interface ConfiguratorState {
  engine: string; // backend stack
  armor: string;  // reliability / testing
  range: string;  // frontend / client performance
  cabin: string;  // development practices / methodology
}
