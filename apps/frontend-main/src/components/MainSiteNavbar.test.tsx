import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MainSiteNavbar } from './MainSiteNavbar';

const pathnameMock = vi.fn(() => '/');

vi.mock('next/navigation', () => ({
  usePathname: () => pathnameMock(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('@/components/BrandLogo', () => ({
  BrandLogo: () => <span>iCustomizeIt logo</span>,
}));

describe('MainSiteNavbar', () => {
  it('renders main site nav links without dashboard', () => {
    pathnameMock.mockReturnValue('/');
    render(<MainSiteNavbar />);

    expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute('href', '/shop');
    expect(screen.getByRole('link', { name: 'Start Designing' })).toHaveAttribute(
      'href',
      '/start-designing',
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.queryByRole('link', { name: 'Dashboard' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();
  });

  it('marks the shop route active on /shop', () => {
    pathnameMock.mockReturnValue('/shop');
    render(<MainSiteNavbar />);

    const shopLink = screen.getByRole('link', { name: 'Shop' });
    expect(shopLink).toHaveAttribute('aria-current', 'page');
    expect(shopLink).toHaveClass('rounded-full', 'shadow-soft');
  });

  it('renders the Start Design CTA with icon', () => {
    pathnameMock.mockReturnValue('/');
    render(<MainSiteNavbar />);

    const cta = screen.getByRole('link', { name: 'Start Design' });
    expect(cta).toHaveAttribute('href', '/start-designing');
    expect(cta).toHaveClass('shadow-soft', 'ring-accent-foreground/20');
  });
});
