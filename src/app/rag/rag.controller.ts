import { Request, Response } from "express";
import { APIResponse } from "../../utils/APIResponse";
import { RAGService } from "./Rag.service";
import { ApiError } from "../../utils/ApiError";

export class RAGController{
    constructor(
        private readonly ragService = new RAGService(),
    ){}

    public searchDocument = async (req: Request, res: Response): Promise<void> => {
        
        const {documentId, question} = req.body;

        if (!documentId) throw new ApiError( "Document ID is required", 400, ); 
        if (!question?.trim()) throw new ApiError( "Question is required", 400, );

        const data = await this.ragService.ask(documentId, question.trim());

        res.status(200).json( new APIResponse("Answer Fetch Successfully", 200, data))
    }
}