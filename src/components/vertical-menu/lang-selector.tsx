import { useLocaleContext } from '@/locales/locale-context';
import { Lang } from '@/locales/lang';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import LanguageIcon from '@mui/icons-material/Translate';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function LangSelector() {
  const { lang, setLang } = useLocaleContext();

  return (
    <List data-section="lang">
      <ListItem>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>

        <Select
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
          id="lang-selector"
          label="Language"
          size="small"
          sx={{
            width: '100%',
          }}
        >
          {Object.keys(Lang).map((langRow) => (
            <MenuItem key={langRow} value={langRow}>{langRow}</MenuItem>
          ))}
        </Select>
      </ListItem>
    </List>
  );
}
