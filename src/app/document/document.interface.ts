export interface CreateDocumentInput { 
    data: { 
        fileName: string; 
        originalName: string; 
        filePath?: string | null; 
        fileType?: string | null; 
        fileSize?: number | null; 
    }; 
}