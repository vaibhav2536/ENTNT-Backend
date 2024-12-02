import { Prisma, PrismaClient } from "@prisma/client";
import type { ICommunicationMethodRepository } from "./contracts/Icommunication_method.repository";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { communicationMethod } from "../../types/models";

class CommunicationMethodRepository implements ICommunicationMethodRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

  constructor() {
    this.prisma = new PrismaClient()
  }

  addCommunicationMethod = async (data: any): Promise<[communicationMethod | null, Error | null]> => {
    try {
      const communicationMethod = await this.prisma.communicationMethod.create({
        data: data
      })
      if (!communicationMethod) {
        return [null, new Error(`Error creating communication method`)]
      }

      return [communicationMethod, null]
    } catch (error: any) {
      return [null, error]
    }
  }

  editCommunicationMethod = async (data: any): Promise<[communicationMethod | null, Error | null]> => {
    try {
      const communicationMethod = await this.prisma.communicationMethod.update({
        where: { id: data.id },
        data: data
      })
      if (!communicationMethod) {
        return [null, new Error(`Communication method not found`)]
      }
      return [communicationMethod, null]
    } catch (error: any) {
      return [null, error]
    }
  }

  getCommunicationMethods = async (): Promise<[communicationMethod[] | null, Error | null]> => {
    try {
      const communicationMethods = await this.prisma.communicationMethod.findMany()
      if (!communicationMethods) {
        return [null, new Error(`Communication methods not found`)]
      }
      return [communicationMethods, null]
    } catch (error: any) {
      return [null, error]
    }
  }

  deleteCommunicationMethod = async (id: string): Promise<[communicationMethod | null, Error | null]> => {
    try {
      const communicationMethod = await this.prisma.communicationMethod.delete({
        where: { id }
      })
      if (!communicationMethod) {
        return [null, new Error(`Communication method not found`)]
      }
      return [communicationMethod, null]
    } catch (error: any) {
      return [null, error]
    }
  }

  getCommunicationMethodByName = async (name: string): Promise<[communicationMethod | null, Error | null]> => {
    try {
      const communicationMethod = await this.prisma.communicationMethod.findUnique({
        where: { name }
      })
      if (!communicationMethod) {
        return [null, new Error(`Communication method not found with name ${name}`)]
      }
      return [communicationMethod, null]
    } catch (error: any) {
      return [null, error]
    }
  }
}

export default CommunicationMethodRepository;