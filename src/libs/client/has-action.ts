import logger from '@/libs/logger';

export default function hasAction(params: { actions?: string[], name: string; }): boolean {
  try {
    if (!params?.actions || !params?.name) {
      return false;
    }
    return params.actions?.includes(params.name);
  } catch (e) {
    logger({
      title: 'Invalid actions',
      detail: (e as any).message,
      type: 'web',
    });
    return false;
  }
}
