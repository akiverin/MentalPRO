import { Survey } from './types';

export class SurveyModel {
  constructor(private readonly data: Survey) {}

  get id() {
    return this.data._id;
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }

  get details() {
    return this.data.details;
  }

  get results() {
    return this.data.results;
  }

  get time() {
    return this.data.time;
  }

  get image() {
    return this.data.image || '';
  }

  get ranges() {
    return this.data.ranges || [];
  }

  get createdAt() {
    return new Date(this.data.createdAt).toLocaleDateString();
  }

  get updateAt() {
    return new Date(this.data.updatedAt).toLocaleDateString();
  }
}
