import type { Response } from "express";
import { CommunicationMethodService } from "../../services/v1";
import logger from "../../utils/logger";
import { InternalServerErrorResponse, SuccessResponse, UnauthorizedResponse } from "../../utils/responses";

class CommunicationMethodController {
  private communicationMethodService: CommunicationMethodService;

  constructor() {
    this.communicationMethodService = new CommunicationMethodService();
  }

  addCommunicationMethod = async (req: any, res: Response): Promise<any> => {
    try {
      const { role } = req.user;
      if (role != "admin") {
        logger.error("Unauthorized")
        return UnauthorizedResponse.send(res, "Access denied. Only admins can perform this action.");
      }
      const { name, description, sequence, mandatoryFlag } = req.body;

      const [communicationMethodRes, communicationMethodResErr] = await this.communicationMethodService.addCommunicationMethod({
        name,
        description,
        sequence,
        mandatoryFlag,
      })
      if (communicationMethodResErr || !communicationMethodRes) {
        logger.error(`Error creating communication method: ${communicationMethodResErr?.message}`)
        return InternalServerErrorResponse.send(res, "Error creating communication method");
      }

      logger.info("Communication method created")
      return SuccessResponse.send(res, communicationMethodRes, "Communication method created")
    } catch (error: any) {
      logger.error(`Error while creating communication method: ${error.message}`)
      return InternalServerErrorResponse.send(res, error.message)
    }
  }

  getCommunicationMethods = async (req: any, res: Response): Promise<any> => {
    try {
      const [communicationMethodRes, communicationMethodResErr] = await this.communicationMethodService.getCommunicationMethods();
      if (communicationMethodResErr ||!communicationMethodRes) {
        logger.error(`Error getting communication methods: ${communicationMethodResErr?.message}`)
        return InternalServerErrorResponse.send(res, "Error getting communication methods");
      }
      
      logger.info("Communication methods retrieved")
      return SuccessResponse.send(res, communicationMethodRes, "Communication methods retrieved")
    } catch (error: any) {
      logger.error(`Error while getting communication methods: ${error.message}`)
      return InternalServerErrorResponse.send(res, error.message)
    }
  }
}

export default CommunicationMethodController;