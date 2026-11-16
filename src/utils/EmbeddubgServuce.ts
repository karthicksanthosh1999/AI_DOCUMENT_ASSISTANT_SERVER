import { pipeline } from "@xenova/transformers";

export class EmbeddingService{
    private extractor: any;
    private async getExtractor() {
        if(!this.extractor){
            this.extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")
        };
        return this.extractor;
    };

    public async generateEmbedding(text: string): Promise<number[]> {
        const extractor = await this.getExtractor();

        const output = await extractor(text, {
            pooling: "mean",
            normalize: true
        });
        return Array.from(output.data);
    }
}