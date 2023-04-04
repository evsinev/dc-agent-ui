import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext } from 'react';
import { ThemeContext } from '@/theme/theme-context';
import ThemeEnum from '@/theme/theme-enum';
import { t } from 'i18next';
import useSetTheme from '@/contracts/theme';

export default function ThemeSelector() {
  const { themeName, setThemeName } = useContext(ThemeContext);
  const { mutate, loading } = useSetTheme();

  const changeTheme = async () => {
    const newTheme = themeName === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light;
    const { data } = await mutate({ themeName: newTheme });
    if (data) {
      setThemeName(newTheme);
    }
  };

  return (
    <List data-section="theme">
      <ListItem disablePadding>
        <ListItemButton
          component="a"
          onClick={changeTheme}
          disabled={loading}
        >
          <ListItemIcon>
            {themeName === ThemeEnum.light ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText primary={themeName === ThemeEnum.light
            ? t`verticalMenu.themeSelector.light`
            : t`verticalMenu.themeSelector.dark`}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
