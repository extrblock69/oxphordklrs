export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export interface StudentApplication {
  id: string;
  studentName: string;
  gradeLevel: string;
  parentName: string;
  parentEmail: string;
  interests: string[];
  notes?: string;
  status: "Received" | "Under Review" | "Interview Scheduled" | "Approved";
  createdAt: string;
}

export interface EstimatorInput {
  householdIncome: number;
  siblingsEnrolled: number;
  academicMerit: boolean;
  athleticMerit: boolean;
}

export interface TuitionEstimate {
  baseTuition: number;
  aidAwarded: number;
  finalTuition: number;
  explanation: string[];
}
