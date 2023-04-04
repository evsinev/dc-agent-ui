import axios, { AxiosError, AxiosResponse, CancelToken } from 'axios';
import createError from '@/components/error/create-error';
import Error from '@/components/error/interface';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export interface PostResponse<T> {
  data?: T | null;
  status?: number;
  error?: Error | null;
}

function createResponse<T>(response: AxiosResponse): { data: T, status: number, error: null } {
  return {
    data: response?.data,
    status: response?.status,
    error: null,
  };
}

interface Options {
  headers?: Record<string, string>;
  cancelToken?: CancelToken;
}

export function clientPost<T>(url: string, params: any = {}, options: Options = {}): Promise<PostResponse<T>> {
  const reqUrl = `${publicRuntimeConfig.basePath}/api${url}`;

  return axios
    .post<T>(reqUrl, params, options)
    .then((response: AxiosResponse<T>) => createResponse<T>(response))
    .catch((error: AxiosError<Error>) => {
      if (error.response?.data?.type === 'ERR_CANCELED' || error.code === 'ERR_CANCELED') {
        return { error: null };
      }
      if (error.response?.data?.status === 401 || error.status === 401) {
        window.location.href = `${publicRuntimeConfig.basePath}/api/auth/signin?callbackUrl=${window.location.pathname}`;
        return { error: null, data: null };
      }
      return { error: createError(error), data: null };
    });
}
