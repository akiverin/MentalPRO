import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from '@utils/meta';
import { QuestionModel } from '../model';
import { createQuestion } from '../api';
import { QuestionCreate } from '../types';
import { errorMessage, isCancelError } from '@utils/errors';

export class QuestionStore {
  questions: QuestionModel[] = [];
  question: QuestionModel | null = null;
  meta: Meta = Meta.initial;
  error = '';

  private _abortCreateController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async create(data: QuestionCreate): Promise<QuestionModel | null> {
    if (this._abortCreateController) {
      this._abortCreateController.abort();
    }
    this._abortCreateController = new AbortController();
    const signal = this._abortCreateController.signal;

    this.meta = Meta.loading;
    try {
      const response = await createQuestion(data, signal);
      runInAction(() => {
        this.question = response;
        this.meta = Meta.success;
      });
      return this.question;
    } catch (error) {
      if (isCancelError(error)) {
        return null;
      }
      runInAction(() => {
        this.error = errorMessage(error);
        this.meta = Meta.error;
      });
      return null;
    } finally {
      runInAction(() => {
        this._abortCreateController = null;
      });
    }
  }
}
