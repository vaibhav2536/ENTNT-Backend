import type { Response } from "express";
import { UserService } from "../../services/v1";
import logger from "../../utils/logger";
import { InternalServerErrorResponse, SuccessResponse } from "../../utils/responses";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: any, res: Response): Promise<any> => {
    try {
      const {
        username,
        password,
        email,
      } = req.body;

      const [userRes, userResErr] = await this.userService.createUser({
        username,
        password,
        email,
      })
      if (userResErr) {
        logger.error(
          `Error creating user ${userResErr.message}`,
          userResErr
        )
        return InternalServerErrorResponse.send(res, userResErr?.message)
      }

      delete (userRes as { password?: string }).password;

      logger.info("User created")
      return SuccessResponse.send(res, userRes, "User created")
    } catch (error: any) {
      logger.error(
        `Error creating user: ${error.message}`,
        error
      )
      return InternalServerErrorResponse.send(res, error.message)
    }
  }
  
  login = async (req: any, res: Response) => {
    try {
      const { email, password } = req.body;
      const [userRes, userResErr] = await this.userService.loginUser(email, password)
      if (userResErr) {
        logger.error(
          `Error logging in user ${userResErr.message}`,
          userResErr
        )
        return InternalServerErrorResponse.send(res, userResErr?.message)
      }
      
      delete (userRes?.user as { password?: string }).password;
      logger.info("User logged in")
      return SuccessResponse.send(res, userRes, "User logged in")
    } catch (error: any) {
      logger.error(
        `Error logging in user: ${error.message}`,
        error
      )
      return InternalServerErrorResponse.send(res, error.message)
    }
  }
}

export default UserController;