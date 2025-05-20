import { makeAutoObservable, runInAction } from 'mobx';
import { login, register, me, updateUser, yandex } from '../api';
import { AuthResponse } from '../types';
import { Meta } from '@utils/meta';
import { UserModel } from '../model';
import { errorMessage, isCancelError } from '@utils/errors';
import { LoadResponse } from '@/types/loadResponse';

const AUTH_TOKEN_KEY = 'authToken';

export class UserStore {
  user: UserModel | null = null;
  token: string | null = null;
  meta: Meta = Meta.initial;
  error: string = '';

  private _loginAbortController: AbortController | null = null;
  private _meAbortController: AbortController | null = null;
  private _getYandexAbortController: AbortController | null = null;
  private _updateAbortController: AbortController | null = null;
  private _registerAbortController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);

    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (storedToken) {
      try {
        this.token = storedToken;
        this.meta = Meta.success;
      } catch {
        this.logout();
      }
    }
  }

  get isAuthenticated(): boolean {
    return !!this.user && this.meta === 'success';
  }

  async login(email: string, password: string): Promise<boolean> {
    if (this._loginAbortController) {
      this._loginAbortController.abort();
    }

    this._loginAbortController = new AbortController();
    const signal = this._loginAbortController.signal;

    this.meta = Meta.loading;

    try {
      const response: AuthResponse = await login({ email, password }, signal);

      runInAction(() => {
        this.token = response.token;
        this.user = new UserModel(response.user);
        this.meta = Meta.success;
      });
      this.setToken(response.token);

      return true;
    } catch (error) {
      if (isCancelError(error)) return false;

      runInAction(() => {
        this.error = errorMessage(error);
        this.meta = Meta.error;
      });
      return false;
    } finally {
      runInAction(() => {
        this._loginAbortController = null;
      });
    }
  }

  async register({
    firstName,
    lastName,
    email,
    password,
    role,
  }: {
    firstName: string;
    email: string;
    password: string;
    lastName?: string;
    role?: string;
  }): Promise<boolean> {
    if (this._registerAbortController) {
      this._registerAbortController.abort();
    }

    this._registerAbortController = new AbortController();
    const signal = this._registerAbortController.signal;

    this.meta = Meta.loading;

    try {
      const response: AuthResponse = await register({ firstName, lastName, email, password, role }, signal);

      runInAction(() => {
        this.user = new UserModel(response.user);
        this.meta = Meta.success;
      });

      return true;
    } catch (error) {
      if (isCancelError(error)) return false;

      runInAction(() => {
        this.error = errorMessage(error);
        this.meta = Meta.error;
      });

      return false;
    } finally {
      runInAction(() => {
        this._registerAbortController = null;
      });
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    this.meta = Meta.initial;
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  async clear() {
    this.user = null;
    this.meta = Meta.initial;
    this.error = '';
  }

  async me(): Promise<boolean> {
    if (!localStorage.getItem('authToken')) return false;

    if (this._meAbortController) {
      this._meAbortController.abort();
    }

    this._meAbortController = new AbortController();
    const signal = this._meAbortController.signal;

    this.meta = Meta.loading;

    try {
      const response: AuthResponse['user'] = await me(signal);

      runInAction(() => {
        this.user = new UserModel(response);
        this.meta = Meta.success;
      });
      return true;
    } catch (error) {
      if (isCancelError(error)) return false;

      runInAction(() => {
        this.error = errorMessage(error);
        this.meta = Meta.error;
      });
      this.logout();
      if (isCancelError(error)) return false;
      return false;
    } finally {
      runInAction(() => {
        this._meAbortController = null;
      });
    }
  }

  async update(id: string, data: FormData): Promise<LoadResponse> {
    if (this._updateAbortController) {
      this._updateAbortController.abort();
    }

    this._updateAbortController = new AbortController();
    const signal = this._updateAbortController.signal;

    this.meta = Meta.loading;

    try {
      await updateUser(id, data, signal);

      runInAction(() => {
        this.meta = Meta.success;
      });

      return { success: true };
    } catch (error) {
      if (isCancelError(error)) return { success: false };

      runInAction(() => {
        this.error = errorMessage(error);
        this.meta = Meta.error;
      });
      this.logout();
      if (isCancelError(error)) return { success: false };
      return { success: false };
    } finally {
      runInAction(() => {
        this._updateAbortController = null;
      });
    }
  }

  async getYandex(): Promise<boolean> {
    if (this._getYandexAbortController) {
      this._getYandexAbortController.abort();
    }
    this._getYandexAbortController = new AbortController();
    const signal = this._getYandexAbortController.signal;

    this.meta = Meta.loading;
    this.error = '';

    try {
      const updatedUser = await yandex(this.token!, signal);
      runInAction(() => {
        this.user = new UserModel(updatedUser);
        this.meta = Meta.success;
      });

      return true;
    } catch (error) {
      if (isCancelError(error)) {
        return false;
      }
      runInAction(() => {
        this.error = errorMessage(error);
        this.meta = Meta.error;
      });
      return false;
    } finally {
      runInAction(() => {
        this._getYandexAbortController = null;
      });
    }
  }
}
