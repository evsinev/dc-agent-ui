import { LayoutMeta } from '@/components/layout/meta-interface';

export default function Home() {
  return (
    <div>
      Home Page
    </div>
  );
}

Home.meta = {
  title: 'home.title',
  breadcrumbs: [
    { name: 'home.title' },
  ],
} as LayoutMeta;
