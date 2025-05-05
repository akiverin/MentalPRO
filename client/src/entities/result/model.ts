import { Result } from './types';

export class ResultModel {
  constructor(private readonly data: Result) {}

  get _id() {
    return this.data._id;
  }

  get surveyId() {
    return this.data.surveyId;
  }

  get userId() {
    return this.data.userId;
  }

  get answers() {
    return this.data.answers;
  }

  get createdAt() {
    return new Date(this.data.createdAt).toLocaleDateString();
  }

  get updateAt() {
    return new Date(this.data.updatedAt).toLocaleDateString();
  }
}
