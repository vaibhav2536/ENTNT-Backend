import type { user } from "../../../types/models";

export interface IUserService {
  createUser(userData: any): Promise<[user | null, Error | null]>
  loginUser(email: string, password: string): Promise<[UserLoginResponse | null, Error | null]>
  getUserByEmail(email: string): Promise<[user | null, Error | null]>
}

export type UserLoginResponse = {
  user: user;
  access_token: string;
  refresh_token: string;
};