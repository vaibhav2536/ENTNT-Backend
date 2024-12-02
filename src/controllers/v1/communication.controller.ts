import type { Response } from "express";
import { CommunicationService } from "../../services/v1";
import logger from "../../utils/logger";
import { BadRequestResponse, InternalServerErrorResponse, SuccessResponse } from "../../utils/responses";

class CommunicationController {
  private communicationService: CommunicationService;

  constructor() {
    this.communicationService = new CommunicationService();
  }

  addConversation = async (req: any, res: Response) => {
    try {
      const { companyIds, methodId, date, notes } = req.body;

      const isoDate = new Date(date)
      const [conversationRes, conversationResErr] = await this.communicationService.addCommunication({
        methodId,
        date: isoDate,
        notes,
        status: "pending",
      }, companyIds)
      if (conversationResErr || !conversationRes) {
        logger.error(
          `Error adding conversation: ${conversationResErr?.message}`,
          conversationResErr
        )
        return InternalServerErrorResponse.send(res, `Failed to add conversation. Please check the request and try again.`)
      }
      
      logger.info("Conversations recorded");
      return SuccessResponse.send(res, conversationRes, `${conversationRes} conversations recorded successfully`)
    } catch (error: any) {
      logger.error(
        `Error adding conversation: ${error.message}`,
        error
      )
      return InternalServerErrorResponse.send(res, error.message)
    }
  }

  getPastNScheduledCommunication = async (req: any, res: Response) => {
    try {
      const { companyId } = req.body;
      if (!companyId) return BadRequestResponse.send(res, "No company provided")
      
      var result: any = {
        nextCommunication: null,
        lastFiveCommunication: null
      } 

      const [communicationRes, communicationResErr] = await this.communicationService.getNextScheduledCommunication(companyId)
      if (communicationResErr) {
        logger.error(
          `Error getting next scheduled communication: ${communicationResErr?.message}`,
          communicationResErr
        )
        return InternalServerErrorResponse.send(res, `Failed to get next scheduled communication. Please check the request and try again.`)
      }
      result = {
        ...result,
        nextCommunication: communicationRes
      }

      const [communicationResLast, communicationResLastErr] = await this.communicationService.getLastFiveCommunication(companyId)
      if (communicationResLastErr) {
        logger.error(
          `Error getting last five communication: ${communicationResLastErr?.message}`,
          communicationResLastErr
        )
        return InternalServerErrorResponse.send(res, `Failed to get last five communication. Please check the request and try again.`)
      }
      result = {
        ...result,
        lastFiveCommunication: communicationResLast
      }
      
      logger.info("Next scheduled communication retrieved");
      return SuccessResponse.send(res, result, `Next scheduled communication retrieved successfully`)
    } catch (error: any) {
      logger.error(
        `Error getting next scheduled communication: ${error.message}`,
        error
      )
      return InternalServerErrorResponse.send(res, error.message)
    }
  }

  getAllCommunications = async (req: any, res: Response) => {
    try {
      const [communications, communicationsErr] = await this.communicationService.getAllCommunications();
      if (communicationsErr) {
        logger.error(
          `Error getting all communications: ${communicationsErr?.message}`,
          communicationsErr
        )
        return InternalServerErrorResponse.send(res, `Failed to get all communications. Please check the request and try again.`)
      }

      logger.info("All communications retrieved");
      return SuccessResponse.send(res, communications, `All communications retrieved successfully`)
    } catch (error: any) {
      logger.error(
        `Error getting all communications: ${error.message}`,
        error
      )
      return InternalServerErrorResponse.send(res, error.message)
    }
  }
}

export default CommunicationController;