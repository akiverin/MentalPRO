import axios from 'axios';
import qs from 'qs';

export const API_BASE_URL = 'http://localhost:3030/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      encodeValuesOnly: true,
      arrayFormat: 'brackets',
    }),
});

export const apiRoutes = {
  users: {
    auth: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  practice: {
    getAll: '/practice',
    getById: (id: string) => `/practice/${id}`,
    create: '/practice',
    update: (id: string) => `/practice/${id}`,
    delete: (id: string) => `/practice/${id}`,
  },
  survey: {
    getAll: '/survey',
    getById: (id: string) => `/survey/${id}`,
    getQuestions: (id: string) => `/survey/${id}/questions`,
    create: '/survey',
    update: (id: string) => `/survey/${id}`,
    delete: (id: string) => `/survey/${id}`,
  },
  organization: {
    getAll: '/organization',
    getById: (id: string) => `/organization/${id}`,
    create: '/organization',
    update: (id: string) => `/organization/${id}`,
    delete: (id: string) => `/organization/${id}`,
  },
  result: {
    getByUser: '/result/my',
    create: '/result',
  },
  application: {
    getAll: '/application',
    getByUser: '/application/my',
    getByOrganization: (id: string) => `/application/organization/${id}`,
    create: '/application',
    updateStatus: (id: string) => `/application/${id}/status`,
    delete: (id: string) => `/application/${id}`,
  },
};
