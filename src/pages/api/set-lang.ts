import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import Error from '@/components/error/interface';
import { langCookieName, Lang } from '@/locales/lang';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean | Error>,
) {
  const lang = req.body.lang as string;
  const isLangValid = lang && Object.keys(Lang).includes(lang);

  if (isLangValid) {
    setCookie(langCookieName, lang, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 365,
      req,
      res,
    });
    res.status(200).json(true);
  } else {
    res.status(200).json(false);
  }
}
