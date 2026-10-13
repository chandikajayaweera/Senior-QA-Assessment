import { request } from '@playwright/test';
import { resolve } from 'node:path';
import { BASE_URL, createRun, writeJson, writeText } from '../src/shared.js';

const run = await createRun('investigation');
const api = await request.newContext({ baseURL: BASE_URL, timeout: 20_000 });
try {
  const response = await api.get('/static/js/cart.js', { failOnStatusCode: false });
  const body = await response.text();
  const sourcePath = resolve(run.dir, 'cart.js');
  await writeText(sourcePath, body);
  const lines = body.split(/\r?\n/);
  const relevant = new Set<number>();
  for (let index = 0; index < lines.length; index++) {
    if (/quantity|checkValidity|reportValidity|parseInt|\.cart\)|\.cart'|\.cart"|add_to_cart/.test(lines[index]!)) {
      for (let sample = Math.max(0, index - 4); sample <= Math.min(lines.length - 1, index + 6); sample++) relevant.add(sample);
    }
  }
  const record = {
    id: 'INV-QUANTITY-CLIENT', checkedAt: new Date().toISOString(),
    request: { method: 'GET', url: BASE_URL + '/static/js/cart.js' },
    response: { httpStatus: response.status(), finalUrl: response.url(), contentType: response.headers()['content-type'] },
    sourceEvidence: 'cart.js',
    relevantLines: [...relevant].sort((a,b) => a-b).map(index => ({ line: index + 1, text: lines[index] })),
    limits: 'Only public client code is available. Server implementation, storage validation, and order/payment implications are not established by this source.',
  };
  await writeJson(resolve(run.dir, 'client-investigation.json'), record);
  console.log(JSON.stringify({ runId: run.id, outputDir: run.dir, httpStatus: response.status(), relevantLines: record.relevantLines }, null, 2));
  if (!response.ok()) process.exitCode = 1;
} finally {
  await api.dispose();
}

