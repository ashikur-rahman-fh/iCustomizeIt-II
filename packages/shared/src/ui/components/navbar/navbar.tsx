'use client';

import { Menu } from 'lucide-react';
import * as React from 'react';

import { Button } from '../button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../primitives/shadcn/sheet';
import { cn } from '../../utils/cn';

export type NavbarItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type NavbarVariant = 'default' | 'ecommerce';

type EcommerceNavLayout = 'pill' | 'sheet';

export type NavbarProps = {
  appName: string;
  logo?: React.ReactNode;
  items: NavbarItem[];
  actions?: React.ReactNode;
  className?: string;
  variant?: NavbarVariant;
};

function NavLinks({
  items,
  variant,
  ecommerceLayout = 'pill',
  className,
  onNavigate,
}: {
  items: NavbarItem[];
  variant: NavbarVariant;
  ecommerceLayout?: EcommerceNavLayout;
  className?: string;
  onNavigate?: () => void;
}) {
  const isEcommerce = variant === 'ecommerce';
  const isSheet = isEcommerce && ecommerceLayout === 'sheet';

  const list = (
    <ul
      className={cn(
        isEcommerce && !isSheet && 'flex flex-row items-center gap-0.5',
        isSheet && 'flex flex-col gap-1',
        !isEcommerce && 'flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-1',
        className,
      )}
    >
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            aria-current={item.active ? 'page' : undefined}
            onClick={onNavigate}
            className={cn(
              'inline-flex cursor-pointer text-sm font-medium transition-all duration-200 motion-reduce:transition-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              isEcommerce &&
                !isSheet && [
                  'rounded-full px-4 py-1.5 font-semibold',
                  item.active
                    ? 'bg-card text-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground',
                ],
              isSheet && [
                'w-full rounded-lg px-4 py-3 font-semibold',
                item.active
                  ? 'bg-card text-foreground shadow-soft'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
              ],
              !isEcommerce && [
                'rounded-md px-3 py-2',
                item.active
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
              ],
            )}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  if (isEcommerce && !isSheet) {
    return <nav className="rounded-full bg-muted/70 p-1">{list}</nav>;
  }

  return list;
}

function DefaultNavbar({ appName, logo, items, actions, className }: Omit<NavbarProps, 'variant'>) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className={cn('sticky top-0 z-40 border-b border-border bg-card', className)}>
      <nav
        aria-label={`${appName} navigation`}
        className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          {logo ?? (
            <span className="truncate text-base font-medium tracking-tight text-foreground">
              {appName}
            </span>
          )}
        </div>

        <div className="hidden sm:block">
          <NavLinks items={items} variant="default" />
        </div>

        <div className="flex items-center gap-3">
          {actions ? <div className="hidden items-center gap-3 sm:flex">{actions}</div> : null}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="outline" size="sm" aria-label="Open navigation menu">
                <Menu className="h-4 w-4" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)] bg-card">
              <SheetHeader>
                <SheetTitle>{appName}</SheetTitle>
              </SheetHeader>
              <NavLinks
                items={items}
                variant="default"
                className="mt-6"
                onNavigate={() => setOpen(false)}
              />
              {actions ? (
                <div className="mt-4 border-t border-border pt-4 sm:hidden">{actions}</div>
              ) : null}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function EcommerceNavbar({
  appName,
  logo,
  items,
  actions,
  className,
}: Omit<NavbarProps, 'variant'>) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className={cn('sticky top-0 z-40 px-4 pt-3 sm:px-6', className)}>
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border/50 bg-card/75 shadow-card backdrop-blur-xl">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent-foreground/80 to-success/80"
        />
        <nav
          aria-label={`${appName} navigation`}
          className="flex min-h-[4.5rem] items-center justify-between gap-3 px-4 sm:gap-4 sm:px-5"
        >
          <div className="flex min-w-0 shrink-0 items-center py-2">
            {logo ?? (
              <span className="truncate text-base font-semibold tracking-tight text-foreground">
                {appName}
              </span>
            )}
          </div>

          <div className="hidden flex-1 justify-center sm:flex">
            <NavLinks items={items} variant="ecommerce" ecommerceLayout="pill" />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {actions ? <div className="hidden items-center sm:flex">{actions}</div> : null}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="ghost" size="sm" aria-label="Open navigation menu">
                  <Menu className="h-4 w-4" aria-hidden />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-[min(100%,20rem)] flex-col bg-card p-0">
                <div className="flex flex-1 flex-col overflow-y-auto p-6">
                  <SheetHeader className="items-start text-left">
                    {logo ? (
                      <>
                        <SheetTitle className="sr-only">{appName}</SheetTitle>
                        <div className="pr-8">{logo}</div>
                      </>
                    ) : (
                      <SheetTitle>{appName}</SheetTitle>
                    )}
                  </SheetHeader>
                  <NavLinks
                    items={items}
                    variant="ecommerce"
                    ecommerceLayout="sheet"
                    className="mt-6"
                    onNavigate={() => setOpen(false)}
                  />
                </div>
                {actions ? (
                  <div className="sticky bottom-0 border-t border-border bg-card p-4 [&_a]:w-full [&_button]:w-full">
                    {actions}
                  </div>
                ) : null}
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Navbar({ variant = 'default', ...props }: NavbarProps) {
  if (variant === 'ecommerce') {
    return <EcommerceNavbar {...props} />;
  }

  return <DefaultNavbar {...props} />;
}
