// model/user.model.ts
import { User } from './types';
import { makeAutoObservable } from 'mobx';

export class UserModel {
  constructor(private readonly data: User) {
    makeAutoObservable(this);
  }

  get id(): string {
    return this.data._id;
  }

  get firstName(): string {
    return this.data.firstName;
  }

  get lastName(): string | undefined {
    return this.data.lastName;
  }

  get patronymic(): string | undefined {
    return this.data.patronymic;
  }

  get email(): string {
    return this.data.email;
  }

  get image(): string | undefined {
    return this.data.image;
  }

  get emailConfirmed(): boolean {
    return this.data.emailConfirmed;
  }

  get vkId(): string | undefined {
    return this.data.vkId;
  }

  get yandexId(): string | undefined {
    return this.data.yandexId;
  }

  get organizationId(): string | undefined {
    return this.data.organizationId;
  }

  get role(): string {
    return this.data.role;
  }

  get createdAt(): string {
    return this.data.createdAt;
  }

  get updatedAt(): string {
    return this.data.updatedAt;
  }

  toJSON(): User {
    return this.data;
  }
}
