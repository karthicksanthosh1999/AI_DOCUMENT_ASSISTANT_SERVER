export interface TextChunk {
    content: string;
    chunkIndex: number;
}

export class ChunkService {

    public createChunk(text: string, chunkSize= 1000, overlap= 200) : TextChunk[]{
        const words = text.split(/\s+/);
        const chunks: TextChunk[] = [];

        let start =0;
        let chunkIndex = 0;

        while(start < words.length){

            const end = Math.min(start + chunkSize, words.length);
            const chunk = words.slice(start, end).join(" ");
            
            chunks.push({ content: chunk, chunkIndex });

            chunkIndex++;

            start += chunkSize - overlap;
        }
        return chunks;
    }
}