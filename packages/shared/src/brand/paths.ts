export const BRAND_ASSET_DIR = '/brand';

export const BRAND_ASSETS = {
  logoNavbar: 'logo-navbar.png',
  favicon: 'favicon.ico',
  favicon16: 'favicon-16x16.png',
  favicon32: 'favicon-32x32.png',
  appleTouchIcon: 'apple-touch-icon.png',
} as const;

export type BrandAssetFilename = (typeof BRAND_ASSETS)[keyof typeof BRAND_ASSETS];

export const LOGO_NAVBAR_WIDTH = 336;
export const LOGO_NAVBAR_HEIGHT = 112;
