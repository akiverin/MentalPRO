import { makeAutoObservable, runInAction } from 'mobx';
import { Meta } from '@utils/meta';
import { ApplicationModel } from '../model';
import {
  createApplication,
  deleteApplication,
  getApplicationByOrganization,
  getApplicationByUser,
  getApplications,
  updateApplicationStatus,
} from '../api';
import { LoadResponse } from '@/types/loadResponse';
import { errorMessage, isCancelError } from '@utils/errors';
import { ApplicationPopulated, ApplicationRequest, ApplicationStatus } from '../types';
export class ApplicationStore {
  applications: ApplicationModel[] = [];
  application: ApplicationModel | null = null;
  meta: Meta = Meta.initial;
  error = '';

  private _abortController: AbortController | null = null;
  private _abortCreateController: AbortController | null = null;
  private _abortUpdateController: AbortController | null = null;
  private _abortDeleteController: AbortController | null = null;
  private _abortByUserController: AbortController | null = null;
  private _abortByOrganizationController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchApplications(): Promise<LoadResponse> {
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();
    const signal = this._abortController.signal;

    this.meta = Meta.loading;

    try {
      const response = await getApplications(signal);
      runInAction(() => {
        this.applications = response;
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
  async fetchApplicationsByUser(): Promise<ApplicationModel[] | null> {
    if (this._abortByUserController) {
      this._abortByUserController.abort();
    }

    this._abortByUserController = new AbortController();
    const signal = this._abortByUserController.signal;

    this.meta = Meta.loading;
    try {
      const response = await getApplicationByUser(signal);
      runInAction(() => {
        this.applications = response.map((app: ApplicationPopulated) => new ApplicationModel(app));
        this.meta = Meta.success;
      });
      return this.applications || null;
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
        this._abortByUserController = null;
      });
    }
  }
  async fetchApplicationByOrganization(id: string): Promise<ApplicationModel[] | null> {
    if (this._abortByOrganizationController) {
      this._abortByOrganizationController.abort();
    }

    this._abortByOrganizationController = new AbortController();
    const signal = this._abortByOrganizationController.signal;

    this.meta = Meta.loading;
    try {
      const response = await getApplicationByOrganization(id, signal);
      runInAction(() => {
        this.applications = response;
        this.meta = Meta.success;
      });
      return this.applications;
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
        this._abortByOrganizationController = null;
      });
    }
  }

  async createApplication(data: ApplicationRequest): Promise<LoadResponse> {
    if (this._abortCreateController) {
      this._abortCreateController.abort();
    }

    this._abortCreateController = new AbortController();
    const signal = this._abortCreateController.signal;

    this.meta = Meta.loading;

    try {
      const response = await createApplication(data, signal);
      runInAction(() => {
        this.application = response;
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

  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<LoadResponse> {
    if (this._abortUpdateController) {
      this._abortUpdateController.abort();
    }

    this._abortUpdateController = new AbortController();
    const signal = this._abortUpdateController.signal;

    this.meta = Meta.loading;

    try {
      const response = await updateApplicationStatus(id, status, signal);
      runInAction(() => {
        this.application = response;
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
        this._abortUpdateController = null;
      });
    }
  }

  async deleteApplication(id: string): Promise<LoadResponse> {
    if (this._abortDeleteController) {
      this._abortDeleteController.abort();
    }

    this._abortDeleteController = new AbortController();
    const signal = this._abortDeleteController.signal;

    this.meta = Meta.loading;

    try {
      await deleteApplication(id, signal);
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
        this._abortDeleteController = null;
      });
    }
  }

  async clear() {
    this.applications = [];
    this.application = null;
    this.meta = Meta.initial;
    this.error = '';
  }
}
