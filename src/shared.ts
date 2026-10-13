import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export const BASE_URL = (process.env.QA_BASE_URL || 'https://automationexercise.com').replace(/\/$/, '');

export function normalizeName(value: string): string {
  return value.normalize('NFC').replace(/\s+/gu, ' ').trim();
}

export interface Price { currency: string; minor: number }
export function parsePrice(value: string): Price | null {
  const match = normalizeName(value).match(/^([A-Za-z.]+)\s*(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d{1,2}))?$/);
  if (!match) return null;
  const whole = Number(match[2].replace(/,/g, ''));
  const fraction = Number((match[3] || '').padEnd(2, '0'));
  const minor = whole * 100 + fraction;
  return Number.isSafeInteger(minor) ? { currency: match[1], minor } : null;
}

export async function writeText(path: string, text: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, text, 'utf8');
}

export async function writeJson(path: string, data: unknown): Promise<void> {
  await writeText(path, JSON.stringify(data, null, 2) + '\n');
}

export function safeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export const sleep = (milliseconds: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

export async function createRun(kind: string) {
  const startedAt = new Date().toISOString();
  const id = kind + '-' + startedAt.replace(/[:.]/g, '-') + '-' + process.pid;
  const dir = resolve('artifacts', id);
  await mkdir(dir, { recursive: true });
  return { id, dir, startedAt, startedMs: Date.now() };
}

