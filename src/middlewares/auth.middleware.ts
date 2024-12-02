import type { NextFunction, Response } from "express";
import { UserService } from "../services/v1";
import { JwtHelper } from "../helpers";

import logger from "../utils/logger";
import {
  InternalServerErrorResponse,
  UnauthorizedResponse,
} from "../utils/responses";

class AuthMiddleware {
  async authenticate(req: any, res: Response, next: NextFunction) {
    try {
      const token = JwtHelper.extractToken(req);
      if (!token) {
        return UnauthorizedResponse.send(
          res,
          "Access denied. No token provided.",
        );
      }

      const decoded = JwtHelper.decode(token);
      if (!decoded) {
        return UnauthorizedResponse.send(
          res,
          "Access denied. Invalid token provided.",
        );
      }

      const verified: any = JwtHelper.verify(token);
      if (!verified) {
        return UnauthorizedResponse.send(
          res,
          "Access denied. Invalid token provided.",
        );
      }
      // console.log(verified)
      const userService = new UserService();
      const [userRes, userErr] = await userService.getUserByEmail(
        verified?.user?.emailId || verified?.user?.email,
      );
      // console.log(userRes)
      if (userErr) {
        logger.error(`Error getting user: ${userErr?.message}`, userErr);
        return UnauthorizedResponse.send(res, "Access denied, Invalid token.");
      }
      // const [userRes, userErr] = await userService.getUserById(
      //  verified?.user?.user_id,
      //);
      //if (userErr) {
      // logger.error(`Error getting user: ${userErr.message}`, userErr);
      //return UnauthorizedResponse.send(
      // res,
      // 'Access denied. Invalid token provided.',
      //);
      //}

      req.user = userRes;
      return next();
    } catch (error: any) {
      console.log(error);
      return InternalServerErrorResponse.send(res, error.message);
    }
  }

  async authorize(req: any, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      if (user.role !== "admin") {
        return UnauthorizedResponse.send(
          res,
          "Access denied. Only admins can perform this action.",
        );
      }

      return next();
    } catch (error: any) {
      console.log(error);
      return InternalServerErrorResponse.send(res, error.message);
    }
  }
}

export default AuthMiddleware;
