import type { company } from "../../../types/models";

export interface ICompanyService {
  addCompany(companyData: any): Promise<[company | null, Error | null]>;
  getCompanies(): Promise<[company[] | null, Error | null]>;
  getCompanyById(id: string): Promise<[company | null, Error | null]>;
  updateCompany(id: string, companyData: any): Promise<[company | null, Error | null]>;
  getNotifications(): Promise<[{overdue: company[], today: company[]} | null, Error | null]>;
  deleteCompany(id: string): Promise<[company | null, Error | null]>;
}