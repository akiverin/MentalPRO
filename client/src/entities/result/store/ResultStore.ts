import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from '@utils/meta';
import { ResultModel } from '../model';
import { getResultByUser, createResult } from '../api';
import { PaginationStore } from '@entities/pagination/stores/PaginationStore';
import { LoadResponse } from '@/types/loadResponse';
import { errorMessage, isCancelError } from '@utils/errors';
import { Result } from '../types';
export class ResultStore {
  results: ResultModel[] | null = null;
  meta: Meta = Meta.initial;
  error = '';
  pagination = new PaginationStore();
  searchQuery = '';

  private _abortController: AbortController | null = null;
  private _abortCreateController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  async fetchCreate(data: ResultModel): Promise<LoadResponse> {
    if (this._abortCreateController) {
      this._abortCreateController.abort();
    }

    this._abortCreateController = new AbortController();
    const signal = this._abortCreateController.signal;

    this.meta = Meta.loading;

    try {
      await createResult(data, signal);
      runInAction(() => {
        this.meta = Meta.success;
      });
      return { success: true };
    } catch (error) {
      if (isCancelError(error)) {
        return { success: false };
      }
      runInAction(() => {
        this.error = errorMessage(error);
        this.meta = Meta.error;
      });
      return {
        success: false,
        error: errorMessage(error),
      };
    } finally {
      runInAction(() => {
        this._abortCreateController = null;
      });
    }
  }

  async fetchResultsByUser(): Promise<ResultModel[] | null> {
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();
    const signal = this._abortController.signal;

    this.meta = Meta.loading;
    try {
      const response = await getResultByUser(signal);
      runInAction(() => {
        this.results = response.map((res: Result) => new ResultModel(res));
        this.meta = Meta.success;
      });
      return this.results || null;
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
        this._abortController = null;
      });
    }
  }
}
