import { api, apiRoutes } from '@/config/api';
import { QuestionModel } from './model';
import { QuestionCreate } from './types';

export const createQuestion = async (data: QuestionCreate, signal?: AbortSignal): Promise<QuestionModel> => {
  const url = `${apiRoutes.question.create}/`;
  const response = await api.post<QuestionModel>(url, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};
