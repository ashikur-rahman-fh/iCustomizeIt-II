import type { Metadata } from 'next';
import {
  getThemeHtmlClass,
  getThemeProviderModeConfig,
  parseThemeMode,
  ThemeProvider,
} from '@i-customize-it/shared/ui';
import { createBrandMetadata } from '@i-customize-it/shared/brand';
import '@i-customize-it/shared/ui/styles/globals.css';
import { AdminAuthProvider } from '@/auth/AdminAuthProvider';
import brandVersions from '@/brand/asset-versions.json';
import './globals.css';

export const metadata: Metadata = createBrandMetadata({
  title: 'Admin',
  description: 'iCustomizeIt admin sign-in and profile.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  versions: brandVersions,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeMode = parseThemeMode(process.env.NEXT_PUBLIC_THEME_MODE);
  const themeProviderModeConfig = getThemeProviderModeConfig(themeMode);

  return (
    <html lang="en" suppressHydrationWarning className={getThemeHtmlClass(themeMode)}>
      <body>
        <ThemeProvider {...themeProviderModeConfig}>
          <AdminAuthProvider>{children}</AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
