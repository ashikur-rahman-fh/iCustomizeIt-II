import { BrandLogo as SharedBrandLogo, type BrandLogoProps } from '@i-customize-it/shared/ui';

import brandVersions from '@/brand/asset-versions.json';

export function BrandLogo(props: Omit<BrandLogoProps, 'versions'>) {
  return <SharedBrandLogo versions={brandVersions} {...props} />;
}
