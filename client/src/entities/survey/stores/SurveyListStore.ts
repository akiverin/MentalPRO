import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from '@utils/meta';
import { SurveyModel } from '../model';
import { createSurvey, deleteSurvey, getQuestionsSurvey, getSurveyById, getSurveys } from '../api';
import { Survey, SurveyCreate } from '../types';
import { PaginationStore } from '@entities/pagination/stores/PaginationStore';
import { LoadResponse } from '@/types/loadResponse';
import { errorMessage, isCancelError } from '@utils/errors';
import { QuestionModel } from '@/entities/question/model';
export class SurveyListStore {
  surveys: SurveyModel[] = [];
  survey: SurveyModel | null = null;
  questions: QuestionModel[] = [];
  meta: Meta = Meta.initial;
  error = '';
  pagination = new PaginationStore();
  searchQuery = '';

  private _abortController: AbortController | null = null;
  private _abortCreateController: AbortController | null = null;
  private _abortByIdController: AbortController | null = null;
  private _abortDeleteController: AbortController | null = null;
  private _abortQuestionsController: AbortController | null = null;

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

  async fetchSurveyById(_id: string): Promise<SurveyModel | null> {
    if (this._abortByIdController) {
      this._abortByIdController.abort();
    }

    this._abortByIdController = new AbortController();
    const signal = this._abortByIdController.signal;

    this.meta = Meta.loading;
    try {
      const response = await getSurveyById(_id, signal);
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

  async fetchQuestions(id: string): Promise<LoadResponse | null> {
    if (this._abortQuestionsController) {
      this._abortQuestionsController.abort();
    }

    this._abortQuestionsController = new AbortController();
    const signal = this._abortQuestionsController.signal;

    this.meta = Meta.loading;
    try {
      const response = await getQuestionsSurvey(id, signal);
      runInAction(() => {
        this.questions = response.questions;
        this.meta = Meta.success;
      });
      return { success: true };
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
        this._abortQuestionsController = null;
      });
    }
  }

  async create(data: SurveyCreate): Promise<LoadResponse | null> {
    if (this._abortCreateController) {
      this._abortCreateController.abort();
    }

    this._abortCreateController = new AbortController();
    const signal = this._abortCreateController.signal;

    this.meta = Meta.loading;
    try {
      const response = await createSurvey(data, signal);
      runInAction(() => {
        this.survey = response;
        this.meta = Meta.success;
      });
      return { success: true };
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

  async delete(id: string): Promise<LoadResponse | null> {
    if (this._abortDeleteController) {
      this._abortDeleteController.abort();
    }

    this._abortDeleteController = new AbortController();
    const signal = this._abortDeleteController.signal;

    this.meta = Meta.loading;
    try {
      await deleteSurvey(id, signal);
      runInAction(() => {
        this.meta = Meta.success;
      });
      return { success: true };
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
        this._abortDeleteController = null;
      });
    }
  }
}
