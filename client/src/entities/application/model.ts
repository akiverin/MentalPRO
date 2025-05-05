import { ApplicationRequest, ApplicationPopulated } from './types';

export class ApplicationModel {
  constructor(private readonly data: ApplicationPopulated) {}

  get id() {
    return this.data._id;
  }

  get userId() {
    return this.data.userId;
  }

  get organizationId() {
    return this.data.organizationId;
  }

  get status() {
    return this.data.status ?? 'pending';
  }

  get createdAt() {
    return new Date(this.data.createdAt).toLocaleDateString();
  }

  get updatedAt() {
    return new Date(this.data.updatedAt).toLocaleDateString();
  }

  toRequest(): ApplicationRequest {
    return {
      userId: typeof this.data.userId === 'string' ? this.data.userId : this.data.userId.id,
      organizationId:
        typeof this.data.organizationId === 'string' ? this.data.organizationId : this.data.organizationId.id,
      status: this.status,
    };
  }
}
