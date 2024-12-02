import { CompanyController } from "../../controllers/v1";
import express from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";

const companyController = new CompanyController();
const companyRouter = express.Router();
const authMiddleware = new AuthMiddleware();

companyRouter.post('/',authMiddleware.authenticate, companyController.addCompany)
companyRouter.get('/',authMiddleware.authenticate, companyController.getCompanies)
companyRouter.get('/notifications',authMiddleware.authenticate, companyController.getNotifications)
companyRouter.delete('/:id',authMiddleware.authenticate, companyController.deleteCompany)

export default companyRouter;