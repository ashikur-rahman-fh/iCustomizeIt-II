# Shared UI system

The design system lives in **`packages/shared/src/ui/`** and is consumed as **`@i-customize-it/shared/ui`**.

## Default theme: Customize Balanced

**Theme id:** `customize-balanced`

A **balanced brand theme** for iCustomizeIt — clean white surfaces, charcoal default controls, and **brand red / green accents** that complement the Canadian logo without overwhelming the UI.

### Visual direction

- Professional ecommerce chrome with approachable brand touches
- Light: `0 0% 99%` page background, **white cards** (matches logo field)
- Dark: warm charcoal surfaces with readable accent colors
- Primary: **neutral charcoal** (`220 15% 22%` light) for default buttons and badges
- Accent: **brand red** (`358 74% 47%`) for links, focus rings, `brand` variants, and active nav
- Success: **brand green** (`145 65% 32%`) aligned with the logo `iT` color
- Destructive: distinct orange-red (not the same as brand red)
- Slightly rounder corners and soft shadows echoing the logo's rounded letterforms

### Brand reference colors

| Swatch | Hex (approx) | HSL | Token role |
| ------ | ------------ | --- | ---------- |
| Brand red | `#D21F26` | `358 74% 47%` | `--accent-foreground`, `--ring`, `brand` button |
| Brand green | `#008A3D` | `145 65% 32%` | `--success` |
| Charcoal | `#1E2329` | `220 18% 14%` | `--foreground` |
| Button neutral | `#2B3139` | `220 15% 22%` | `--primary` |

### Fonts

| Use | Stack |
| --- | ----- |
| UI (default) | Rubik (via `next/font`), ui-sans-serif, system-ui, … |
| Code / metadata | JetBrains Mono (via `next/font`), SFMono-Regular, Consolas, monospace |

Fonts are self-hosted via **`next/font/google`** in [`packages/shared/src/ui/theme/app-fonts.ts`](../../packages/shared/src/ui/theme/app-fonts.ts). Both app layouts import `appFontClassName` from `@i-customize-it/shared/ui/theme/app-fonts` (kept out of the main UI barrel so Vitest does not load `next/font`) and apply it on `<html>`, which sets `--font-sans-next` and `--font-mono-next` consumed by `theme.css`. This avoids Google Fonts CDN requests and works with strict CSP (`font-src 'self'`). Use `font-mono` or `<code>` only for technical copy (API paths, env labels, version strings).

### Theme tokens

All colors and radius live in **[`packages/shared/src/ui/styles/theme.css`](../../packages/shared/src/ui/styles/theme.css)** as HSL channels:

`background`, `foreground`, `card`, `card-foreground`, `muted`, `muted-foreground`, `border`, `input`, `ring`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `destructive`, `destructive-foreground`, `warning`, `warning-foreground`, `success`, `success-foreground`, `info`, `info-foreground`

TypeScript: `defaultThemeId`, `defaultThemeName`, `semanticColorTokens`, `radiusTokens`, `componentRadiusGuide` in `theme/`.

### Radius scale

Centralized in `theme.css` — mapped to Tailwind `rounded-*` utilities:

| Token | Value | Tailwind | Typical use |
| ----- | ----- | -------- | ----------- |
| `--radius-xs` | 0.25rem | `rounded-xs` | Tiny controls, close buttons |
| `--radius-sm` | 0.375rem | `rounded-sm` | Compact chips |
| `--radius-md` | 0.625rem | `rounded-md` | **Buttons, inputs, badges** (default) |
| `--radius-lg` | 0.75rem | `rounded-lg` | **Cards, alerts, panels, toasts** |
| `--radius-xl` | 0.875rem | `rounded-xl` | Large dialogs (sparingly) |
| `--radius` | 0.625rem | default | Same as `md` |

**Guidelines:**

- Do **not** use `rounded-2xl` or `rounded-full` for default buttons/cards.
- Navbar (full-width): no radius on the bar itself.
- Prefer `rounded-md` for interactive controls, `rounded-lg` for surfaces.
- Change the scale in `theme.css` only — components use Tailwind classes, not hardcoded rem values.

**Rebrand checklist:**

1. Edit HSL values in `theme.css` (`:root` and `.dark`) — start with `--primary` and `--background`.
2. Adjust `--radius-*` and `--shadow-*` if needed.
3. Optionally update font config in `app-fonts.ts` and `--font-sans` fallbacks in `theme.css`.
4. Never hardcode colors or excessive rounding in components — use semantic tokens and `rounded-md` / `rounded-lg`.

### Light / dark mode

`ThemeProvider` applies the `dark` class on `<html>`. Both frontends share the same CSS so main and admin stay aligned.

## Stack

| Layer | Role |
| ----- | ---- |
| **Tailwind CSS v4** | Utilities |
| **shadcn/ui** | Primitives in `primitives/shadcn/` |
| **Basecoat CSS** | Optional foundation utilities |
| **Custom components** | Public API in `components/` |

## Importing

```tsx
import { Button, Alert, Card, Navbar, PageShell, ThemeProvider } from '@i-customize-it/shared/ui';
import '@i-customize-it/shared/ui/styles/globals.css';
```

## Components

| Component | Style notes |
| --------- | ----------- |
| **Button** | `rounded-md`; charcoal `default`; `brand` variant for red CTAs; `success` for green; link style uses brand red |
| **Alert** | `rounded-lg`; light tinted backgrounds |
| **Card** | `rounded-lg`; white, subtle border |
| **Navbar** | `variant="default"` (admin): full-width square bar, pill active state. `variant="ecommerce"` (main site): **floating glass island** (`rounded-2xl`, `bg-card/75`, `backdrop-blur-xl`, `shadow-card`), red→green accent hairline, **pill nav cluster** (active link = raised white pill on muted track), ghost mobile trigger, logo-forward mobile sheet. Use `MainSiteNavbar` in `frontend-main` for the public IA. |
| **Input** | `rounded-md`; brand red focus ring |
| **PasswordInput** | Password field with inline Eye / EyeOff toggle; `aria-label` for show/hide (no visible text on the button) |
| **Badge** | `rounded-md`; `brand` variant for promotional tags |

Pass `className` for app-level tweaks.

## Developer rules

1. Import reusable UI from `@i-customize-it/shared/ui`.
2. Do not duplicate or hardcode brand colors in apps.
3. Customize via `theme.css` tokens only when rebranding.
4. Add tests and update this doc when changing the system.

## Preview & tests

```bash
npx pnpm@9.15.0 --filter @i-customize-it/frontend-main dev
npx pnpm@9.15.0 --filter @i-customize-it/shared test
```
