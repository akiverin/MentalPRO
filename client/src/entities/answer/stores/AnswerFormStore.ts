import { makeAutoObservable, runInAction } from 'mobx';

export interface IAnswerForm {
  number: number | '';
  text: string;
  points: number | '';
}

export class AnswerFormStore {
  answers: IAnswerForm[] = [];
  errors: { number: string; text: string; points: string }[][] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addAnswer() {
    this.answers.push({ number: '', text: '', points: '' });
    this.errors.push([{ number: '', text: '', points: '' }]);
  }

  removeAnswer(index: number) {
    this.answers.splice(index, 1);
    this.errors.splice(index, 1);
  }

  setField(index: number, field: keyof IAnswerForm, value: string | number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.answers[index][field] = value;
    runInAction(() => {
      this.errors[index][0][field] = '';
    });
  }

  validateAll(): boolean {
    const errs: { number: string; text: string; points: string }[][] = [];
    this.answers.forEach((ans, i) => {
      const e = { number: '', text: '', points: '' };
      if (ans.number === '' || typeof ans.number !== 'number') e.number = 'Номер обязателен';
      if (!ans.text) e.text = 'Текст ответа обязателен';
      if (ans.points === '' || typeof ans.points !== 'number') e.points = 'Баллы обязателен';
      errs[i] = [e];
    });
    runInAction(() => {
      this.errors = errs;
    });
    return errs.every((arr) => !arr[0].number && !arr[0].text && !arr[0].points);
  }
}
