import { makeAutoObservable, runInAction } from "mobx";
import { Meta } from "@utils/meta";
import { PracticeModel } from "../model";
import { getPractices } from "../api";
import { Practice } from "../types";
import { PaginationStore } from "@entities/pagination/stores/PaginationStore";
import { LoadResponse } from "@/types/loadResponse";
import { errorMessage, isCancelError } from "@utils/errors";
export class PracticeListStore {
  practices: PracticeModel[] = [];
  meta: Meta = Meta.initial;
  error = "";
  pagination = new PaginationStore();
  searchQuery = "";

  private _abortController: AbortController | null = null;

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
      const response = await getPractices(
        page,
        this.pagination.pageSize,
        this.searchQuery,
        signal,
      );
      runInAction(() => {
        this.practices = response.data.map(
          (c: Practice) => new PracticeModel(c),
        );
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
}
