import { api, apiRoutes } from '@config/api';
import { ApplicationModel } from './model';
import { ApplicationPopulated, ApplicationRequest, ApplicationStatus } from './types';

export const getApplications = async (signal?: AbortSignal): Promise<ApplicationModel[]> => {
  const url = `${apiRoutes.application.getAll}`;
  const response = await api.get<ApplicationPopulated[]>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    signal,
  });
  return response.data.map((item) => new ApplicationModel(item));
};

export const getApplicationByUser = async (signal?: AbortSignal): Promise<ApplicationPopulated[]> => {
  const url = `${apiRoutes.application.getByUser}/`;
  const response = await api.get<ApplicationPopulated[]>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    signal,
  });
  return response.data;
};

export const createApplication = async (model: ApplicationRequest, signal?: AbortSignal): Promise<ApplicationModel> => {
  const url = `${apiRoutes.application.create}/`;
  const response = await api.post<ApplicationModel>(url, model, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    signal,
  });
  return response.data;
};

export const getApplicationByOrganization = async (_id: string, signal?: AbortSignal): Promise<ApplicationModel[]> => {
  const url = `${apiRoutes.application.getByOrganization(_id)}/`;
  const response = await api.get<ApplicationPopulated[]>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    signal,
  });
  return response.data.map((app) => new ApplicationModel(app));
};

export const updateApplicationStatus = async (
  id: string,
  status: ApplicationStatus,
  signal?: AbortSignal,
): Promise<ApplicationModel> => {
  const url = `${apiRoutes.application.updateStatus(id)}/`;
  const response = await api.patch<ApplicationPopulated>(
    url,
    { status },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      signal,
    },
  );
  return new ApplicationModel(response.data);
};

export const deleteApplication = async (id: string, signal?: AbortSignal): Promise<void> => {
  const url = `${apiRoutes.application.delete(id)}/`;
  await api.delete(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    signal,
  });
};
