import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from '@utils/meta';
import { OrganizationModel } from '../model';
import {
  activateOrganization,
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  getOrganizations,
  updateOrganization,
} from '../api';
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
  private _abortCreateController: AbortController | null = null;
  private _abortDeleteController: AbortController | null = null;
  private _abortActivateController: AbortController | null = null;

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

  async create(data: FormData): Promise<LoadResponse | null> {
    if (this._abortCreateController) {
      this._abortCreateController.abort();
    }

    this._abortCreateController = new AbortController();
    const signal = this._abortCreateController.signal;
    this.meta = Meta.loading;
    try {
      const response = await createOrganization(data, signal);
      runInAction(() => {
        this.organization = response;
        this.organizations.push(response);
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

  async clear() {
    this.organizations = [];
    this.organization = null;
    this.meta = Meta.initial;
    this.error = '';
  }

  async delete(id: string): Promise<LoadResponse | null> {
    if (this._abortDeleteController) {
      this._abortDeleteController.abort();
    }

    this._abortDeleteController = new AbortController();
    const signal = this._abortDeleteController.signal;

    this.meta = Meta.loading;
    try {
      await deleteOrganization(id, signal);
      console.log(1111);
      runInAction(() => {
        this.organizations = this.organizations.filter((org) => org.id !== id);
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

  async activate(id: string): Promise<OrganizationModel | null> {
    if (this._abortActivateController) {
      this._abortActivateController.abort();
    }

    this._abortActivateController = new AbortController();
    const signal = this._abortActivateController.signal;

    this.meta = Meta.loading;
    try {
      const response = await activateOrganization(id, signal);
      runInAction(() => {
        this.meta = Meta.success;
      });
      this.fetchOrganizations();
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
        this._abortActivateController = null;
      });
    }
  }

  async update(id: string, obj: FormData): Promise<OrganizationModel | null> {
    if (this._abortActivateController) {
      this._abortActivateController.abort();
    }

    this._abortActivateController = new AbortController();
    const signal = this._abortActivateController.signal;

    this.meta = Meta.loading;
    try {
      const response = await updateOrganization(id, obj, signal);
      runInAction(() => {
        this.meta = Meta.success;
      });
      this.fetchOrganizations();
      this.fetchOrganizationById(id);
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
        this._abortActivateController = null;
      });
    }
  }
}
