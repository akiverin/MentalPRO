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
  const response = await api.get<PracticeModel>(url, { signal });
  return response.data;
};
