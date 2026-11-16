import { AIProvider } from "./groq.provider";

export class AIService{
    constructor(
        private readonly aIProvider = new AIProvider(),
    ){}

    public async ask(question: string){
        const prompt = `
        You are a helpful AI assistant.
         answer the user's question clearly and accurately. And return the JSON format.

         User Question:
         ${question}
        `;
        const jsonFormat = JSON.parse(await this.aIProvider.generate(prompt))
        return jsonFormat?.answer;
    }
}