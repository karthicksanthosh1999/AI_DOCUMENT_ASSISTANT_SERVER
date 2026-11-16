import { DocumentChunkRepository, SimilarChunk } from "../chunk/chunk.repository";
import { EmbeddingService } from "../../utils/EmbeddubgServuce";
import { AIProvider } from "../ai/groq.provider";

export interface RAGResponse { 
    answer: string; 
    sources: { 
        chunkIndex: number; 
        content: string; 
        similarity: number; 
    }[] 
};

export class RAGService {
    constructor(
        private readonly embeddingService = new EmbeddingService(),
        private readonly documentChunkRepository = new DocumentChunkRepository(),
        private readonly groqProvider = new AIProvider(),
    ){}
    

    public async ask(documentId:string, question:string):Promise<RAGResponse> {
        const questionEmbedding = await this.embeddingService.generateEmbedding(question);
        const chunks = await this.documentChunkRepository.searchSimilar(documentId, questionEmbedding);
        const context = this.buildContext(chunks);

        const systemPrompt = ` You are an AI document assistant. Your job is to answer questions using ONLY the provided document context. Rules: - Use only information available in the context. - Do not invent information. - Do not use outside knowledge. - If the answer is not available in the context, say: "The information is not available in the document." - Give a clear and concise answer. `; 
        
        console.log(context, question.trim())

        const userPrompt = `Document Context: ${context} User Question: ${question} Answer the question using only the document context.`;

        const answer = await this.groqProvider.generate( systemPrompt, userPrompt );
        return { 
            answer, 
            sources: chunks.map((chunk) => ({ 
                chunkIndex: chunk.chunkIndex, 
                content: chunk.content, 
                similarity: Number(chunk.similarity)
            })), 
        }; 
    }

    public async search(documentId: string, question: string){    
        const questionEmbedding = await this.embeddingService.generateEmbedding(question);
        const chunks = await this.documentChunkRepository.searchSimilar(documentId, questionEmbedding, 5);
        return chunks;
    };

    public buildContext(chunks: SimilarChunk[]): string {
        return chunks.map((chunk) => `[Chunk ${chunk.chunkIndex}] ${chunk.content}`).join("\n\n");
    }

}