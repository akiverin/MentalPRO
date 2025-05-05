import { api, apiRoutes } from '@/config/api';
import { AnswerModel } from './model';
import { AnswerCreate } from './types';

export const createAnswer = async (data: AnswerCreate, signal?: AbortSignal): Promise<AnswerModel> => {
  const url = `${apiRoutes.answer.create}/`;
  const response = await api.post<AnswerModel>(url, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};
