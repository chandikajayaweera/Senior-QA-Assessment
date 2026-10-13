import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assessProduct, blockedProduct, parseProductsApi, reconcileCatalogueLinks, reconcileInventory, summarizeRows, type CatalogueRun, type DetailFacts, type ProductRow, type SourceRecord } from '../src/catalogue-model.js';
import { catalogueCsv, catalogueMarkdown } from '../src/catalogue-report.js';
import { normalizeName, parsePrice } from '../src/shared.js';

const base = 'https://automationexercise.com';
const value = { id: '1', name: 'Blue Top', price: 'Rs. 500' };
const item = () => reconcileInventory([value], [{ ...value, detailUrl: base + '/product_details/1' }], base)[0]!;
const facts = (): DetailFacts => ({
  httpStatus: 200, finalUrl: base + '/product_details/1', productRegionPresent: true,
  name: 'Blue Top', price: 'Rs. 500', title: 'Blue Top - Shop', heading: { tag: 'h2', text: 'Blue Top' },
  image: { url: base + '/get_product_picture/1', httpStatus: 200, contentType: 'image/jpeg', present: true,
    decoded: true, width: 600, height: 800, altPresent: true, altText: 'Blue sleeveless top' },
});
const sources = (): SourceRecord[] => ['api', 'catalogue'].map(name => ({
  name: name as 'api' | 'catalogue', status: 'pass', httpStatus: 200, observedAt: '2026-10-09T00:00:00Z',
  urls: [base], recordCount: 1, evidence: [],
}));

test('inventory uses union and removes identical duplicate representations', () => {
  const rows = reconcileInventory([value, value, { id: '11', name: 'API only', price: 'Rs. 20' }],
    [{ ...value, detailUrl: base + '/product_details/1' }, { ...value, detailUrl: base + '/product_details/1' },
      { id: '43', name: 'Catalogue only', price: 'Rs. 30', detailUrl: base + '/product_details/43' }], base);
  assert.deepEqual(rows.map(row => row.id), ['1', '11', '43']);
  assert.equal(rows[0]!.api.length, 1);
  assert.equal(rows[0]!.catalogue.length, 1);
  assert.equal(assessProduct(rows[1]!, { ...facts(), name: 'API only', price: 'Rs. 20' }).checks.sourceAgreement!.status, 'fail');
});

test('conflicting duplicate IDs stay visible and block ambiguous comparisons', () => {
  const row = reconcileInventory([value, { ...value, price: 'Rs. 501' }], [value], base)[0]!;
  assert.equal(row.api.length, 2);
  assert.match(row.conflicts[0]!, /conflicting/);
  const assessed = assessProduct(row, facts());
  assert.equal(assessed.checks.sourceAgreement!.status, 'fail');
  assert.equal(assessed.checks.priceAgreement!.status, 'blocked');
});

test('normalization preserves meaningful differences and arithmetic is decimal safe', () => {
  assert.equal(normalizeName('  Blue\u00a0 Top '), 'Blue Top');
  assert.notEqual(normalizeName('Blue Top'), normalizeName('blue top'));
  assert.equal(parsePrice('Rs. 500')!.minor, 50000);
  assert.equal(parsePrice('Rs. 12.34')!.minor, 1234);
  assert.equal(parsePrice('unknown'), null);
  const detail = facts();
  detail.price = 'unknown';
  assert.equal(assessProduct(item(), detail).checks.priceAgreement!.status, 'blocked');
});

test('missing metadata fails facts without incorrectly requiring h1', () => {
  const healthy = assessProduct(item(), facts());
  assert.equal(healthy.checks.primaryHeadingPresent!.status, 'pass');
  const detail = facts();
  detail.title = '';
  detail.heading = { tag: null, text: null };
  detail.image.altPresent = false;
  detail.image.altText = null;
  const row = assessProduct(item(), detail);
  assert.equal(row.checks.titlePresent!.status, 'fail');
  assert.equal(row.checks.primaryHeadingPresent!.status, 'fail');
  assert.equal(row.checks.alternativeTextPresent!.status, 'fail');
  assert.equal(row.checks.alternativeTextNonEmpty!.status, 'blocked');
});

test('broken image HTTP and image decoding have independent outcomes', () => {
  const detail = facts();
  detail.image.httpStatus = 404;
  detail.image.decoded = false;
  const row = assessProduct(item(), detail);
  assert.equal(row.checks.imageAvailability!.status, 'fail');
  assert.equal(row.checks.imageDecoded!.status, 'fail');
  detail.image.httpStatus = 200;
  const corrupt = assessProduct(item(), detail);
  assert.equal(corrupt.checks.imageAvailability!.status, 'pass');
  assert.equal(corrupt.checks.imageDecoded!.status, 'fail');
});

test('HTTP error and missing rendered content block dependent comparisons', () => {
  const detail = facts();
  detail.httpStatus = 503;
  const row = assessProduct(item(), detail);
  assert.equal(row.checks.detailAvailability!.status, 'fail');
  assert.equal(row.checks.nameAgreement!.status, 'blocked');
  detail.httpStatus = 200;
  detail.productRegionPresent = false;
  assert.equal(assessProduct(item(), detail).checks.productContent!.status, 'fail');
});

test('generic wording is content review, separate from missing facts', () => {
  const detail = facts();
  detail.title = 'Automation Exercise - Product Details';
  detail.image.altText = 'ecommerce website products';
  const row = assessProduct(item(), detail);
  assert.equal(row.checks.titlePresent!.status, 'pass');
  assert.equal(row.checks.alternativeTextPresent!.status, 'pass');
  assert.equal(row.contentReviewFlags.length, 2);
  assert.equal(row.factualFindings.length, 0);
});

test('source outage and collection deadline never report complete coverage', () => {
  const row = assessProduct(item(), facts());
  const sourceList = sources();
  sourceList[0]!.status = 'blocked';
  const unknownApi = reconcileInventory([], [value], base)[0]!;
  const outageRow = assessProduct(unknownApi, facts(), { api: false, catalogue: true });
  assert.equal(outageRow.checks.sourceAgreement!.status, 'blocked');
  assert.ok(!outageRow.factualFindings.some(finding => finding.startsWith('sourceAgreement')));
  assert.equal(summarizeRows([row], sourceList).coverageComplete, false);
  const interrupted = blockedProduct(item(), 'Collection deadline reached.');
  const summary = summarizeRows([interrupted], sources());
  assert.equal(summary.coverageComplete, false);
  assert.equal(summary.inventory.union, 1);
  assert.equal(summary.inventory.attempted, 0);
  assert.equal(summary.inventory.blocked, 1);
  assert.ok(Object.values(interrupted.checks).every(check => check.status === 'blocked'));
});

test('CSV and Markdown surface raw values, source outage, and blocked coverage', () => {
  const rows = [blockedProduct(item(), 'Collection deadline reached.')];
  const run = { schemaVersion: 1 as const, runId: 'fixture', startedAt: 'start', finishedAt: 'end', durationMs: 270000,
    outputDir: '.', environment: {}, config: { collectionDeadlineMs: 240000, reportTargetMs: 270000, workers: 2, controlledStartIntervalMs: 1000 },
    sources: sources(), ...summarizeRows(rows, sources(), ['Source outage']), serviceErrors: ['Source outage'], rows };
  assert.match(catalogueCsv(run), /Blue Top/);
  assert.match(catalogueCsv(run), /Collection deadline reached/);
  assert.match(catalogueMarkdown(run), /INCOMPLETE/);
  assert.match(catalogueMarkdown(run), /Source outage/);
});


function csvRecords(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index++) {
    const character = text[index]!;
    if (character === '"') {
      if (quoted && text[index + 1] === '"') { field += '"'; index++; }
      else quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if (character === '\n' && !quoted) {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += character;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  assert.equal(quoted, false, 'CSV has balanced quoting');
  return rows;
}

function reportFixture(rows: ProductRow[], sourceList = sources(), serviceErrors: string[] = []): CatalogueRun {
  return { schemaVersion: 1, runId: 'report-adjustment', startedAt: '2026-10-09T00:00:00Z',
    finishedAt: '2026-10-09T00:00:01Z', durationMs: 1000, outputDir: '.', environment: {},
    config: { collectionDeadlineMs: 240000, reportTargetMs: 270000, workers: 2, controlledStartIntervalMs: 1000 },
    sources: sourceList, ...summarizeRows(rows, sourceList, serviceErrors), serviceErrors, rows };
}

test('CSV exposes observed and confirmed absent sources for every union product', () => {
  const apiOnly = { id: '11', name: 'API only', price: 'Rs. 20' };
  const catalogueOnly = { id: '43', name: 'Catalogue only', price: 'Rs. 30' };
  const inventory = reconcileInventory([value, apiOnly], [value, catalogueOnly], base);
  const rows = inventory.map(entry => assessProduct(entry, facts()));
  const records = csvRecords(catalogueCsv(reportFixture(rows)));
  const headers = records[0]!;
  assert.equal(new Set(headers).size, headers.length);
  assert.ok(headers.includes('api_present'));
  assert.ok(headers.includes('catalogue_present'));
  assert.ok(records.slice(1).every(record => record.length === headers.length), 'New columns align with all rows');
  const byId = Object.fromEntries(records.slice(1).map(record => [record[headers.indexOf('product_id')]!, record]));
  const presence = (id: string, source: string) => byId[id]![headers.indexOf(source)];
  assert.equal(presence('1', 'api_present'), 'true');
  assert.equal(presence('1', 'catalogue_present'), 'true');
  assert.equal(presence('11', 'api_present'), 'true');
  assert.equal(presence('11', 'catalogue_present'), 'false');
  assert.equal(presence('43', 'api_present'), 'false');
  assert.equal(presence('43', 'catalogue_present'), 'true');
});

test('CSV reports outage absence as unknown and preserves blocked source comparison', () => {
  const sourceList = sources();
  sourceList[0]!.status = 'blocked';
  sourceList[0]!.error = 'API request timed out';
  const entry = reconcileInventory([], [value], base)[0]!;
  const row = assessProduct(entry, facts(), { api: false, catalogue: true });
  const run = reportFixture([row], sourceList, ['API request timed out']);
  const [headers, values] = csvRecords(catalogueCsv(run));
  const get = (column: string) => values![headers!.indexOf(column)];
  assert.equal(get('api_present'), 'unknown');
  assert.equal(get('catalogue_present'), 'true');
  assert.equal(get('source_agreement'), 'blocked');
  assert.ok(!get('factual_findings')!.includes('sourceAgreement'));
  assert.equal(run.coverageComplete, false);
  assert.match(catalogueMarkdown(run), /unknown = source failure or incomplete discovery/);
});

test('source-presence additions preserve CSV commas, quotes, multiline text and formula protection', () => {
  const untrustedName = '=SUM(1,2), "Blue"\nTop';
  const entry = reconcileInventory([{ ...value, name: untrustedName }], [{ ...value, name: untrustedName }], base)[0]!;
  const row = assessProduct(entry, { ...facts(), name: untrustedName });
  const records = csvRecords(catalogueCsv(reportFixture([row])));
  const [headers, values] = records;
  assert.equal(records.length, 2, 'Embedded newline remains within its CSV record');
  assert.equal(values!.length, headers!.length);
  for (const column of ['api_name', 'catalogue_name', 'detail_name']) {
    assert.equal(values![headers!.indexOf(column)], "'" + untrustedName);
  }
  assert.equal(values![headers!.indexOf('api_present')], 'true');
  assert.equal(values![headers!.indexOf('catalogue_present')], 'true');
});


test('products API validates transport, application success and usable inventory shape', () => {
  const success = { responseCode: 200, products: [{ id: 1, name: 'Blue Top', price: 'Rs. 500' }] };
  assert.deepEqual(parseProductsApi(200, success), [value]);
  assert.throws(() => parseProductsApi(200, { responseCode: 500, products: [] }), /application responseCode 200/);
  assert.throws(() => parseProductsApi(200, { products: [] }), /application responseCode 200/);
  assert.throws(() => parseProductsApi(503, success), /documented HTTP 200/);
  assert.throws(() => parseProductsApi(200, { responseCode: 200, products: {} }), /products array/);
  assert.throws(() => parseProductsApi(200, { responseCode: 200, products: [{ name: 'No ID' }] }), /usable numeric ID/);
  assert.deepEqual(parseProductsApi(200, { responseCode: 200, products: [{ id: 11 }] }),
    [{ id: '11', name: null, price: null }], 'Missing metadata preserves the known product for blocked per-product checks');
});

test('a single unmapped detail link remains inventory data and makes coverage incomplete', () => {
  const parsedCard = { ...value, detailUrl: base + '/product_details/1' };
  const page = reconcileCatalogueLinks([parsedCard], [parsedCard.detailUrl, base + '/product_details/43'], base);
  assert.deepEqual(page.missingCardIds, ['43']);
  assert.deepEqual(page.values[1], { id: '43', name: null, price: null, detailUrl: base + '/product_details/43' });
  const sourceList = sources();
  sourceList[1]!.status = 'blocked';
  sourceList[1]!.error = 'Unmapped product ID 43';
  const rows = reconcileInventory([value], page.values, base).map(entry => assessProduct(entry, facts(), { api: true, catalogue: false }));
  assert.deepEqual(rows.map(row => row.id), ['1', '43'], 'Partially changed card templates do not discard discovered products');
  assert.equal(rows[1]!.checks.nameAgreement!.status, 'blocked');
  assert.equal(rows[1]!.checks.priceAgreement!.status, 'blocked');
  assert.equal(summarizeRows(rows, sourceList).coverageComplete, false);
});

test('detail-link reconciliation tolerates duplicates and excludes unrelated origins', () => {
  const card = { ...value, detailUrl: base + '/product_details/1' };
  const page = reconcileCatalogueLinks([card], [card.detailUrl, card.detailUrl, '/product_details/1',
    'https://outside.example/product_details/43', base + '/product_details/not-an-id'], base);
  assert.equal(page.values.length, 1);
  assert.deepEqual(page.discoveredIds, ['1']);
  assert.deepEqual(page.missingCardIds, []);
  assert.deepEqual(page.invalidDetailUrls, [base + '/product_details/not-an-id']);
});
