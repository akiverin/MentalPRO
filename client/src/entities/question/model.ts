import { Question } from './types';

export class QuestionModel {
  constructor(private readonly data: Question) {}

  get _id() {
    return this.data._id;
  }

  get number() {
    return this.data.number;
  }

  get text() {
    return this.data.text;
  }

  get section() {
    return this.data.section;
  }

  get answers() {
    return this.data.answers;
  }
}
