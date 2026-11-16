export type DocumentStatus =
  | "UPLOADED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export class DocumentEntity {
  id: string;

  fileName: string;
  originalName: string;

  filePath?: string | null;
  fileType?: string | null;
  fileSize?: number | null;

  status: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    fileName: string;
    originalName: string;
    filePath?: string | null;
    fileType?: string | null;
    fileSize?: number | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;

    this.fileName = data.fileName;
    this.originalName = data.originalName;

    this.filePath = data.filePath;
    this.fileType = data.fileType;
    this.fileSize = data.fileSize;

    this.status = data.status;

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
