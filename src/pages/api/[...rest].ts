import type { NextApiRequest, NextApiResponse } from 'next/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { serverPost } from '@/libs/server/server-post';
import Error from '@/components/error/interface';
import { v4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const url = req.url?.replace('/api', '') || '';
    const response = await serverPost({ req, url, params: req.body });

    if (response.error) {
      res.status(response.error?.status || 500).json(response.error);
      return;
    }

    res.json(response.data);
  } else {
    const error: Error = {
      errorId: v4(),
      title: 'Unauthorized request',
      type: 'Unauthorized',
      status: 401,
      detail: `Unauthorized request to ${req.url}`,
    };
    res.status(401).json(error);
  }
}
