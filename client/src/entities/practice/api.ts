import { api, apiRoutes } from '@config/api';
import { PracticesResponse } from './types';
import { PracticeModel } from './model';

export const getPractices = async (
  page: number,
  pageSize: number,
  search?: string,
  signal?: AbortSignal,
): Promise<PracticesResponse> => {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  if (search) {
    params.set('search', search);
  }
  const url = `${apiRoutes.practice.getAll}?${params.toString()}`;

  const response = await api.get<PracticesResponse>(url, { signal });
  return response.data;
};

export const getPracticeById = async (id: string, signal?: AbortSignal): Promise<PracticeModel> => {
  const url = `${apiRoutes.practice.getById(id)}/`;
  const response = await api.get<PracticeModel>(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};

export const createPractice = async (data: FormData, signal?: AbortSignal): Promise<PracticeModel> => {
  const url = `${apiRoutes.practice.create}/`;
  console.log(data);
  const response = await api.post<PracticeModel>(url, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};

export const deletePractice = async (id: string, signal?: AbortSignal): Promise<string> => {
  const url = `${apiRoutes.practice.delete(id)}/`;
  const response = await api.delete<string>(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};
