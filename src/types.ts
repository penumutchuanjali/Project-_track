export type ProjectStatus = 'On Track' | 'Delayed' | 'At Risk' | 'Completed';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type ProjectStage = 'Planning' | 'Approval' | 'Tender' | 'Construction' | 'Completed';

export interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  completionDate?: string;
  status: 'Completed' | 'Pending' | 'Delayed';
  weightage: number; // percentage
  details: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  fileSize: string;
  status: 'Verified' | 'Pending Approval' | 'Archived';
  category: 'DPR' | 'Environmental' | 'Tender' | 'Financial' | 'Technical' | 'Contractual';
}

export interface ProjectRisk {
  id: string;
  title: string;
  category: 'Land Acquisition' | 'Contractual' | 'Environmental Clearance' | 'Geological' | 'Financial' | 'Utility Shifting';
  severity: RiskLevel;
  description: string;
  mitigationPlan: string;
  assignedOfficer: string;
  status: 'Active' | 'Under Review' | 'Resolved';
  reportedDate: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  author: string;
  designation: string;
  summary: string;
  type: 'Inspection' | 'Milestone' | 'Notice' | 'Financial' | 'Clearance';
}

export interface MonthlyProgress {
  month: string;
  targetProgress: number; // %
  actualProgress: number; // %
  expenditure: number; // in Crores
}

export interface Project {
  id: string;
  name: string;
  ministry: string;
  department: string;
  sector: string;
  location: {
    city: string;
    state: string;
    coordinates: [number, number]; // [lat, lng]
    mapRegion: 'North' | 'South' | 'West' | 'East' | 'Central' | 'Northeast';
    // Normalized SVG percentage coordinates on India map (0 to 100)
    svgX: number;
    svgY: number;
  };
  approvedCost: number; // In Crores (₹)
  expenditure: number; // In Crores (₹)
  physicalProgress: number; // percentage 0-100
  financialProgress: number; // percentage 0-100
  completionPercentage: number;
  startDate: string;
  expectedCompletionDate: string;
  originalCompletionDate: string;
  delayMonths: number;
  status: ProjectStatus;
  riskLevel: RiskLevel;
  stage: ProjectStage;
  projectDirector: string;
  contractor: string;
  description: string;
  milestones: Milestone[];
  documents: ProjectDocument[];
  risks: ProjectRisk[];
  updates: ProjectUpdate[];
  monthlyProgress: MonthlyProgress[];
}

export interface AlertItem {
  id: string;
  projectId: string;
  projectName: string;
  type: 'DELAY' | 'EXPENSE_SPIKE' | 'OVERDUE_MILESTONE' | 'COST_OVERRUN' | 'DEADLINE_APPROACHING' | 'CLEARANCE';
  severity: 'Critical' | 'High' | 'Medium' | 'Info';
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  acknowledged: boolean;
  actionRequired?: string;
}

export interface MinistrySummary {
  ministry: string;
  shortName: string;
  projectCount: number;
  totalCost: number;
  totalExpenditure: number;
  avgCompletion: number;
  delayedCount: number;
  atRiskCount: number;
  onTrackCount: number;
  completedCount: number;
}

export interface UserSession {
  name: string;
  email: string;
  role: string;
  designation: string;
  department: string;
  lastLogin: string;
}
