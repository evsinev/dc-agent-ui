import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

export default function Document(props: DocumentProps) {
  // eslint-disable-next-line no-underscore-dangle
  const lang = props?.__NEXT_DATA__?.props?.lang;

  return (
    <Html lang={lang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
