import { api, apiRoutes } from '@config/api';
import { QuestionsResponse, SurveysResponse } from './types';
import { SurveyModel } from './model';

export const getSurveys = async (
  page: number,
  pageSize: number,
  search?: string,
  signal?: AbortSignal,
): Promise<SurveysResponse> => {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  if (search) {
    params.set('search', search);
  }
  const url = `${apiRoutes.survey.getAll}?${params.toString()}`;

  const response = await api.get<SurveysResponse>(url, { signal });
  return response.data;
};

export const getSurveyById = async (id: string, signal?: AbortSignal): Promise<SurveyModel> => {
  const url = `${apiRoutes.survey.getById(id)}/`;
  const response = await api.get<SurveyModel>(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};

export const getQuestionsSurvey = async (id: string, signal?: AbortSignal): Promise<QuestionsResponse> => {
  const url = `${apiRoutes.survey.getQuestions(id)}/`;
  const response = await api.get<QuestionsResponse>(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};
