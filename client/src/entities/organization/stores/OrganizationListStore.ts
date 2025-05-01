import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from '@utils/meta';
import { OrganizationModel } from '../model';
import { getOrganizationById, getOrganizations } from '../api';
import { Organization } from '../types';
import { PaginationStore } from '@entities/pagination/stores/PaginationStore';
import { LoadResponse } from '@/types/loadResponse';
import { errorMessage, isCancelError } from '@utils/errors';
export class OrganizationListStore {
  organizations: OrganizationModel[] = [];
  organization: OrganizationModel | null = null;
  meta: Meta = Meta.initial;
  error = '';
  pagination = new PaginationStore();
  searchQuery = '';

  private _abortController: AbortController | null = null;
  private _abortByIdController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  async fetchOrganizations(page = 1): Promise<LoadResponse> {
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();
    const signal = this._abortController.signal;

    this.meta = Meta.loading;

    try {
      const response = await getOrganizations(page, this.pagination.pageSize, this.searchQuery, signal);
      runInAction(() => {
        this.organizations = response.data.map((c: Organization) => new OrganizationModel(c));
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

  async fetchOrganizationById(id: string): Promise<OrganizationModel | null> {
    if (this._abortByIdController) {
      this._abortByIdController.abort();
    }

    this._abortByIdController = new AbortController();
    const signal = this._abortByIdController.signal;

    this.meta = Meta.loading;
    try {
      const response = await getOrganizationById(id, signal);
      runInAction(() => {
        this.organization = response;
        this.meta = Meta.success;
      });
      return this.organizations[0] || null;
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
