import { Answer } from './types';

export class AnswerModel {
  constructor(private readonly data: Answer) {}

  get _id() {
    return this.data._id;
  }

  get number() {
    return this.data.number;
  }

  get text() {
    return this.data.text;
  }

  get points() {
    return this.data.points;
  }
}
