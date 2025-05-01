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
  const response = await api.get<OrganizationModel>(url, { signal });
  return response.data;
};
