import { makeAutoObservable, runInAction } from 'mobx';
import { AnswerFormStore } from '../../answer/stores/AnswerFormStore';

export interface IQuestionForm {
  number: number | '';
  text: string;
  section: string;
  answerStore: AnswerFormStore;
}

export class QuestionFormStore {
  questions: IQuestionForm[] = [];
  errors: { number: string; text: string; section: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addQuestion() {
    const answerStore = new AnswerFormStore();
    answerStore.addAnswer();
    this.questions.push({ number: '', text: '', section: '', answerStore });
    this.errors.push({ number: '', text: '', section: '' });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
    this.errors.splice(index, 1);
  }

  setField(index: number, field: keyof Omit<IQuestionForm, 'answerStore'>, value: string | number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.questions[index][field] = value;
    runInAction(() => {
      this.errors[index][field] = '';
    });
  }

  validateAll(): boolean {
    const qErrs: { number: string; text: string; section: string }[] = [];
    let ok = true;
    this.questions.forEach((q, i) => {
      const e = { number: '', text: '', section: '' };
      if (q.number === '' || typeof q.number !== 'number') {
        e.number = 'Номер вопроса обязателен';
        ok = false;
      }
      if (!q.text) {
        e.text = 'Текст вопроса обязателен';
        ok = false;
      }
      if (!q.section) {
        e.section = 'Секция обязательна';
        ok = false;
      }
      // validate answers
      if (!q.answerStore.validateAll()) ok = false;
      qErrs[i] = e;
    });
    runInAction(() => {
      this.errors = qErrs;
    });
    return ok;
  }
}
