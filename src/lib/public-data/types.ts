export type PublicDataSource =
  | 'youthPolicies'
  | 'careerJobs'
  | 'financialEducation'
  | 'worknetJobs';

export interface PublicDataItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  link?: string;
  meta?: Record<string, string>;
}

export interface PublicDataSection {
  source: PublicDataSource;
  label: string;
  configured: boolean;
  items: PublicDataItem[];
  error?: string;
  fetchedAt?: string;
}

export interface PublicDataResponse {
  sections: PublicDataSection[];
  missingKeys: string[];
}
