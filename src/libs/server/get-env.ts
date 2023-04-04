import { info } from '@/libs/logger';
import createError from '@/components/error/create-error';

function env(aName: string): string {
  const value = process.env[aName];

  if (process.env.NODE_ENV === 'production') {
    info(`Getting ${aName} = ${value}`);
  }

  if (!value) {
    createError({
      title: 'No env value',
      type: 'env',
      status: 200,
      detail: `No value for env variable ${aName}`,
    });
  }
  return value as string;
}

export function getGitlabClientId(): string {
  return env('GITLAB_CLIENT_ID');
}

export function getGitlabClientSecret(): string {
  return env('GITLAB_CLIENT_SECRET');
}

export function getAuthSecret(): string {
  return env('NEXTAUTH_SECRET');
}

export function getAuthUrl(): string {
  return env('NEXTAUTH_URL');
}

export function getGitlabBaseUrl(): string {
  return env('GITLAB_BASE_URL');
}

export function getApiBaseUrl(): string {
  return env('API_BASE_URL');
}
