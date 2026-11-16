import { Router } from "express";
import { AIController } from "./ai.controller";

const aiRouter = Router();

const aiController = new AIController();

aiRouter.post("/ask", aiController.ask);

export default aiRouter;