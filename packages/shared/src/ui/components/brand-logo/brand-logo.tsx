'use client';

import Image from 'next/image';
import Link from 'next/link';

import { brandAssetUrl, type BrandAssetVersions } from '../../../brand/asset-url';
import { BRAND_ASSETS, LOGO_NAVBAR_HEIGHT, LOGO_NAVBAR_WIDTH } from '../../../brand/paths';
import { SITE_NAME } from '../../../brand/site';
import { cn } from '../../utils/cn';

export type BrandLogoProps = {
  versions?: BrandAssetVersions;
  href?: string;
  className?: string;
  imageClassName?: string;
};

export function BrandLogo({ versions, href = '/', className, imageClassName }: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn('inline-flex shrink-0 items-center', className)}
      aria-label={`${SITE_NAME} home`}
    >
      <Image
        src={brandAssetUrl(BRAND_ASSETS.logoNavbar, versions)}
        alt={SITE_NAME}
        width={LOGO_NAVBAR_WIDTH}
        height={LOGO_NAVBAR_HEIGHT}
        priority
        className={cn('h-16 w-auto', imageClassName)}
      />
    </Link>
  );
}
