export type ViewState = 'dashboard' | 'retrospective' | 'strategy' | 'actions';

export interface FinancialMetric {
  label: string;
  target: number;
  actual: number;
  unit: string;
  status: 'success' | 'warning' | 'danger';
  analysis?: string;
}

export interface CompetitorData {
  client: string;
  ourHeadcount: number;
  ourRank: number;
  topCompetitorName: string;
  topCompetitorHeadcount: number;
  totalCompetitors?: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export interface Issue {
  id: string;
  category: string;
  title: string;
  description: string;
  rootCause: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
  dataPoints?: string[];
}

export interface StrategyItem {
  id: string;
  pillar: string; 
  title: string;
  description: string;
  tactics: string[];
  kpi: string;
}

export interface ActionPlan {
  issueId: string;
  category: string;
  issueTitle: string;
  strategy: string;
  milestones: string[];
  owner: string;
  risk: string;
  expectedOutcome: string;
}