import axios from "axios";
import qs from "qs";

export const API_BASE_URL = "http://localhost:3030/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    }),
});

export const apiRoutes = {
  users: {
    auth: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
  },
  practice: {
    getAll: "/practice",
    getById: (id: string) => `/practice/${id}`,
    create: "/practice",
    update: (id: string) => `/practice/${id}`,
    delete: (id: string) => `/practice/${id}`,
  },
};
