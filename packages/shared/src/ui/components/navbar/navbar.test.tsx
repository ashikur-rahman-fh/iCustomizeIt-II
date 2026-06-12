import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Navbar } from './navbar';

const defaultItems = [
  { label: 'Home', href: '/', active: true },
  { label: 'Profile', href: '/profile' },
];

const ecommerceItems = [
  { label: 'Shop', href: '/shop', active: true },
  { label: 'About', href: '/about' },
];

describe('Navbar', () => {
  describe('default variant', () => {
    it('renders app name', () => {
      render(<Navbar appName="Main App" items={defaultItems} />);
      expect(screen.getByLabelText('Main App navigation')).toBeInTheDocument();
      expect(screen.getByText('Main App')).toBeInTheDocument();
    });

    it('renders nav items', () => {
      render(<Navbar appName="Main App" items={defaultItems} />);
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    });

    it('marks active item with pill styling', () => {
      render(<Navbar appName="Main App" items={defaultItems} />);
      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toHaveAttribute('aria-current', 'page');
      expect(homeLink).toHaveClass('bg-accent', 'text-accent-foreground');
      expect(screen.getByRole('link', { name: 'Profile' })).not.toHaveAttribute('aria-current');
    });

    it('supports actions area', () => {
      render(
        <Navbar
          appName="Main App"
          items={defaultItems}
          actions={<button type="button">Sign in</button>}
        />,
      );
      expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    });

    it('uses outline mobile menu trigger', () => {
      render(<Navbar appName="Main App" items={defaultItems} />);
      expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument();
    });

    it('renders a custom logo when provided', () => {
      render(<Navbar appName="Main App" items={defaultItems} logo={<a href="/">Brand logo</a>} />);
      expect(screen.getByRole('link', { name: 'Brand logo' })).toBeInTheDocument();
      expect(screen.queryByText('Main App')).not.toBeInTheDocument();
    });
  });

  describe('ecommerce variant', () => {
    it('marks active item with raised pill styling', () => {
      render(<Navbar appName="iCustomizeIt" variant="ecommerce" items={ecommerceItems} />);
      const shopLink = screen.getByRole('link', { name: 'Shop' });
      expect(shopLink).toHaveAttribute('aria-current', 'page');
      expect(shopLink).toHaveClass('rounded-full', 'shadow-soft', 'bg-card', 'text-foreground');
      expect(shopLink).not.toHaveClass('bg-accent');
    });

    it('renders floating glass island', () => {
      render(<Navbar appName="iCustomizeIt" variant="ecommerce" items={ecommerceItems} />);
      const nav = screen.getByLabelText('iCustomizeIt navigation');
      const island = nav.parentElement;
      expect(island).toHaveClass('rounded-2xl', 'backdrop-blur-xl', 'shadow-card');
    });

    it('renders brand accent hairline on the island', () => {
      render(<Navbar appName="iCustomizeIt" variant="ecommerce" items={ecommerceItems} />);
      const nav = screen.getByLabelText('iCustomizeIt navigation');
      const island = nav.parentElement;
      const hairline = island?.firstElementChild;
      expect(hairline).toHaveAttribute('aria-hidden', 'true');
      expect(hairline).toHaveClass(
        'bg-gradient-to-r',
        'from-accent-foreground/80',
        'to-success/80',
      );
    });

    it('uses ghost mobile menu trigger', () => {
      render(<Navbar appName="iCustomizeIt" variant="ecommerce" items={ecommerceItems} />);
      const trigger = screen.getByRole('button', { name: 'Open navigation menu' });
      expect(trigger).toHaveClass('hover:bg-muted');
      expect(trigger).not.toHaveClass('border', 'border-input');
    });

    it('shows actions in the mobile sheet', async () => {
      const user = userEvent.setup();
      render(
        <Navbar
          appName="iCustomizeIt"
          variant="ecommerce"
          items={ecommerceItems}
          actions={<a href="/start-designing">Start Design</a>}
        />,
      );

      await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));

      expect(screen.getAllByRole('link', { name: 'Start Design' })).toHaveLength(1);
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    });
  });
});
