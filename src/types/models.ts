export type company = {
  id: string;
  name: string;
  location: string | null;
  linkedinProfile: string | null;
  emails: string[];
  phoneNumbers: string[];
  comments: string | null;
  communicationPeriodicity: string | null;
}

export type communicationMethod = {
  id: string;
  name: string;
  description: string | null;
  sequence: number;
  mandatoryFlag: boolean;
}

export type user = {
  id: string;
  role: string;
  username: string;
  password: string;
  email: string;
}

export type communication = {
  id: string;
  companyId: string;
  methodId: string;
  date: Date;
  notes: string | null;
  status: string;
}