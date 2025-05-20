import { api, apiRoutes } from '@config/api';
import { OrganizationsResponse } from './types';
import { OrganizationModel } from './model';

export const getOrganizations = async (
  page: number,
  pageSize: number,
  search?: string,
  signal?: AbortSignal,
): Promise<OrganizationsResponse> => {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  if (search) {
    params.set('search', search);
  }
  const url = `${apiRoutes.organization.getAll}?${params.toString()}`;

  const response = await api.get<OrganizationsResponse>(url, { signal });
  return response.data;
};

export const getOrganizationById = async (id: string, signal?: AbortSignal): Promise<OrganizationModel> => {
  const url = `${apiRoutes.organization.getById(id)}/`;
  const response = await api.get<OrganizationModel>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    signal,
  });
  return response.data;
};

export const createOrganization = async (data: FormData, signal?: AbortSignal): Promise<OrganizationModel> => {
  const url = `${apiRoutes.organization.create}/`;
  const response = await api.post<OrganizationModel>(url, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};

export const deleteOrganization = async (id: string, signal?: AbortSignal): Promise<string> => {
  const url = `${apiRoutes.organization.delete(id)}/`;
  const response = await api.delete<string>(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    signal,
  });
  return response.data;
};

export const activateOrganization = async (id: string, signal?: AbortSignal): Promise<OrganizationModel> => {
  const url = `${apiRoutes.organization.update(id)}/`;
  const response = await api.put<OrganizationModel>(
    url,
    { isActive: true },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      signal,
    },
  );
  return response.data;
};
