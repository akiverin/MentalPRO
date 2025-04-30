import { makeAutoObservable } from 'mobx';
import { PaginationT } from '../types';

const DEFAULT_PAGE_SIZE = 8;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_COUNT = 1;
const DEFAULT_TOTAL = 0;

export class PaginationStore {
  page: number = DEFAULT_PAGE;
  pageSize: number = DEFAULT_PAGE_SIZE;
  pageCount: number = DEFAULT_PAGE_COUNT;
  total: number = DEFAULT_TOTAL;

  constructor() {
    makeAutoObservable(this);
  }
  setPagination({ page, pageSize, pageCount, total }: PaginationT) {
    this.page = page;
    this.pageSize = pageSize;
    this.pageCount = pageCount;
    this.total = total;
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.pageCount) {
      this.page = page;
    }
  }

  nextPage() {
    if (this.page < this.pageCount) {
      this.page += 1;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page -= 1;
    }
  }

  reset() {
    this.page = DEFAULT_PAGE;
    this.pageSize = DEFAULT_PAGE_SIZE;
    this.pageCount = DEFAULT_PAGE_COUNT;
    this.total = DEFAULT_TOTAL;
  }
}
