import axios from 'axios';
import { AuthResponse, User } from './types';
import { formatApiError } from '@/utils/errors';
import { apiRoutes, api } from '@/config/api';

export const login = async (data: { email: string; password: string }, signal?: AbortSignal) => {
  try {
    const response = await api.post<AuthResponse>(apiRoutes.users.auth, data, {
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.error?.message;
      if (apiMessage) {
        throw new Error(apiMessage);
      }
    }
    throw new Error(formatApiError('login', error));
  }
};

export const register = async (
  data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  },
  signal?: AbortSignal,
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>(apiRoutes.users.register, data, { signal });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.error?.message;
      if (apiMessage) {
        throw new Error(apiMessage);
      }
    }
    throw new Error(formatApiError('register', error));
  }
};

export const me = async (signal?: AbortSignal): Promise<User> => {
  try {
    const response = await api.get(apiRoutes.users.me, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.error?.message;
      if (apiMessage) {
        throw new Error(apiMessage);
      }
    }
    throw new Error(formatApiError('me', error));
  }
};

export const updateUser = async (id: string, data: FormData, signal?: AbortSignal): Promise<AuthResponse> => {
  try {
    const response = await api.patch<AuthResponse>(apiRoutes.users.update(id), data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.error?.message;
      if (apiMessage) {
        throw new Error(apiMessage);
      }
    }
    throw new Error(formatApiError('update', error));
  }
};
