import "dotenv/config";
import { App } from "./app";
import { DocumentCleanupJob } from "./jobs/document-cleanup.job";

const PORT = Number(process.env.PORT) || 5000;

const application = new App();

DocumentCleanupJob.start();

application.app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
})