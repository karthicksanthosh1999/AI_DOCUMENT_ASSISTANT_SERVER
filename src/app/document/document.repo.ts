
import { DocumentEntity } from "./document.entity";
import { prisma } from "../../db/prisma";
import { CreateDocumentInput } from "./document.interface";

export class DocumentRepository {
    public async create(data: CreateDocumentInput): Promise<DocumentEntity>{
        return await prisma.document.create({ data: {
            fileName: data.data.fileName,
            filePath: data.data?.filePath!,
            fileSize: data?.data?.fileSize!,
            fileType: data.data?.fileType!,
            originalName: data.data.originalName,
        } })
    };

    public async findAll(): Promise<DocumentEntity[]> { 
        return await prisma.document.findMany({ orderBy: { createdAt: "desc", }, }); 
    }; 
    
    public async findById( id: string, ): Promise<DocumentEntity | null> { 
        return await prisma.document.findUnique({ where: { id }, }); 
    };

    public async delete( id: string, ): Promise<DocumentEntity> { 
        return await prisma.document.delete({ where: { id } }); 
    };
}