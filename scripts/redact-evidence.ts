import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve('artifacts');
const changed: Array<{path:string; redactedResponses:number}> = [];
function redact(node: unknown): number {
  if (!node || typeof node !== 'object') return 0;
  let count = 0;
  const object = node as Record<string, unknown>;
  if (typeof object.body === 'string' && /Exception Type:|id=["']traceback["']|Django Version:/.test(object.body)) {
    const raw = object.body;
    const decoded = raw.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
    const message = decoded.match(/invalid literal for int\(\) with base 10:\s*['"](?:1\.5)?['"]/);
    object.diagnostic = {
      debugPageDetected: true,
      exceptionType: /\bValueError\b/.test(raw) ? 'ValueError' : 'not retained',
      exceptionMessage: message?.[0] || 'Only the non-sensitive exception class was retained.',
      settingsSectionPresent: /<h3[^>]*>Settings<\/h3>|id=["']settings["']/.test(raw),
      tracebackSectionPresent: /id=["']traceback["']/.test(raw),
    };
    object.responseBodySha256 = createHash('sha256').update(raw).digest('hex');
    object.responseBodyBytes = Buffer.byteLength(raw, 'utf8');
    object.body = '[Server diagnostic body redacted: settings, request cookies, source paths and traceback omitted. See allowlisted diagnostic fields.]';
    object.redaction = { appliedAt: new Date().toISOString(), reason: 'Minimise disclosure of private server and session information in the submission.' };
    count++;
  }
  for (const value of Object.values(object)) {
    if (Array.isArray(value)) for (const item of value) count += redact(item);
    else count += redact(value);
  }
  return count;
}
async function visit(directory: string) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) await visit(target);
    else if (entry.name.endsWith('.json')) {
      const text = (await readFile(target, 'utf8')).replace(/^\uFEFF/, '');
      let parsed: unknown;
      try { parsed = JSON.parse(text); } catch { continue; }
      const count = redact(parsed);
      if (count) {
        await writeFile(target, JSON.stringify(parsed, null, 2) + '\n', 'utf8');
        changed.push({ path: target.slice(root.length + 1).replaceAll('\\','/'), redactedResponses: count });
      }
    }
  }
}
await visit(root);
await mkdir(join(root, 'tooling'), { recursive: true });
const record = { checkedAt: new Date().toISOString(), action: 'Redact previously recorded public server diagnostic responses',
  changed, responseCount: changed.reduce((sum, file) => sum + file.redactedResponses, 0),
  scope: 'Shareable artifact JSON, including attached JSON copies. No normal API response or factual result was changed.' };
await writeFile(join(root, 'tooling', 'evidence-redaction.json'), JSON.stringify(record,null,2)+'\n','utf8');
console.log(JSON.stringify({ changedFiles: changed.length, redactedResponses: record.responseCount },null,2));

