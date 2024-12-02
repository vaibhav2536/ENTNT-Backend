import type { user } from "../../../types/models"

export interface IUserRepository {
  createUser(user: any): Promise<[user | null, Error | null]>
  getUserByEmail(email: string): Promise<[user | null, Error | null]>
}