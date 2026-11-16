
import cron from "node-cron";
import fs from "node:fs/promises";
import { prisma } from "../db/prisma";

export class DocumentCleanupJob {

    public static start(): void {

        // Every night at 12:00 AM
        cron.schedule(
            "0 0 * * *",
            async () => {
                console.log("Starting document cleanup job...");

                try {
                    await this.deleteAllDocuments();
                } catch (error) {
                    console.error("Document cleanup failed:", error);
                }
            },
            {
                timezone: "Asia/Kolkata"
            }
        );

        console.log("Document cleanup cron job scheduled.");
    }

    private static async deleteAllDocuments(): Promise<void> {

        const documents = await prisma.document.findMany();

        if (documents.length === 0) {
            console.log("No documents found for cleanup.");
            return;
        }

        let deletedCount = 0;
        let failedCount = 0;

        for (const document of documents) {

            try {
                // Delete physical file from Multer storage
                try {
                    await fs.unlink(document.filePath);
                } catch (error) {
                    const fileError = error as NodeJS.ErrnoException;

                    // File already missing: database record can still be cleaned
                    if (fileError.code !== "ENOENT") {
                        throw error;
                    }
                }

                // Delete document record from PostgreSQL
                await prisma.document.delete({
                    where: {
                        id: document.id
                    }
                });

                deletedCount++;

                console.log(`Deleted document: ${document.originalName}`);

            } catch (error) {
                failedCount++;

                console.error(
                    `Failed to delete document ${document.id}:`,
                    error
                );
            }
        }

        console.log("Document cleanup completed.");
        console.log(`Deleted: ${deletedCount}`);
        console.log(`Failed: ${failedCount}`);
    }
}
