import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from '@utils/meta';
import { AnswerModel } from '../model';
import { createAnswer } from '../api';
import { AnswerCreate } from '../types';
import { errorMessage, isCancelError } from '@utils/errors';

export class AnswerStore {
  answers: AnswerModel[] = [];
  answer: AnswerModel | null = null;
  meta: Meta = Meta.initial;
  error = '';

  private _abortCreateController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async create(data: AnswerCreate): Promise<AnswerModel | null> {
    if (this._abortCreateController) {
      this._abortCreateController.abort();
    }

    this._abortCreateController = new AbortController();
    const signal = this._abortCreateController.signal;

    this.meta = Meta.loading;
    try {
      const response = await createAnswer(data, signal);
      runInAction(() => {
        this.answer = response;
        this.meta = Meta.success;
      });
      return this.answer;
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
