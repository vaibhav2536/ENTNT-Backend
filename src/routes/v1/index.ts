import express from "express";
import userRouter from "./user.routes";
import companyRouter from "./company.routes";
import communicationMethodRouter from "./communication_method.routes";
import communicationRouter from "./communication.routes";

const v1Router = express.Router();

v1Router.use('/user', userRouter)
v1Router.use('/company', companyRouter)
v1Router.use('/communication-method', communicationMethodRouter)
v1Router.use('/communication', communicationRouter)

export default v1Router;
