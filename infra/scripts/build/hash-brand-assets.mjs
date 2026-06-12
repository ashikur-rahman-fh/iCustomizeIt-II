#!/usr/bin/env node
/**
 * Build-time content hashes for public/brand assets.
 * Output: apps/{app}/src/brand/asset-versions.json
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../..');

const APP_ALIASES = {
  'frontend-main': 'frontend-main',
  'frontend-admin': 'frontend-admin',
  main: 'frontend-main',
  admin: 'frontend-admin',
};

async function hashBrandAssets(appAlias) {
  const appName = APP_ALIASES[appAlias];
  if (!appName) {
    console.error(`Unknown app alias: ${appAlias}`);
    console.error(`Expected one of: ${Object.keys(APP_ALIASES).join(', ')}`);
    process.exit(1);
  }

  const brandDir = path.join(ROOT, 'apps', appName, 'public', 'brand');
  const outputDir = path.join(ROOT, 'apps', appName, 'src', 'brand');
  const outputFile = path.join(outputDir, 'asset-versions.json');

  const entries = await readdir(brandDir, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);

  const versions = {};
  for (const filename of files.sort()) {
    const filePath = path.join(brandDir, filename);
    const content = await readFile(filePath);
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 8);
    versions[filename] = hash;
  }

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(versions, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${Object.keys(versions).length} brand asset hashes to ${path.relative(ROOT, outputFile)}`);
}

const appAlias = process.argv[2];
if (!appAlias) {
  console.error('Usage: node hash-brand-assets.mjs <frontend-main|frontend-admin>');
  process.exit(1);
}

await hashBrandAssets(appAlias);
