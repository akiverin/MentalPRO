import { Organization } from './types';

export class OrganizationModel {
  constructor(private readonly data: Organization) {}

  get id() {
    return this.data._id;
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }

  get image() {
    return this.data.image || '';
  }

  get members() {
    return this.data.members || [];
  }

  get administrators() {
    return this.data.administrators || [];
  }

  get isActive() {
    return this.data.isActive || false;
  }

  get createdBy() {
    return this.data.createdBy || null;
  }

  get createdAt() {
    return new Date(this.data.createdAt).toLocaleDateString();
  }

  get updateAt() {
    return new Date(this.data.updatedAt).toLocaleDateString();
  }
}
