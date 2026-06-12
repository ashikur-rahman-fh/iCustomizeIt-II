'use client';

import { MAIN_APP_NAV_ITEMS, MAIN_APP_ROUTES } from '@i-customize-it/shared/constants/routes';
import { SITE_NAME } from '@i-customize-it/shared/brand';
import { Button, Navbar } from '@i-customize-it/shared/ui';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BrandLogo } from '@/components/BrandLogo';

function isNavItemActive(pathname: string | null, href: string): boolean {
  if (!pathname) {
    return false;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MainSiteNavbar() {
  const pathname = usePathname();

  const items = MAIN_APP_NAV_ITEMS.map((item) => ({
    ...item,
    active: isNavItemActive(pathname, item.href),
  }));

  return (
    <Navbar
      variant="ecommerce"
      appName={SITE_NAME}
      logo={<BrandLogo imageClassName="h-14 w-auto transition-opacity hover:opacity-90 sm:h-16" />}
      items={items}
      actions={
        <Button
          variant="brand"
          size="md"
          className="shadow-soft ring-1 ring-accent-foreground/20"
          asChild
        >
          <Link href={MAIN_APP_ROUTES.startDesigning}>
            <Sparkles className="h-4 w-4" aria-hidden />
            Start Design
          </Link>
        </Button>
      }
    />
  );
}
