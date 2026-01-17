export type ViewState = 'dashboard' | 'retrospective' | 'strategy' | 'actions';

export interface FinancialMetric {
  label: string;
  target: number;
  actual: number;
  unit: string;
  status: 'success' | 'warning' | 'danger';
  analysis?: string; // Added for detailed analysis text
}

export interface Issue {
  id: string;
  category: string;
  title: string;
  description: string; // High level summary
  rootCause: string;   // Deep dive analysis
  impact: string;      // Financial/Strategic impact
  severity: 'high' | 'medium' | 'low';
  dataPoints?: string[]; // Specific evidences
}

export interface StrategyItem {
  id: string;
  pillar: string; 
  title: string;
  description: string;
  tactics: string[]; // Specific tactical steps
  kpi: string;       // Measurable goal
}

export interface ActionPlan {
  issueId: string;
  category: string;
  issueTitle: string;
  strategy: string;    // Strategic approach
  milestones: string[]; // Quarterly or monthly milestones
  owner: string;
  risk: string;
  expectedOutcome: string;
}