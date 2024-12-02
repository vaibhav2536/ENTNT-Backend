import { CommunicationMethodController } from "../../controllers/v1";
import express from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";

const communicationMethodController = new CommunicationMethodController();
const communicationMethodRouter = express.Router();
const authMiddleware = new AuthMiddleware()

communicationMethodRouter.get('/', authMiddleware.authenticate, communicationMethodController.getCommunicationMethods)

communicationMethodRouter.post('/', authMiddleware.authenticate, communicationMethodController.addCommunicationMethod)

export default communicationMethodRouter