import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    replace: vi.fn(),
    push: vi.fn(),
  }),
}));

vi.mock('next/font/google', () => ({
  Rubik: () => ({
    variable: '--font-sans-next',
    className: 'mock-rubik',
  }),
  JetBrains_Mono: () => ({
    variable: '--font-mono-next',
    className: 'mock-jetbrains-mono',
  }),
}));
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  http.get('*/api/hello/', () => HttpResponse.json({ message: 'Hello from Django backend' })),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
