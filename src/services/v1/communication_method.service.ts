import { CommunicationMethodRepository } from "../../db/repositories";
import type { communicationMethod } from "../../types/models";
import logger from "../../utils/logger";
import type { ICommunicationMethodService } from "./contracts/Icommunication_method.service";

class CommunicationMethodService implements ICommunicationMethodService {
  private communicationMethodRepository: CommunicationMethodRepository;

  constructor() {
    this.communicationMethodRepository = new CommunicationMethodRepository()
  }

  addCommunicationMethod = async (data: any): Promise<[communicationMethod | null, Error | null]> => {
    try {
      const [communicationMethodRes, communicationMethodResErr] = await this.communicationMethodRepository.addCommunicationMethod(data);
      if (communicationMethodResErr || !communicationMethodRes) {
        logger.error(
          "Error adding communication method",
          communicationMethodResErr
        )
        return [null, communicationMethodResErr || new Error("Error adding communication method")]
      }

      logger.info("Communication method added", communicationMethodRes)
      return [communicationMethodRes, null]
    } catch (error: any) {
      logger.error("Error adding communication method", error)
      return [null, error]
    }
  }

  deleteCommunicationMethod = async (id: string): Promise<[communicationMethod | null, Error | null]> => {
    try {
      const [communicationMethodRes, communicationMethodResErr] = await this.communicationMethodRepository.deleteCommunicationMethod(id);
      if (communicationMethodResErr || !communicationMethodRes) {
        logger.error(
          "Error deleting communication method",
          communicationMethodResErr
        )
        return [null, communicationMethodResErr || new Error("Error deleting communication method")]
      }

      logger.info("Communication method deleted", communicationMethodRes)
      return [communicationMethodRes, null]
    } catch (error: any) {
      logger.error("Error deleting communication method", error)
      return [null, error]
    }
  }

  editCommunicationMethod = async (data: any): Promise<[communicationMethod | null, Error | null]> => {
    try {
      const [communicationMethodRes, communicationMethodResErr] = await this.communicationMethodRepository.editCommunicationMethod(data)
      if (communicationMethodResErr || !communicationMethodRes) {
        logger.error(
          "Error editing communication method",
          communicationMethodResErr
        )
        return [null, communicationMethodResErr || new Error("Error editing communication method")]
      }
      logger.info("Communication method edited", communicationMethodRes)
      return [communicationMethodRes, null]
    } catch (error: any) {
      logger.error("Error editing communication method", error)
      return [null, error]
    }
  }

  getCommunicationMethods = async (): Promise<[communicationMethod[] | null, Error | null]> => {
    try {
      const [communicationMethodRes, communicationMethodResErr] = await this.communicationMethodRepository.getCommunicationMethods();
      if (communicationMethodResErr || !communicationMethodRes) {
        logger.error(
          "Error getting communication methods",
          communicationMethodResErr
        )
        return [null, communicationMethodResErr || new Error("Error getting communication methods")]
      }

      logger.info("Communication methods retrieved", communicationMethodRes)
      return [communicationMethodRes, null]
    } catch (error: any) {
      logger.error("Error getting communication methods", error)
      return [null, error]
    }
  }
}

export default CommunicationMethodService;