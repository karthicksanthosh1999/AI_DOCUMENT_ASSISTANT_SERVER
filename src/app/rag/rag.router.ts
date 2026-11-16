import { Router } from "express";
import { RAGController } from "./rag.controller";

const ragRouter = Router();

const ragController = new RAGController();

ragRouter.post("/ask", ragController.searchDocument);

export default ragRouter;