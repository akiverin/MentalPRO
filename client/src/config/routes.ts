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
  profileUpdate: {
    mask: '/profile/update',
    create: () => '/profile/update',
  },
  cases: {
    mask: '/cases',
    create: () => '/cases',
  },
  case: {
    mask: '/cases/:link',
    create: (link: string) => `/cases/${link}`,
  },
  caseCreate: {
    mask: '/cases/create',
    create: () => `/cases/create`,
  },
  caseUpdate: {
    mask: '/cases/:id/update',
    create: (id: string) => `/cases/${id}/update`,
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
  surveyCreate: {
    mask: '/surveys/create',
    create: () => `/surveys/create`,
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
