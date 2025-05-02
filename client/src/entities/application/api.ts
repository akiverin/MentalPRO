import { api, apiRoutes } from '@config/api';
import { ApplicationModel } from './model';
import { ApplicationPopulated, ApplicationStatus } from './types';

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

export const getApplicationByUser = async (signal?: AbortSignal): Promise<ApplicationModel> => {
  const url = `${apiRoutes.application.getByUser}/`;
  const response = await api.get<ApplicationPopulated>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    signal,
  });
  return new ApplicationModel(response.data);
};

export const createApplication = async (model: ApplicationModel, signal?: AbortSignal): Promise<ApplicationModel> => {
  const url = `${apiRoutes.application.create}/`;
  const response = await api.post<ApplicationPopulated>(url, model.toRequest(), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    signal,
  });
  return new ApplicationModel(response.data);
};

export const getApplicationByOrganization = async (id: string, signal?: AbortSignal): Promise<ApplicationModel[]> => {
  const url = `${apiRoutes.application.getByOrganization(id)}/`;
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
