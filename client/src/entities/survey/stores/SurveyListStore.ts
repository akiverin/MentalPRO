import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from '@utils/meta';
import { SurveyModel } from '../model';
import { getSurveyById, getSurveys } from '../api';
import { Survey } from '../types';
import { PaginationStore } from '@entities/pagination/stores/PaginationStore';
import { LoadResponse } from '@/types/loadResponse';
import { errorMessage, isCancelError } from '@utils/errors';
export class SurveyListStore {
  surveys: SurveyModel[] = [];
  survey: SurveyModel | null = null;
  meta: Meta = Meta.initial;
  error = '';
  pagination = new PaginationStore();
  searchQuery = '';

  private _abortController: AbortController | null = null;
  private _abortByIdController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  async fetchSurveys(page = 1): Promise<LoadResponse> {
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();
    const signal = this._abortController.signal;

    this.meta = Meta.loading;

    try {
      const response = await getSurveys(page, this.pagination.pageSize, this.searchQuery, signal);
      runInAction(() => {
        this.surveys = response.data.map((c: Survey) => new SurveyModel(c));
        this.pagination.setPagination(response.meta.pagination);
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
        this._abortController = null;
      });
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  async fetchSurveyById(id: string): Promise<SurveyModel | null> {
    if (this._abortByIdController) {
      this._abortByIdController.abort();
    }

    this._abortByIdController = new AbortController();
    const signal = this._abortByIdController.signal;

    this.meta = Meta.loading;
    try {
      const response = await getSurveyById(id, signal);
      runInAction(() => {
        this.survey = response;
        this.meta = Meta.success;
      });
      return this.surveys[0] || null;
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
        this._abortByIdController = null;
      });
    }
  }
}
