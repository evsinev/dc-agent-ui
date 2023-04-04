import NextApp, { AppContext, AppProps } from 'next/app';
import { NextComponentType } from 'next';
import { getCookie } from 'cookies-next';
import NextProgress from 'next-progress';
import { ThemeProvider } from '@/theme/theme-context';
import ThemeEnum from '@/theme/theme-enum';

import { LocaleProvider } from '@/locales/locale-context';
import { Lang } from '@/locales/lang';
import { getLang } from '@/contracts/lang';

import Layout from '@/components/layout';
import { LayoutMeta } from '@/components/layout/meta-interface';
import { ErrorProvider } from '@/components/error/error-context';

type ExtendedAppProps = AppProps & {
  theme: ThemeEnum;
  lang: Lang;
  Component: NextComponentType & {
    meta: LayoutMeta;
  };
};

export default function App(props: ExtendedAppProps) {
  const { Component, pageProps: { session, ...pageProps } } = props;

  return (
    <ThemeProvider themeName={props.theme}>
      <NextProgress delay={300} options={{ showSpinner: false }} />
      <LocaleProvider lang={props.lang}>
        <ErrorProvider errors={pageProps?.error ? [pageProps.error] : undefined}>
          <Layout meta={Component.meta}>
            <Component {...pageProps} />
          </Layout>
        </ErrorProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const { req, res } = context.ctx;
  const appProps = await NextApp.getInitialProps(context);
  const theme = getCookie('theme', { req, res }) || ThemeEnum.light;
  const lang = getLang(context);

  return {
    ...appProps,
    theme,
    lang,
  };
};
