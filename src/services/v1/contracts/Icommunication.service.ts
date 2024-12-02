import type { communication } from "../../../types/models";

export interface ICommunicationService {
  addCommunication(communication: {
    methodId: string;
    date: Date;
    notes: string | null;
    status: string;
  }, companyIds: string[]): Promise<[Number | null, Error | null]>;
  getNextScheduledCommunication(companyId: string): Promise<[communication | null, Error | null]>;
  getLastFiveCommunication(companyId: string): Promise<[communication[] | null, Error | null]>;
  getAllCommunications(): Promise<[communication[] | null, Error | null]>;
}