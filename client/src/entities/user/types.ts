export type Role = 'client' | 'hr' | 'admin';

export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  patronymic?: string;
  email: string;
  image?: string;
  emailConfirmed: boolean;
  yandexId?: string;
  organizationId?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export type AuthResponse = {
  token: string;
  user: User;
};
