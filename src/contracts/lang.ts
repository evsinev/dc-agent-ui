import { getCookie } from 'cookies-next';
import { AppContext } from 'next/app';
import useMutation from '@/hooks/useMutation';
import { Lang, langCookieName } from '@/locales/lang';

export const getLang = (context: AppContext): Lang => {
  const { req, res } = context.ctx;
  return (getCookie(langCookieName, { req, res }) as Lang) || Lang.en;
};

export default function useSetLang() {
  return useMutation<{ lang: Lang }, boolean>({ url: '/set-lang' });
}
