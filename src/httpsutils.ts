import type { AxiosResponse } from 'axios';
import type * as DevToolsAiAPIResponse from './types';

// This forces us to include an error message
// if the API does not provide one already
export function createHttpRequest<
  T extends DevToolsAiAPIResponse.baseAPIResponse & { message: string },
>(callback: () => Promise<AxiosResponse<T>>, error?: string): Promise<T>;
export function createHttpRequest<
  T extends DevToolsAiAPIResponse.baseAPIResponse,
>(callback: () => Promise<AxiosResponse<T>>, error: string): Promise<T>;

export function createHttpRequest<
  T extends DevToolsAiAPIResponse.baseAPIResponse,
>(
  callback: () => Promise<AxiosResponse<T>>,
  errorMessage?: string,
): Promise<T> {
  return new Promise((resolve, reject) => {
    callback()
      .then((resp) => {
        const { success } = resp.data;
        if (!success) {
          reject(resp.data?.message ? resp.data?.message : errorMessage);
        }
        resolve(resp.data as T);
      })
      .catch((error) => {
        reject(error.toJSON());
      });
  });
}
