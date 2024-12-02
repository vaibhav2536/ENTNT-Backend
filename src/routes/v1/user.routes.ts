import { UserController } from "../../controllers/v1";
import express from "express";

const userController = new UserController();
const userRouter = express.Router();

userRouter.post('/', userController.createUser)
userRouter.post('/login', userController.login)

export default userRouter;