import { Prisma, PrismaClient } from "@prisma/client";
import type { IUserRepository } from "./contracts/Iuser.repository";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { user } from "../../types/models";
import { CryptoHelper } from "../../helpers";

class UserRepository implements IUserRepository {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

  constructor() {
    this.prisma = new PrismaClient();
  }

  createUser = async (userData: {
    email: string;
    password: string;
    username: string;
  }): Promise<[user | null, Error | null]> => {
    try {
      userData.password = CryptoHelper.hashPassword(userData.password);
      const user = await this.prisma.user.create({
        data: userData,
      })
      if (!user) {
        return [null, new Error(`Error creating user`)]
      }

      return [user, null]
    } catch (error: any) {
      return [null, error]
    }
  }

  getUserByEmail = async (email: string): Promise<[user | null, Error | null]> => {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      })
      if (!user) {
        return [null, new Error(`User not found with email ${email}`)]
      }
      return [user, null]
    } catch (error: any) {
      return [null, error]
    }
  }
}

export default UserRepository;