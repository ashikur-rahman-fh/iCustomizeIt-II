/** Customize Balanced — neutral chrome with brand red/green accents. */
export const defaultThemeId = 'customize-balanced' as const;

export const defaultThemeName = 'Customize Balanced' as const;

export const defaultThemeConfig = {
  attribute: 'class' as const,
  defaultTheme: 'system' as const,
  enableSystem: true,
  disableTransitionOnChange: false,
};

export type ThemeConfig = typeof defaultThemeConfig;
