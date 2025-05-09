import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from '@utils/meta';
import { PracticeModel } from '../model';
import { createPractice, deletePractice, getPracticeById, getPractices, updatePractice } from '../api';
import { Practice } from '../types';
import { PaginationStore } from '@entities/pagination/stores/PaginationStore';
import { LoadResponse } from '@/types/loadResponse';
import { errorMessage, isCancelError } from '@utils/errors';
export class PracticeListStore {
  practices: PracticeModel[] = [];
  practice: PracticeModel | null = null;
  meta: Meta = Meta.initial;
  error = '';
  pagination = new PaginationStore();
  searchQuery = '';

  private _abortController: AbortController | null = null;
  private _abortByIdController: AbortController | null = null;
  private _abortCreateController: AbortController | null = null;
  private _abortUpdateController: AbortController | null = null;
  private _abortDeleteController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPractices(page = 1): Promise<LoadResponse> {
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();
    const signal = this._abortController.signal;

    this.meta = Meta.loading;

    try {
      const response = await getPractices(page, this.pagination.pageSize, this.searchQuery, signal);
      runInAction(() => {
        this.practices = response.data.map((c: Practice) => new PracticeModel(c));
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

  async fetchPracticeById(id: string): Promise<PracticeModel | null> {
    if (this._abortByIdController) {
      this._abortByIdController.abort();
    }

    this._abortByIdController = new AbortController();
    const signal = this._abortByIdController.signal;

    this.meta = Meta.loading;
    try {
      const response = await getPracticeById(id, signal);
      runInAction(() => {
        this.practice = response;
        this.meta = Meta.success;
      });
      return this.practices[0] || null;
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

  async create(data: FormData): Promise<LoadResponse | null> {
    if (this._abortCreateController) {
      this._abortCreateController.abort();
    }

    this._abortCreateController = new AbortController();
    const signal = this._abortCreateController.signal;

    this.meta = Meta.loading;
    try {
      const response = await createPractice(data, signal);
      runInAction(() => {
        this.practice = response;
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

  async update(id: string, data: FormData): Promise<LoadResponse | null> {
    if (this._abortUpdateController) {
      this._abortUpdateController.abort();
    }

    this._abortUpdateController = new AbortController();
    const signal = this._abortUpdateController.signal;

    this.meta = Meta.loading;
    try {
      const response = await updatePractice(id, data, signal);
      runInAction(() => {
        this.practice = response;
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
        this._abortUpdateController = null;
      });
    }
  }

  async delete(id: string): Promise<string | null> {
    if (this._abortDeleteController) {
      this._abortDeleteController.abort();
    }

    this._abortDeleteController = new AbortController();
    const signal = this._abortDeleteController.signal;

    this.meta = Meta.loading;
    try {
      const response = await deletePractice(id, signal);
      runInAction(() => {
        this.meta = Meta.success;
      });
      this.fetchPractices();
      return response;
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
