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
  coordinates: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'spatial' | 'cloud' | 'core';
  tech: string[];
  metrics: string;
  impact: string;
  role: string;
  color: string;
}

/* CHATBOT DISABLED TEMPORARILY
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
*/
