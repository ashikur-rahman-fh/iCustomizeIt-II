import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { defaultThemeId, defaultThemeName } from './theme-config';
import { semanticColorTokens, typographyTokens } from './tokens';

const themeCss = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../styles/theme.css'),
  'utf8',
);

describe('Customize Balanced theme tokens', () => {
  it('exports a stable theme id and display name', () => {
    expect(defaultThemeId).toBe('customize-balanced');
    expect(defaultThemeName).toBe('Customize Balanced');
  });

  it('defines semantic color variables in theme.css', () => {
    for (const token of semanticColorTokens) {
      expect(themeCss).toContain(`--${token}:`);
    }
  });

  it('uses neutral charcoal primary and brand accent in light mode', () => {
    expect(themeCss).toMatch(/--primary:\s*220 15% 22%/);
    expect(themeCss).toMatch(/--background:\s*0 0% 99%/);
    expect(themeCss).toMatch(/--accent-foreground:\s*358 74% 47%/);
  });

  it('uses light neutral primary and softened brand accent in dark mode', () => {
    expect(themeCss).toMatch(/\.dark[\s\S]*--primary:\s*0 0% 92%/);
    expect(themeCss).toMatch(/\.dark[\s\S]*--accent-foreground:\s*358 65% 62%/);
  });

  it('defines typography CSS variables', () => {
    expect(themeCss).toContain('--font-sans:');
    expect(themeCss).toContain('--font-sans-next');
    expect(themeCss).toContain('--font-mono:');
    expect(themeCss).toContain('--font-mono-next');
    expect(typographyTokens.sans).toBe('--font-sans');
    expect(typographyTokens.mono).toBe('--font-mono');
  });

  it('exports semantic color token list for tooling', () => {
    expect(semanticColorTokens).toContain('primary');
    expect(semanticColorTokens).toContain('card');
  });

  it('defines moderate radius scale in theme.css', () => {
    expect(themeCss).toContain('--radius-xs: 0.25rem');
    expect(themeCss).toContain('--radius-sm: 0.375rem');
    expect(themeCss).toContain('--radius-md: 0.625rem');
    expect(themeCss).toContain('--radius-lg: 0.75rem');
    expect(themeCss).toContain('--radius-xl: 0.875rem');
    expect(themeCss).toContain('--radius: 0.625rem');
  });
});
