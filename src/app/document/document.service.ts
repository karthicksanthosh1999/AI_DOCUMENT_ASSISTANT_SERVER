import { ApiError } from "../../utils/ApiError";
import { DocumentIngestionService } from "../../utils/DocumentIngestionService";
import { DocumentEntity } from "./document.entity";
import { CreateDocumentInput } from "./document.interface";
import { DocumentRepository } from "./document.repo";
import fs from "node:fs/promises";

export class DocumentService {
    constructor(
        private readonly documentRepository = new DocumentRepository(),
        private readonly documentIngestionService = new DocumentIngestionService()
    ){}

    public async create(data: CreateDocumentInput): Promise<DocumentEntity> {
        const documentData =  await this.documentRepository.create(data);
        await this.documentIngestionService.processDocument(documentData.id, documentData.filePath!)
        return documentData;
    };

    public async findAll(): Promise<DocumentEntity[]> { 
        return await this.documentRepository.findAll() 
    };

    public async findById(userId: string, id: string): Promise<DocumentEntity> {
        const document = await this.documentRepository.findById( id ); 
        if (!document) { throw new ApiError("Document not found", 404);
        } 
        return document; 
    };
    
    public async delete(id: string): Promise<DocumentEntity> {
        const document = await this.documentRepository.findById( id ); 

        if (!document) throw new ApiError("Document not found", 404); 

        try {
            await fs.unlink(document.filePath!);
        } catch (error : any) {
            if(error.code !== "ENOENT"){
                throw error;
            }
        }

        return await this.documentRepository.delete(id)
    };


}