export interface BaseResponse {
    isSuccess: boolean;
    message?: string[];
    errors?: string[];
  }