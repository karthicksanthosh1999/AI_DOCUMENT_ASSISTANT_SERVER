import { Router } from "express";
import { DocumentController } from "./document.controller";
import multer from 'multer';

const documentRouter = Router();
const upload = multer({ dest: "uploads/" })

const documentController = new DocumentController();

documentRouter.post("/", upload.single('document'), documentController.create);
documentRouter.get("/", documentController.findAll);
documentRouter.delete("/:id", documentController.delete)

export default documentRouter;