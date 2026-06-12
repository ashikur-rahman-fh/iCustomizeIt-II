import { JetBrains_Mono, Rubik } from 'next/font/google';

export const fontSans = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans-next',
  display: 'swap',
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-next',
  display: 'swap',
});

export const appFontClassName = `${fontSans.variable} ${fontMono.variable}`;
