import axios, { AxiosError, AxiosResponse, CancelToken } from 'axios';
import { IncomingMessage } from 'http';
import createError from '@/components/error/create-error';
import Error from '@/components/error/interface';
import { getApiBaseUrl } from '@/libs/server/get-env';
import { getToken } from 'next-auth/jwt';

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

interface PostProps {
  req: IncomingMessage & { cookies: Partial<{ [p: string]: string }> };
  url: string;
  baseUrl?: string;
  params?: any;
  options?: Options;
}

export async function serverPost<T>(props: PostProps): Promise<PostResponse<T>> {
  const { url, params } = props;
  const baseUrl = props.baseUrl || getApiBaseUrl();

  const tokens = await getToken({ req: props.req });
  const token = tokens?.accessToken as string;

  const options: Options = {
    ...(props.options || {}),
    headers: {
      ...(props.options?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .post<T>(baseUrl + url, params, options)
    .then((response: AxiosResponse<T>) => createResponse<T>(response))
    .catch((error: AxiosError<Error>) => {
      if (error.response?.data?.type === 'ERR_CANCELED' || error.code === 'ERR_CANCELED') {
        return { error: null };
      }
      return { error: createError(error), data: null };
    });
}
