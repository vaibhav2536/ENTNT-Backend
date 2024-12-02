import { Prisma, PrismaClient } from "@prisma/client";
import type { ICompanyRepository } from "./contracts/Icompany.repository";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { company } from "../../types/models";

class CompanyRepository implements ICompanyRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

  constructor() {
    this.prisma = new PrismaClient()
  }

  addCompany = async (companyData: any): Promise<[company | null, Error | null]> => {
    try {
      const company = await this.prisma.company.create({
        data: companyData
      })
      if (!company) {
        return [null, new Error(`Couldn't create company`)]
      }

      return [company, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  getCompanies = async (): Promise<[company[] | null, Error | null]> => {
    try {
      const companies = await this.prisma.company.findMany({
        include: {
          communications: true
        }
      })
      if (!companies) {
        return [null, new Error(`No companies found`)]
      }

      return [companies, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  getCompanyById = async (id: string): Promise<[company | null, Error | null]> => {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id }
      })
      if (!company) {
        return [null, new Error(`Company not found`)]
      }

      return [company, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  updateCompany = async (id: string, companyData: any): Promise<[company | null, Error | null]> => {
    try {
      const updatedCompany = await this.prisma.company.update({
        where: { id },
        data: companyData
      })
      return [updatedCompany, null]
    } catch (error: any) {
      return [null, error];
    }
  }

  deleteCompany = async (id: string): Promise<[company | null, Error | null]> => {
    try {
      await this.prisma.communication.deleteMany({
        where: { companyId: id },
      });
  
      const deletedCompany = await this.prisma.company.delete({
        where: { id },
      });
      
      return [deletedCompany, null]
    } catch (error: any) {
      return [null, error];
    }
  }

  getNotifications = async (): Promise<[{ overdue: company[], today: company[] } | null, Error | null]> => {
    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const company1 = await this.prisma.company.findMany({
        where: {
          communications: {
            some: {
              status: 'pending',
              date: { lt: startOfDay }
            }
          },
        },
        include: {
          communications: true,
        }
      })

      const company2 = await this.prisma.company.findMany({
        where: {
          communications: {
            some: {
              status: 'pending',
              date: {
                gte: startOfDay,
                lte: endOfDay,
              }
            }
          },
        },
        include: {
          communications: true,
        }
      })
      const result = {
        overdue: company1,
        today: company2,
      }
      return [result, null]
    } catch (error: any) {
      return [null, error]
    }
  }
}

export default CompanyRepository