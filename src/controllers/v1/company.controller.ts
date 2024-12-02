import type { Response } from "express";
import { CompanyService } from "../../services/v1/";
import logger from "../../utils/logger";
import { InternalServerErrorResponse, SuccessResponse, UnauthorizedResponse } from "../../utils/responses";

class CompanyController {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  addCompany = async (req: any, res: Response): Promise<any> => {
    try {
      const {
        name,
        location,
        linkedinProfile,
      } = req.body;

      const user = req.user;
      if (user?.role != "admin") {
        logger.error("Unortherized")
        return UnauthorizedResponse.send(res, "Unauthorized, only admin action")
      }

      const [companyRes, companyResErr] = await this.companyService.addCompany({
        name,
        location,
        linkedinProfile,
      })
      if (companyResErr || !companyRes) {
        logger.error(
          `Error creating company: ${companyResErr?.message}`,
          companyResErr
        )
        return InternalServerErrorResponse.send(res, "Error creating company")
      }

      logger.info("Company created")
      return SuccessResponse.send(res, companyRes, "Company created")
    } catch (error: any) {
      logger.error("Error creating company", error)
      return InternalServerErrorResponse.send(res, error.message)
    }
  }

  getCompanies = async (req: any, res: Response): Promise<any> => {
    try {
      const [company, companyResErr] = await this.companyService.getCompanies()
      if (companyResErr || !company) {
        logger.error(
          `Error getting companies: ${companyResErr?.message}`,
          companyResErr
        )
        return InternalServerErrorResponse.send(res, "Error getting companies")
      }

      logger.info("Companies fetched")
      return SuccessResponse.send(res, company, "Companies fetched")
    } catch (error: any) {
      logger.error("Error getting companies", error)
      return InternalServerErrorResponse.send(res, error.message)
    }
  }

  getNotifications = async (req: any, res: Response) => {
    try {
      const [notifications, notificationsResErr] = await this.companyService.getNotifications()
      if (notificationsResErr) {
        logger.error(
          `Error getting notifications: ${notificationsResErr?.message}`,
          notificationsResErr
        )
        return InternalServerErrorResponse.send(res, "Error getting notifications")
      }

      return SuccessResponse.send(res, notifications, "Notifications fetched")
    } catch (error: any) {
      logger.error("Error getting notifications", error)
      return InternalServerErrorResponse.send(res, error.message)
    }
  }

  deleteCompany = async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const user = req.user;
      if (user?.role != "admin") {
        logger.error("Unauthorized")
        return UnauthorizedResponse.send(res, "Unauthorized, only admin action")
      }

      const [companyRes, companyResErr] = await this.companyService.deleteCompany(id)
      if (companyResErr || !companyRes) {
        logger.error(
          `Error deleting company: ${companyResErr?.message}`,
          companyResErr
        )
        return InternalServerErrorResponse.send(res, "Error deleting company")
      }

      logger.info("Company deleted")
      return SuccessResponse.send(res, companyRes, "Company deleted")
    } catch (error: any) {
      logger.error("Error deleting company", error)
      return InternalServerErrorResponse.send(res, error.message)
    }
  }
}

export default CompanyController;