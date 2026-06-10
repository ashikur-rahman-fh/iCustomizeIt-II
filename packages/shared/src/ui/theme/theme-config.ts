/** iCustomizeIt default theme — muted, light, professional. */
export const defaultThemeId = 'calm-neutral-default' as const;

export const defaultThemeName = 'iCustomizeIt Default' as const;

export const defaultThemeConfig = {
  attribute: 'class' as const,
  defaultTheme: 'system' as const,
  enableSystem: true,
  disableTransitionOnChange: false,
};

export type ThemeConfig = typeof defaultThemeConfig;
