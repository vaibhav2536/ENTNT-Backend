import { PrismaClient, type Prisma } from "@prisma/client";
import type { ICommunicationRepository } from "./contracts/Icommunication.repository";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { communication } from "../../types/models";

class CommunicationRepository implements ICommunicationRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

  constructor() {
    this.prisma = new PrismaClient()
  }

  addCommunication = async (communications: {
    companyId: string;
    methodId: string;
    date: Date;
    notes: string | null;
    status: string;
  }[]): Promise<[Number | null, Error | null]> => {
    try {
      const createdRecords = await this.prisma.communication.createMany({
        data: communications,
      })
      return [createdRecords.count, null]
    } catch (error: any) {
      return [null, error]
    }
  }

  getLastFiveCommunication = async (companyId: string): Promise<[communication[] | null, Error | null]> => {
    try {
      // date must be < now
      const lastFiveCommunications = await this.prisma.communication.findMany({
        where: { companyId, date: { lt: new Date() } },
        orderBy: { date: "desc" },
        take: 5,
        include: {
          method: true,
        }
      })
      return [lastFiveCommunications, null]
    } catch (error: any) {
      return [null, error]
    }
  }

  getNextScheduledCommunication = async (companyId: string): Promise<[communication | null, Error | null]> => {
    try {
      // date must be >= now
      const nextScheduledCommunication = await this.prisma.communication.findFirst({
        where: { companyId, date: { gte: new Date() } },
        orderBy: { date: "asc" },
        include: {
          method: true,
        }
      })
      return [nextScheduledCommunication, null]
    } catch (error: any) {
      return [null, error]
    }
  }

  getAllCommunications = async (): Promise<[communication[] | null, Error | null]> => {
    try {
      const allCommunications = await this.prisma.communication.findMany({
        include: {
          company: {
            select: {
              name: true
            }
          },
          method: {
            select: {
              name: true
            }
          }
        }
      })
      return [allCommunications, null]
    } catch (error: any) {
      return [null, error]
    }
  }
}

export default CommunicationRepository;