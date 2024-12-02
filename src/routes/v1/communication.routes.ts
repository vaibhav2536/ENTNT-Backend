import { CommunicationController } from "../../controllers/v1";
import express from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";

const communicationController = new CommunicationController();
const communicationRouter = express.Router();
const authMiddleware = new AuthMiddleware();

communicationRouter.post('/',authMiddleware.authenticate, communicationController.addConversation)

communicationRouter.post('/next-n-past',authMiddleware.authenticate, communicationController.getPastNScheduledCommunication)

communicationRouter.get('/all', authMiddleware.authenticate, communicationController.getAllCommunications)

export default communicationRouter;