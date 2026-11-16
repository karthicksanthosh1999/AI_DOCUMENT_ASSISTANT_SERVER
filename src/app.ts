import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorMiddleware } from "./middlewares/error.middleware";
import documentRouter from './app/document/document.router';
import aiRouter from './app/ai/ai.route';
import ragRouter from './app/rag/rag.router';

export class App {
    public readonly app = express();

    constructor(){
         this.initializedMiddlewares();
         this.initializeRoutes();
         this.initializeErrorHandling();
    }

    private initializedMiddlewares(){
        this.app.use(cors({
                origin: "http://localhost:5173",
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
                allowedHeaders: ["Content-Type", "Authorization"],
                credentials: true,
            }));
        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    private initializeRoutes(){
        this.app.use("/api/document", documentRouter);
        this.app.use("/api/ai", aiRouter);
        this.app.use("/api/rag", ragRouter);
    }

    private initializeErrorHandling(){
        this.app.use(errorMiddleware.handle)
    }
}