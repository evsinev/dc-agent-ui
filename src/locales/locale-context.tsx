import { createContext, ReactElement, useContext, useMemo, useState } from 'react';
import i18next from 'i18next';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import useSetLang from '@/contracts/lang';
import init from '@/locales/init';
import { Lang } from './lang';

export interface LocaleContextData {
  lang: Lang;
  setLang: (params: Lang) => void;
}

const defaultValue: LocaleContextData = {
  lang: Lang.en,
  setLang: () => {},
};

const LocaleContext = createContext<LocaleContextData>(defaultValue);

interface LangProviderProps {
  lang: Lang;
  children: ReactElement | ReactElement[];
}

export function LocaleProvider(props: LangProviderProps) {
  const [lang, setLang] = useState<Lang>(props.lang);
  const { mutate } = useSetLang();

  init(lang);

  const value = useMemo(
    () => ({
      lang,
      setLang: (newLang: Lang) => {
        i18next.changeLanguage(newLang);
        setLang(newLang);
        mutate({ lang: newLang });
        document.documentElement.lang = newLang;
      },
    }),
    [lang, mutate],
  );

  return (
    <LocaleContext.Provider value={value} key={lang}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {props.children}
      </LocalizationProvider>
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  return useContext(LocaleContext);
}
