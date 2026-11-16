import { Request, Response } from "express";
import { DocumentService } from "./document.service";
import { APIResponse } from "../../utils/APIResponse";
import { ApiError } from "../../utils/ApiError";

export class DocumentController {
    constructor(
        private readonly documentService = new DocumentService()
    ){}

    public create = async(req: Request, res: Response): Promise<void> => {
        const data = req.file;
                
        if(!data) throw new ApiError("File not found", 400)
        
        const document = await this.documentService.create({
            data: {
                fileName: data?.filename,
                originalName: data?.originalname,
                filePath: data?.path,
                fileSize: data?.size,
                fileType: data.mimetype
            }
        });        
        res.status(201).json(
           new APIResponse("Document Upload Successfully", 201, document)
        );
    };

    public findAll = async(req: Request, res: Response): Promise<void> => {
        const data = await this.documentService.findAll();
        res.status(200).json(new APIResponse("All Document Fetch Successfully", 200, data));
    };

    public delete = async(req: Request<{id: string}>, res: Response): Promise<void> => {
        const { id } = req.params;
        const data = await this.documentService.delete(id);
        
        res.status(200).json(new APIResponse("Document Deleted Successfully", 200, data))
    }
}