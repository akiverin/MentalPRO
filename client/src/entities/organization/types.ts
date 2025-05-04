import { UserModel } from '@entities/user/model';

export interface Organization {
  id: string;
  title: string;
  description: string;
  image?: string;
  members?: UserModel[];
  administrators?: UserModel[];
  isActive?: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationsResponse {
  data: Organization[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
