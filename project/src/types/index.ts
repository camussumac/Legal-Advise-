export interface Contract {
  id: string;
  title: string;
  content: string;
  uploadedAt: Date;
  status: 'pending' | 'analyzing' | 'completed';
  states: string[];
  analysis?: ContractAnalysis;
}

export interface ContractAnalysis {
  missingClauses: string[];
  contradictions: {
    description: string;
    location: string;
  }[];
  suggestions: string[];
  riskScore: number;
  stateSpecificIssues?: {
    stateId: string;
    issues: string[];
  }[];
}