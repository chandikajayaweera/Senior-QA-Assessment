import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { BASE_URL, writeText, writeJson, safeError } from '../src/shared.js';

type ResultStatus = 'pass' | 'fail' | 'blocked';
const cases: Array<{ id: string; title: string; form: Record<string, string>; expected: string; basis: string }> = [
  { id: 'TC-API-01', title: 'search top', form: { search_product: 'top' },
    expected: 'HTTP success; application code 200; a non-empty products list',
    basis: 'API 5 documents POST search_product and Response Code 200 with searched products.' },
  { id: 'TC-API-02', title: 'search unmatched sentinel',
    form: { search_product: 'qa_no_match_7f7b51a8795a' },
    expected: 'HTTP success; application code 200; an empty products list',
    basis: 'Assumption: a successful search with no matches returns an empty collection; the documentation does not specify this case.' },
  { id: 'TC-API-03', title: 'omit required search_product', form: {},
    expected: 'Request is rejected with application code 400 and the documented missing-parameter message; actual transport status is recorded independently',
    basis: 'API 6 says Response Code 400. Whether that means transport HTTP status or JSON responseCode is not explicit.' },
];

test.beforeAll(async ({ request }) => {
  const response = await request.get('/api_list');
  const dir = resolve('artifacts', process.env.QA_RUN_ID!, 'documentation');
  await writeText(resolve(dir, 'api-list.html'), await response.text());
  await writeJson(resolve(dir, 'api-list-request.json'), {
    checkedAt: new Date().toISOString(),
    url: BASE_URL + '/api_list', httpStatus: response.status(),
    finalUrl: response.url(), contentType: response.headers()['content-type'],
  });
});

for (const [index, scenario] of cases.entries()) {
  test(scenario.id + ' ' + scenario.title, async ({ request }, testInfo) => {
    const checkedAt = new Date().toISOString();
    const responsePath = testInfo.outputPath('response.txt');
    const evidencePath = testInfo.outputPath('api-record.json');
    let status: ResultStatus = 'blocked';
    let actual: Record<string, unknown> = {};
    let conclusion = '';
    let ambiguity: string | null = null;
    try {
      const response = await request.post('/api/searchProduct', {
        form: scenario.form, timeout: 20_000, failOnStatusCode: false,
      });
      const raw = await response.text();
      await writeText(responsePath, raw);
      const body = JSON.parse(raw);
      actual = {
        httpStatus: response.status(), statusText: response.statusText(),
        finalUrl: response.url(),
        contentType: response.headers()['content-type'],
        responseCode: body.responseCode, responseBody: body,
      };
      const successfulTransport = response.status() >= 200 && response.status() < 300;
      if (index === 0) {
        status = successfulTransport && body.responseCode === 200 &&
          Array.isArray(body.products) && body.products.length > 0 ? 'pass' : 'fail';
        conclusion = status === 'pass'
          ? 'The documented top search returns products. Exact UI/product consistency is checked by the browser journey.'
          : 'The top search did not meet its documented success contract.';
      } else if (index === 1) {
        status = successfulTransport && body.responseCode === 200 &&
          Array.isArray(body.products) && body.products.length === 0 ? 'pass' : 'fail';
        conclusion = status === 'pass'
          ? 'The unmatched sentinel returns an empty collection, consistent with the stated assumption.'
          : 'Observed response differs from the stated no-match assumption; investigate before classifying as a defect.';
        ambiguity = 'No-match response shape/status is not specified in API 5.';
      } else {
        const missingMessage = 'Bad request, search_product parameter is missing in POST request.';
        status = body.responseCode === 400 && body.message === missingMessage ? 'pass' : 'fail';
        conclusion = status === 'pass'
          ? 'The required parameter is rejected using the documented application code/message.'
          : 'The missing-parameter application response differs from the documented code/message.';
        if (response.status() !== 400) {
          ambiguity = 'Documentation says Response Code 400; observed HTTP ' +
            response.status() + ' and JSON responseCode ' + body.responseCode +
            '. Clarify whether transport status is contractual before filing a status-code defect.';
        }
      }
    } catch (error) {
      conclusion = 'Request or response interpretation could not be completed: ' + safeError(error);
      actual = { ...actual, error: safeError(error) };
    }
    const record = {
      id: scenario.id, checkedAt, input: { search: scenario.form },
      request: {
        method: 'POST', url: BASE_URL + '/api/searchProduct',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        form: scenario.form, encodedBody: new URLSearchParams(scenario.form).toString(),
      },
      expected: scenario.expected, basis: scenario.basis,
      actual, status, conclusion, ambiguity,
      evidence: ['response.txt', 'api-record.json'],
    };
    await writeJson(evidencePath, record);
    await testInfo.attach('API request and conclusion', { path: evidencePath, contentType: 'application/json' });
    if (Object.keys(actual).length && !('error' in actual)) {
      await testInfo.attach('Full response body', { path: responsePath, contentType: 'text/plain' });
    }
    expect(status, conclusion).toBe('pass');
  });
}


