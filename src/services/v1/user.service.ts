import { UserRepository } from "../../db/repositories";
import { CryptoHelper, JwtHelper } from "../../helpers";
import type { user } from "../../types/models";
import logger from "../../utils/logger";
import type { IUserService, UserLoginResponse } from "./contracts/Iuser.service";

class UserService implements IUserService {
  private userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository();
  }

  createUser = async (userData: any): Promise<[user | null, Error | null]> => {
    try {
      const [userRes, userResErr] = await this.userRepository.createUser(userData);
      if (userResErr || !userRes) {
        return [null, userResErr || new Error(`Error creating user`)]
      }

      logger.info("User created")
      return [userRes, null];
    } catch (error: any) {
      logger.error("Error creating user", error)
      return [null, error]
    }
  }

  loginUser = async (email: string, password: string): Promise<[UserLoginResponse | null, Error | null]> => {
    try {
      let [user, userErr] = await this.userRepository.getUserByEmail(email);
      if (userErr || !user) {
        return [null, userErr || new Error(`User not found`)]
      }
      if (!CryptoHelper.verifyPassword(password, user?.password)) {
        logger.error(
          "Invalid password provided"
        )
        return [null, new Error("Invalid password")]
      }

      const accessToken = JwtHelper.generateAccessToken({
        user_id: user.id,
        emailId: email
      })
      const refreshToken = JwtHelper.generateRefreshToken({
        user_id: user.id,
        emailId: email
      })

      const successObject: UserLoginResponse = {
        user: user,
        access_token: accessToken,
        refresh_token: refreshToken
      }

      logger.info("User logged in")
      return [successObject, null];
    } catch (error: any) {
      logger.error("Error creating user: ", error)
      return [null, error]
    }
  }

  getUserByEmail = async (email: string): Promise<[user | null, Error | null]> => {
    try {
      const [userRes, userResErr] = await this.userRepository.getUserByEmail(email);
      if (userResErr || !userRes) {
        return [null, userResErr || new Error(`User not found`)]
      }
      return [userRes, null]
    } catch (error: any) {
      logger.error("Error while fetching user: ", error)
      return [null, error]
    }
  }
}

export default UserService;