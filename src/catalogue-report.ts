import { join } from 'node:path';
import type { CatalogueRun, ProductRow } from './catalogue-model.js';
import { writeJson, writeText } from './shared.js';

const csv = (value: unknown): string => {
  const text = typeof value === 'string' ? value : value === null || value === undefined ? '' : JSON.stringify(value);
  // Avoid spreadsheet formula execution when opening untrusted catalogue text.
  const safe = /^[=+@-]/.test(text) ? "'" + text : text;
  return '"' + safe.replaceAll('"', '""') + '"';
};
const md = (value: unknown) => String(value ?? '—').replaceAll('|', '\\|').replaceAll('\r', '').replaceAll('\n', ' ');
const price = (row: ProductRow, source: 'api' | 'catalogue' | 'detail') =>
  source === 'detail' ? row.detail?.price : row[source][0]?.price;
const name = (row: ProductRow, source: 'api' | 'catalogue' | 'detail') =>
  source === 'detail' ? row.detail?.name : row[source][0]?.name;
const status = (row: ProductRow, key: string) => row.checks[key]?.status ?? 'blocked';
const sourcePresence = (run: CatalogueRun, row: ProductRow, source: 'api' | 'catalogue'): 'true' | 'false' | 'unknown' => {
  if (row[source].length > 0) return 'true';
  return run.sources.find(record => record.name === source)?.status === 'pass' ? 'false' : 'unknown';
};

export function catalogueCsv(run: CatalogueRun): string {
  const headers = ['product_id', 'checked_at', 'detail_url', 'api_present', 'catalogue_present', 'api_name', 'catalogue_name', 'detail_name', 'api_price',
    'catalogue_price', 'detail_price', 'source_agreement', 'name_agreement', 'price_agreement', 'document_http',
    'product_content', 'title', 'title_present', 'heading_tag', 'heading_text', 'heading_present', 'image_url',
    'image_http', 'image_available', 'image_decoded', 'image_width', 'image_height', 'alt_present', 'alt_text',
    'alt_nonempty', 'factual_findings', 'content_review', 'blocked_checks', 'evidence'];
  const rows = run.rows.map(row => [
    row.id, row.checkedAt, row.detailUrl, sourcePresence(run, row, 'api'), sourcePresence(run, row, 'catalogue'), name(row, 'api'), name(row, 'catalogue'), name(row, 'detail'),
    price(row, 'api'), price(row, 'catalogue'), price(row, 'detail'), status(row, 'sourceAgreement'),
    status(row, 'nameAgreement'), status(row, 'priceAgreement'), row.detail?.httpStatus, status(row, 'productContent'),
    row.detail?.title, status(row, 'titlePresent'), row.detail?.heading.tag, row.detail?.heading.text,
    status(row, 'primaryHeadingPresent'), row.detail?.image.url, row.detail?.image.httpStatus, status(row, 'imageAvailability'),
    status(row, 'imageDecoded'), row.detail?.image.width, row.detail?.image.height, status(row, 'alternativeTextPresent'),
    row.detail?.image.altText, status(row, 'alternativeTextNonEmpty'), row.factualFindings.join('; '),
    row.contentReviewFlags.join('; '), Object.entries(row.checks).filter(([, check]) => check.status === 'blocked')
      .map(([key, check]) => key + ': ' + check.detail).join('; '), row.evidence.join('; '),
  ]);
  return [headers, ...rows].map(row => row.map(csv).join(',')).join('\n') + '\n';
}

export function catalogueMarkdown(run: CatalogueRun): string {
  const failures = run.rows.filter(row => row.factualFindings.length);
  const review = run.rows.filter(row => row.contentReviewFlags.length);
  const lines = [
    '# Catalogue audit ' + run.runId,
    '',
    '**Coverage: ' + (run.coverageComplete ? 'COMPLETE' : 'INCOMPLETE — do not treat blocked checks as passes') + '.**',
    '',
    'Collection/report window: ' + run.startedAt + ' to ' + run.finishedAt + ' (UTC). Duration: ' + (run.durationMs / 1000).toFixed(2) + ' seconds.',
    '',
    'Inventory: API ' + run.inventory.apiUnique + ', catalogue ' + run.inventory.catalogueUnique + ', union ' + run.inventory.union +
      '. Visited: ' + run.inventory.attempted + '; all checks completed: ' + run.inventory.completed + '; products with blocked checks: ' + run.inventory.blocked + '.',
    '',
    'Factual attention: ' + failures.length + ' products. Editorial/content review: ' + review.length +
      ' products. These are separate from confirmed developer defects; investigate repeated failures before issue classification.',
    '',
    'Fresh live sources and rendered Chromium detail pages were checked. Page/image availability describes reachability; this report is not a full WCAG audit.',
    'The product-scoped heading can be h2. A missing h1 alone does not establish a missing primary heading. Titles and alternative text are checked for presence separately from wording quality.',
    'Prices use integer minor units and displayed currency; Rs. is not assigned a national currency.',
    '',
    '## Source health and service failures',
    '',
    '| Source | Status | HTTP | Records | Error |',
    '|---|---|---:|---:|---|',
    ...run.sources.map(source => '| ' + [source.name, source.status, source.httpStatus, source.recordCount, source.error].map(md).join(' | ') + ' |'),
    '',
    ...(run.serviceErrors.length ? run.serviceErrors.map(error => '- ' + md(error)) : ['No collection service errors recorded.']),
    '',
    '## All discovered products',
    '',
    'The JSON and CSV include raw values, per-check explanations, dimensions, missing-source records and evidence paths.',
    'CSV api_present and catalogue_present values: true = observed; false = absent from a successfully collected source; unknown = source failure or incomplete discovery prevents confirming absence.',
    '',
    '| ID / product | Names | Prices | Page | Title | Heading | Image HTTP / decode | Alt present / nonempty | Review / blocked |',
    '|---|---|---|---|---|---|---|---|---|',
    ...run.rows.map(row => {
      const blocked = Object.entries(row.checks).filter(([, check]) => check.status === 'blocked').map(([key]) => key);
      return '| ' + [
        '[' + md(row.id + ': ' + (name(row, 'detail') ?? name(row, 'catalogue') ?? name(row, 'api') ?? 'Unknown')) + '](' + row.detailUrl + ')',
        status(row, 'nameAgreement'), status(row, 'priceAgreement'),
        status(row, 'detailAvailability') + ' / HTTP ' + (row.detail?.httpStatus ?? 'unknown'),
        status(row, 'titlePresent') + ': ' + (row.detail?.title ?? 'unknown'),
        status(row, 'primaryHeadingPresent') + ': ' + (row.detail?.heading.tag ?? '—') + ' ' + (row.detail?.heading.text ?? ''),
        status(row, 'imageAvailability') + ' / ' + status(row, 'imageDecoded'),
        status(row, 'alternativeTextPresent') + ' / ' + status(row, 'alternativeTextNonEmpty'),
        [row.factualFindings.join('; '), row.contentReviewFlags.join('; '), blocked.length ? 'Blocked: ' + blocked.join(', ') : ''].filter(Boolean).join('; '),
      ].map(md).join(' | ') + ' |';
    }),
    '',
    '## Evidence and repeatability',
    '',
    '- Run metadata and full extracted facts: [catalogue.json](catalogue.json).',
    '- Filterable catalogue: [catalogue.csv](catalogue.csv).',
    '- Immediate per-product checkpoint: [checkpoint.jsonl](checkpoint.jsonl).',
    '- Captured source responses, rendered HTML, semantic records and relevant screenshots: evidence/ within this run folder.',
    '- Run npm run catalogue:refresh after dependency and Chromium installation.',
    '- A new timestamped folder is generated each time; historical values are not reused.',
    '- Controlled document/API/probe starts are paced; browser-loaded assets are normal navigation traffic and are not an artificial load test.',
    '',
    'Environment: ' + JSON.stringify(run.environment) + '.',
    'Configuration: ' + JSON.stringify(run.config) + '.',
    '',
  ];
  return lines.join('\n');
}

export async function writeCatalogueReports(run: CatalogueRun): Promise<void> {
  await writeJson(join(run.outputDir, 'catalogue.json'), run);
  await writeText(join(run.outputDir, 'catalogue.csv'), catalogueCsv(run));
  await writeText(join(run.outputDir, 'catalogue.md'), catalogueMarkdown(run));
}
