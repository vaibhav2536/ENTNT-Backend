import { CommunicationRepository } from "../../db/repositories";
import type { communication } from "../../types/models";
import logger from "../../utils/logger";
import type { ICommunicationService } from "./contracts/Icommunication.service";

class CommunicationService implements ICommunicationService {
  private communicationRepository: CommunicationRepository;

  constructor() {
    this.communicationRepository = new CommunicationRepository();
  }

  addCommunication = async (communication: { methodId: string; date: Date; notes: string | null; status: string; }, companyIds: string[]): Promise<[Number | null, Error | null]> => {
    try {
      const communications = new Array<any>();
      for (const companyId of companyIds) {
        communications.push({
          ...communication,
          companyId
        })
      }
      const [communicationRes, communicationResErr] = await this.communicationRepository.addCommunication(communications);
      if (communicationResErr || !communicationRes) {
        logger.error("Error creating communication", communicationResErr)
        return [null, communicationResErr || new Error("Error creating communication")]
      }

      logger.info(
        `Successfully created ${communicationRes} communication(s) for ${companyIds.length} company(ies)`
      )
      return [communicationRes, null];
    } catch (error: any) {
      logger.error(
        `Error creating communication: ${error.message}`,
        error
      )
      return [null, error];
    }
  }

  getLastFiveCommunication = async (companyId: string): Promise<[communication[] | null, Error | null]> => {
    try {
      const [communicationRes, communicationResErr] = await this.communicationRepository.getLastFiveCommunication(companyId);
      if (communicationResErr || !communicationRes) {
        logger.error("Error retrieving last five communication", communicationResErr)
        return [null, communicationResErr || new Error("Error retrieving last five communication")]
      }

      logger.info(
        `Successfully retrieved last five communication for companyId: ${companyId}`
      )
      return [communicationRes, null];
    } catch (error: any) {
      logger.error(
        `Error retrieving last five communication: ${error.message}`,
        error
      )
      return [null, error];
    }
  }

  getNextScheduledCommunication = async (companyId: string): Promise<[communication | null, Error | null]> => {
    try {
      const [communicationRes, communicationResErr] = await this.communicationRepository.getNextScheduledCommunication(companyId);
      if (communicationResErr) {
        logger.error("Error retrieving next scheduled communication", communicationResErr)
        return [null, communicationResErr || new Error("No next scheduled communication")]
      }

      logger.info(
        `Successfully retrieved next scheduled communication for companyId: ${companyId}`
      )
      return [communicationRes, null];
    } catch (error: any) {
      logger.error(
        `Error retrieving next scheduled communication: ${error.message}`,
        error
      )
      return [null, error];
    }
  }

  getAllCommunications = async (): Promise<[communication[] | null, Error | null]> => {
    try {
      const [communicationRes, communicationResErr] = await this.communicationRepository.getAllCommunications();
      if (communicationResErr) {
        logger.error("Error retrieving all communications", communicationResErr)
        return [null, communicationResErr || new Error("Error retrieving all communications")]
      }

      logger.info("Successfully retrieved all communications")
      return [communicationRes, null];
    } catch (error: any) {
      return [null, error]
    }
  }
}

export default CommunicationService;