import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import ThemeEnum from '@/theme/theme-enum';
import Error from '@/components/error/interface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean | Error>,
) {
  const themeName = req.body.themeName as string;
  const isThemeValid = themeName && Object.keys(ThemeEnum).includes(themeName);

  if (isThemeValid) {
    setCookie('theme', themeName, {
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
