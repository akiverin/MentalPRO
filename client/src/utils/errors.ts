import axios from "axios";

export const formatApiError = (method: string, error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return `API Error in ${method}: ${
      error.response?.data?.message || error.message
    }`;
  }
  return `Unexpected error in ${method}: ${
    error instanceof Error ? error.message : "Unknown error"
  }`;
};

export const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error";

export const isCancelError = (error: unknown): boolean => {
  const err = error as { name?: string; code?: string };
  return err.name === "CanceledError" || err.code === "ERR_CANCELED";
};
