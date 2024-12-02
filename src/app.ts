import express from "express"
import type { Request, Response } from "express";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "./utils/logger";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "./utils/responses";
import v1Router from "./routes/v1";

const app = express();

app.use(helmet());
app.use(
  morgan(
    (tokens, req, res) => {
      return JSON.stringify({
        methods: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res) || "0"),
        content_length: tokens.res(req, res, "content-length"),
        response_time: Number.parseFloat(
          tokens["response-time"](req, res) || "0",
        ),
      });
    },
    {
      stream: {
        write: (message: any) => {
          logger.log("info", message);
        },
      },
    },
  ),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().none());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://zapmail.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);

app.use("/v1", v1Router);

app.get("/", (_: Request, res: Response) => {
  try {
    logger.log("info", "Welcome to the Zapmail backend!", {
      file: "index.js",
      timestamp: new Date().toISOString(),
    });
    return SuccessResponse.send(res, {}, "Welcome to the Zapmail backend!");
  } catch (error: any) {
    logger.error(`Error in getting root: ${error.message}`, error);
    return InternalServerErrorResponse.send(res, "Internal Server Error");
  }
});

export default app;
