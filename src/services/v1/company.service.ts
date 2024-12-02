import { CompanyRepository } from "../../db/repositories";
import type { company } from "../../types/models";
import logger from "../../utils/logger";
import type { ICompanyService } from "./contracts/Icompany.service";

class CompanyService implements ICompanyService {
  private companyRepository: CompanyRepository

  constructor() {
    this.companyRepository = new CompanyRepository()
  }

  addCompany = async (companyData: any): Promise<[company | null, Error | null]> => {
    try {
      const [companyRes, companyResErr] = await this.companyRepository.addCompany(companyData);
      if (companyResErr || !companyRes) {
        logger.error(
          `Error adding company: ${companyResErr?.message || 'No company added'}`,
          companyResErr
        )
        return [null, companyResErr || new Error(`Error adding company`)]
      }

      logger.info(`Added company: ${companyRes}`)
      return [companyRes, null];
    } catch (error: any) {
      logger.error(`Error adding company: ${error.message}`, error)
      return [null, error];
    }
  }

  getCompanies = async (): Promise<[company[] | null, Error | null]> => {
    try {
      const [companiesRes, companiesResErr] = await this.companyRepository.getCompanies();
      if (companiesResErr ||!companiesRes) {
        logger.error(
          `Error getting companies: ${companiesResErr?.message || 'No companies found'}`,
          companiesResErr
        )
        return [null, companiesResErr || new Error(`Error getting companies`)]
      }

      logger.info(`Fetched companies: ${companiesRes}`)
      return [companiesRes, null];
    } catch (error: any) {
      logger.error(`Error getting companies: ${error.message}`, error)
      return [null, error];
    }
  }

  getCompanyById = async (id: string): Promise<[company | null, Error | null]> => {
    try {
      const [companyRes, companyResErr] = await this.companyRepository.getCompanyById(id);
      if (companyResErr ||!companyRes) {
        logger.error(
          `Error getting company by id: ${companyResErr?.message || 'Company not found'}`,
          companyResErr
        )
        return [null, companyResErr || new Error(`Error getting company by id`)]
      }

      logger.info(`Fetched company by id: ${companyRes}`)
      return [companyRes, null];
    } catch (error: any) {
      logger.error(`Error getting company by id: ${error.message}`, error)
      return [null, error];
    }
  }

  updateCompany = async (id: string, companyData: any): Promise<[company | null, Error | null]> => {
    try {
      const [companyRes, companyResErr] = await this.companyRepository.updateCompany(id, companyData);
      if (companyResErr ||!companyRes) {
        logger.error(
          `Error updating company by id: ${companyResErr?.message || 'Company not found'}`,
          companyResErr
        )
        return [null, companyResErr || new Error(`Error updating company by id`)]
      }
      logger.info(`Updated company by id: ${companyRes}`)
      return [companyRes, null];
    } catch (error: any) {
      logger.error(`Error updating company by id: ${error.message}`, error)
      return [null, error];
    }
  }

  getNotifications = async (): Promise<[{overdue: company[], today: company[]} | null, Error | null]> => {
    try {
      const [company, companyResErr] = await this.companyRepository.getNotifications();
      if (companyResErr) {
        logger.error(`Error getting notifications: ${companyResErr.message}`, companyResErr)
        return [null, companyResErr];
      }
      
      logger.info(`Fetched notifications: ${company}`)
      return [company, null];
    } catch (error: any) {
      logger.error(`Error getting notifications: ${error.message}`, error)
      return [null, error];
    }
  }

  deleteCompany = async (id: string): Promise<[company | null, Error | null]> => {
    try {
      const [companyRes, companyResErr] = await this.companyRepository.deleteCompany(id);
      if (companyResErr ||!companyRes) {
        logger.error(
          `Error deleting company by id: ${companyResErr?.message || 'Company not found'}`,
          companyResErr
        )
        return [null, companyResErr || new Error(`Error deleting company by id`)]
      }
      logger.info(`Deleted company by id: ${id}`)
      return [companyRes, null];
    } catch (error: any) {
      logger.error(`Error deleting company by id: ${error.message}`, error)
      return [null, error];
    }
  }
}

export default CompanyService;