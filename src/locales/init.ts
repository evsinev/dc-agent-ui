import i18next from 'i18next';
import logger from '@/libs/logger';
import { v4 } from 'uuid';
import { Lang } from './lang';
import en from './translations/en';
import ru from './translations/ru';

const missingKeyHandler = (languages: readonly string[], ns: string, key: string) => {
  logger({
    errorId: v4(),
    title: 'Translation not found',
    type: 'Translation error',
    detail: `Translation in ${languages.join(', ')}, key: ${key}`,
  });
};

export default function init(lang: Lang) {
  return i18next
    .init({
      resources: {
        en: { translation: en },
        ru: { translation: ru },
      },
      lng: lang,
      fallbackLng: lang,
      saveMissing: true,
      missingKeyHandler,
      react: {
        bindI18n: 'loaded languageChanged',
        bindI18nStore: 'added',
        useSuspense: true,
      },
      interpolation: {
        escapeValue: false,
      },
    });
}
