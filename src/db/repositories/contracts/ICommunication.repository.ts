import type { communication } from "../../../types/models";

export interface ICommunicationRepository {
  addCommunication(communications: {
    companyId: string;
    methodId: string;
    date: Date;
    notes: string | null;
    status: string;
  }[]): Promise<[Number | null, Error | null]>;
  getNextScheduledCommunication(companyId: string): Promise<[communication | null, Error | null]>;
  getLastFiveCommunication(companyId: string): Promise<[communication[] | null, Error | null]>;
  getAllCommunications(): Promise<[communication[] | null, Error | null]>
}