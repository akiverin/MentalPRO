import { makeAutoObservable, runInAction } from "mobx";
import { login, register, me } from "../api";
import { AuthResponse } from "../types";
import { Meta } from "@utils/meta";
import { UserModel } from "../model";
import { errorMessage, isCancelError } from "@utils/errors";

const AUTH_TOKEN_KEY = "authToken";

export class UserStore {
  user: UserModel | null = null;
  token: string | null = null;
  meta: Meta = Meta.initial;
  error: string = "";

  private _loginAbortController: AbortController | null = null;
  private _meAbortController: AbortController | null = null;
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

  async register(
    firstName: string,
    email: string,
    password: string,
    lastName?: string,
  ): Promise<boolean> {
    if (this._registerAbortController) {
      this._registerAbortController.abort();
    }

    this._registerAbortController = new AbortController();
    const signal = this._registerAbortController.signal;

    this.meta = Meta.loading;

    try {
      const response: AuthResponse = await register(
        { firstName, lastName, email, password },
        signal,
      );

      runInAction(() => {
        this.token = response.token;
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

  async me(): Promise<boolean> {
    if (this._meAbortController) {
      this._meAbortController.abort();
    }

    this._meAbortController = new AbortController();
    const signal = this._meAbortController.signal;

    this.meta = Meta.loading;

    try {
      const response: AuthResponse["user"] = await me(signal);

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
      return false;
    } finally {
      runInAction(() => {
        this._meAbortController = null;
      });
    }
  }
}
