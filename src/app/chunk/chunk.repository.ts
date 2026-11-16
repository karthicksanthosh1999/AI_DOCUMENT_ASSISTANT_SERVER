import { prisma } from "../../db/prisma";

export interface CreateChunkInput {
    documentId: string; 
    chunkIndex: number; 
    content: string; 
    embedding: number[];
};

export interface SimilarChunk { 
    id: string; 
    documentId: string; 
    chunkIndex: number; 
    content: string; 
    similarity: number; 
};

export class DocumentChunkRepository {
    public async create(data: CreateChunkInput): Promise<void> {
        const vector = `[${data.embedding.join(",")}]`;
        await prisma.$executeRaw`
            INSERT INTO "DocumentChunk" ( "id", "documentId", "chunkIndex", "content", "embedding", "createdAt" ) 
            VALUES 
            ( gen_random_uuid(), ${data.documentId}, ${data.chunkIndex}, ${data.content}, ${vector}::vector, NOW() ) `;
    };
    
    public async searchSimilar(documentId: string, embedding: number[], limit = 5): Promise<SimilarChunk[]> {
        const vector = `[${embedding.join(",")}]`;
        const chunk = await prisma.$queryRaw<SimilarChunk[]>`SELECT "id","documentId","chunkIndex","content", 1- ("embedding" <=> ${vector}::vector) AS similarity 
        FROM "DocumentChunk"
        WHERE "documentId" = ${documentId}
        ORDER BY "embedding" <=> ${vector}::vector
        LIMIT ${limit}
        `;
        return chunk;
    }
}