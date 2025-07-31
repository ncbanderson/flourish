export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Prescription {
  id: string;
  mood: string;
  poem: {
    title: string;
    author: string;
    excerpt: string;
    fullText?: string;
  };
  music?: {
    title: string;
    artist: string;
    genre: string;
    description: string;
  };
  reasoning: string;
  timestamp: Date;
}