import { ReactElement } from 'react';
import { Roboto_Flex } from 'next/font/google';
import VerticalMenu from '@/components/vertical-menu';
import MetaTags from './meta-tags';
import GlobalStyles from './global-styles';
import { LayoutMeta } from './meta-interface';

const font = Roboto_Flex({ subsets: ['latin'], fallback: ['Helvetica Neue'] });

interface LayoutProps {
  children: ReactElement | ReactElement[];
  meta: LayoutMeta;
}

export default function Layout(props: LayoutProps) {
  return (
    <main className={font.className}>
      <GlobalStyles />
      <MetaTags />
      <VerticalMenu meta={props.meta}>
        {props.children}
      </VerticalMenu>
    </main>
  );
}
