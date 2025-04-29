export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  login: {
    mask: '/login',
    create: () => '/login',
  },
  registration: {
    mask: '/registration',
    create: () => '/registration',
  },
  profile: {
    mask: '/profile',
    create: () => '/profile',
  },
  cases: {
    mask: '/cases',
    create: () => '/cases',
  },
  case: {
    mask: '/cases/:link',
    create: (link: string) => `/cases/${link}`,
  },
  organizations: {
    mask: '/organizations',
    create: () => '/organizations',
  },
  organization: {
    mask: '/organizations/:id',
    create: (id: string) => `/organizations/${id}`,
  },
  surveys: {
    mask: '/surveys',
    create: () => '/surveys',
  },
  survey: {
    mask: '/surveys/:link',
    create: (link: string) => `/surveys/${link}`,
  },
  quest: {
    mask: '/surveys/:link/quest',
    create: (link: string) => `/surveys/${link}/quest`,
  },
  privacy: {
    mask: '/privacy',
    create: () => '/privacy',
  },
  yandexOauth: {
    mask: '/yandex-oauth',
    create: (token: string) => `/yandex-oauth?token=${token}`,
  },
};
