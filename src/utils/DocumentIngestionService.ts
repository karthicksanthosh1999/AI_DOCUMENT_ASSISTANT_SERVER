import { DocumentChunkRepository } from "../app/chunk/chunk.repository";
import { ChunkService } from "./ChunkService";
import { EmbeddingService } from "./EmbeddubgServuce";
import { PDFService } from "./PDFService";

export class DocumentIngestionService {
    constructor(
        private readonly pdfService = new PDFService(),
        private readonly chunkService = new ChunkService(),
        private readonly embeddingService = new EmbeddingService(),
        private readonly documentChunkRepository = new DocumentChunkRepository()
    ){}

    public async processDocument (documentId: string, filePath: string): Promise<void> {

        // 1. Extract PDF 
        console.log("1. Extracting PDF text...");
        const text = await this.pdfService.extractText(filePath);

        console.log("PDF text length: ",text.length);
        console.log( "PDF word count:", text.split(/\s+/).length, );

        if(!text.trim()) throw new Error("No text could be extracted from the PDF");

        // 2. Create chunks 
        console.log("2. Creating chunks...");
        const chunks = this.chunkService.createChunk(text);

        // 3. Generate embeddings 
        console.log("3. Generating embeddings...");
        for(const chunk of chunks){
            
            const embedding = await this.embeddingService.generateEmbedding(chunk.content);
            await this.documentChunkRepository.create({
                documentId,
                chunkIndex: chunk.chunkIndex,
                content: chunk.content,
                embedding
            })

        };
        console.log("Document ingestion completed");
        return;
    }

}