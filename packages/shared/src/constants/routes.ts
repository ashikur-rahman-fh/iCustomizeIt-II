export const API_ROUTES = {
  health: '/api/health/',
  hello: '/api/hello/',
  adminAuth: {
    csrf: '/api/admin/auth/csrf/',
    login: '/api/admin/auth/login/',
    logout: '/api/admin/auth/logout/',
    me: '/api/admin/auth/me/',
    changePassword: '/api/admin/auth/change-password/',
  },
} as const;

export const MAIN_APP_ROUTES = {
  home: '/',
  shop: '/shop',
  startDesigning: '/start-designing',
  about: '/about',
} as const;

export const MAIN_APP_NAV_ITEMS = [
  { label: 'Shop', href: MAIN_APP_ROUTES.shop },
  { label: 'Start Designing', href: MAIN_APP_ROUTES.startDesigning },
  { label: 'About', href: MAIN_APP_ROUTES.about },
] as const;
