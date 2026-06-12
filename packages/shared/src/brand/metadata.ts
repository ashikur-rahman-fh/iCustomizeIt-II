import type { Metadata } from 'next';

import { brandAssetUrl, type BrandAssetVersions } from './asset-url';
import { BRAND_ASSETS } from './paths';
import { SITE_NAME } from './site';

export type CreateBrandMetadataOptions = {
  title: string;
  description: string;
  siteUrl?: string;
  versions?: BrandAssetVersions;
};

export function createBrandMetadata({
  title,
  description,
  siteUrl,
  versions,
}: CreateBrandMetadataOptions): Metadata {
  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    icons: {
      icon: [
        { url: brandAssetUrl(BRAND_ASSETS.favicon, versions), sizes: 'any' },
        {
          url: brandAssetUrl(BRAND_ASSETS.favicon16, versions),
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: brandAssetUrl(BRAND_ASSETS.favicon32, versions),
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      apple: brandAssetUrl(BRAND_ASSETS.appleTouchIcon, versions),
    },
  };

  const trimmedSiteUrl = siteUrl?.trim();
  if (trimmedSiteUrl) {
    metadata.metadataBase = new URL(trimmedSiteUrl);
  }

  return metadata;
}
