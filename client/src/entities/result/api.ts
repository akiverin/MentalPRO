import { api, apiRoutes } from '@config/api';
import { ResultModel } from './model';
import { Result } from './types';

export const getResultByUser = async (signal?: AbortSignal): Promise<Result[]> => {
  const url = `${apiRoutes.result.getByUser}/`;
  const response = await api.get<Result[]>(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};

export const createResult = async (data: ResultModel, signal?: AbortSignal): Promise<ResultModel> => {
  const url = `${apiRoutes.result.create}/`;
  const response = await api.post<ResultModel>(url, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};
