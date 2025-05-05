import { PaginationT } from "@entities/pagination/types";

export type ApiResponse<T> = {
  data: T;
  meta?: {
    pagination: PaginationT;
  };
};
