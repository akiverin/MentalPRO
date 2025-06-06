import { OrganizationModel } from '../organization/model';
import { UserModel } from '../user/model';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface ApplicationRequest {
  userId: string;
  organizationId: string;
  status?: ApplicationStatus;
}

export interface ApplicationPopulated {
  _id: string;
  userId: UserModel;
  organizationId: OrganizationModel | string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}
