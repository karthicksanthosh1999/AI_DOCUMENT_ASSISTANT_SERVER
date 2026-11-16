import { Groq } from "groq-sdk";

export class AIProvider{
    private readonly groq: Groq;
    constructor(){
        this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY})
    };

    public async generate(systemPrompt: string, userPrompt: string): Promise<string> {
        const response = await this.groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages:[{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
            temperature: 0.2
        })

        return ( response.choices[0]?.message?.content ?? "")
    }
}