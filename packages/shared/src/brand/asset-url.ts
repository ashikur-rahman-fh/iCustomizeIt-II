import { BRAND_ASSET_DIR } from './paths';

export type BrandAssetVersions = Record<string, string>;

export function brandAssetUrl(filename: string, versions?: BrandAssetVersions): string {
  const base = `${BRAND_ASSET_DIR}/${filename}`;
  const hash = versions?.[filename];

  if (hash) {
    return `${base}?v=${hash}`;
  }

  return base;
}
