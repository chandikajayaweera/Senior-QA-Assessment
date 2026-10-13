import { collectCatalogue } from '../src/catalogue.js';
import { writeCatalogueReports } from '../src/catalogue-report.js';

const run = await collectCatalogue();
const collectionDurationMs = run.durationMs;
await writeCatalogueReports(run);
// Include generation of usable reports in refresh timing, then persist the final metadata.
run.environment.collectionDurationMs = collectionDurationMs;
run.finishedAt = new Date().toISOString();
run.durationMs = Date.now() - Date.parse(run.startedAt);
run.environment.reportTargetMet = run.durationMs <= run.config.reportTargetMs;
await writeCatalogueReports(run);
console.log(JSON.stringify({
  runId: run.runId, outputDir: run.outputDir, durationSeconds: Number((run.durationMs / 1000).toFixed(2)),
  coverageComplete: run.coverageComplete, inventory: run.inventory, serviceErrors: run.serviceErrors,
}, null, 2));
process.exitCode = !run.coverageComplete ? 2 : run.rows.some(row => row.factualFindings.length) ? 1 : 0;
