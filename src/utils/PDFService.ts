import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

export class PDFService {
    public async extractText(filePath: string): Promise<string> {
        const buffer = await fs.readFile(filePath);
        const pdf = new PDFParse({ data: buffer });
        const data = await pdf.getText();
        return data.text.replace(/\s+/g," ").trim();
    }
}