import ThemeEnum from '@/theme/theme-enum';
import useMutation from '@/hooks/useMutation';

interface SetThemeParams {
  themeName: ThemeEnum;
}

type SetThemeResponse = boolean;

export default function useSetTheme() {
  return useMutation<SetThemeParams, SetThemeResponse>({ url: '/set-theme' });
}
