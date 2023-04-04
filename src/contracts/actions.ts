import { GetServerSidePropsContext } from 'next';
import { AxiosError } from 'axios';
import LRUCache from 'lru-cache';
import { v4 } from 'uuid';
import createError from '@/components/error/create-error';
import Error from '@/components/error/interface';
import { serverPost, PostResponse } from '@/libs/server/server-post';

import logger from '@/libs/logger';
import { getToken } from 'next-auth/jwt';
import { getGitlabBaseUrl } from '@/libs/server/get-env';

const cache = new LRUCache({
  max: 100,
});

export interface GetServerActionsParams {
  ctx: GetServerSidePropsContext;
  actionsList?: string[];
}

const getDataFromServer = async (ctx: GetServerSidePropsContext, token: string): Promise<PostResponse<string[]>> => {
  try {
    const response = await serverPost({
      req: ctx.req,
      baseUrl: getGitlabBaseUrl(),
      url: '/api/actions',
    });

    const actions: string[] = (response?.data as any)?.actions;
    if (actions) {
      cache.set(token, actions);
    }

    return { data: actions || [] };
  } catch (error) {
    return { error: createError(error as AxiosError<Error>), data: null };
  }
};

const getFromCache = (token: string): string[] => {
  const actions = cache.get(token);
  return actions as string[];
};

const filterData = (allActions?: string[] | null, actionsList?: string[]): string[] => {
  if (!allActions) {
    return [];
  }
  if (!actionsList) {
    return allActions;
  }

  return actionsList?.filter((action) => allActions.includes(action));
};

export default async function getServerActions({ actionsList, ctx }: GetServerActionsParams): Promise<string[]> {
  const { req } = ctx;
  const tokens = await getToken({ req });
  const token = tokens?.accessToken as string;

  if (token) {
    const actionsFromCache = getFromCache(token);
    if (actionsFromCache) {
      return filterData(actionsFromCache, actionsList);
    }

    const allActions = await getDataFromServer(ctx, token);
    return filterData(allActions.data, actionsList);
  }

  logger({
    errorId: v4(),
    title: 'Unauthorized request',
    type: 'Unauthorized',
    status: 401,
    detail: `Unauthorized request to ${req.url}`,
  });

  return [];
}
