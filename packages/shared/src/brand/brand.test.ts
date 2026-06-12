import { describe, expect, it } from 'vitest';

import { brandAssetUrl } from './asset-url';
import { createBrandMetadata } from './metadata';

describe('brandAssetUrl', () => {
  it('returns an unversioned path when no versions manifest is provided', () => {
    expect(brandAssetUrl('favicon.ico')).toBe('/brand/favicon.ico');
  });

  it('appends a content hash query string when versions are provided', () => {
    expect(brandAssetUrl('favicon.ico', { 'favicon.ico': 'a1b2c3d4' })).toBe(
      '/brand/favicon.ico?v=a1b2c3d4',
    );
  });
});

describe('createBrandMetadata', () => {
  it('includes versioned icon URLs in metadata', () => {
    const metadata = createBrandMetadata({
      title: 'iCustomizeIt',
      description: 'Test description',
      versions: {
        'favicon.ico': 'abc12345',
        'favicon-16x16.png': 'def67890',
        'favicon-32x32.png': 'ghi11223',
        'apple-touch-icon.png': 'jkl44556',
      },
    });

    expect(metadata.icons).toEqual({
      icon: [
        { url: '/brand/favicon.ico?v=abc12345', sizes: 'any' },
        {
          url: '/brand/favicon-16x16.png?v=def67890',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/brand/favicon-32x32.png?v=ghi11223',
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      apple: '/brand/apple-touch-icon.png?v=jkl44556',
    });
  });
});
