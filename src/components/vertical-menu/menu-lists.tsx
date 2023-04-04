import { Fragment } from 'react';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ThemeSelector from '@/components/vertical-menu/theme-selector';
import LangSelector from '@/components/vertical-menu/lang-selector';
import config from '@/components/vertical-menu/config';
import { t } from 'i18next';

function MenuLists({ currentPath, onClose }: { currentPath: string; onClose: () => void }) {
  return (
    <div>
      <Toolbar />
      <Divider />

      {config.map((section, sectionIndex) => (
        <Fragment key={`section-${sectionIndex}`}>
          <List data-section={sectionIndex}>
            {section.map(({ href, text, Icon }, rowIndex) => (
              <ListItem key={`row-${rowIndex}`} disablePadding>
                <ListItemButton
                  shallow
                  component={Link}
                  href={href}
                  selected={href === currentPath}
                  onClick={onClose}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={t(text)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Fragment>
      ))}

      <ThemeSelector />
      <LangSelector />
    </div>
  );
}

export default MenuLists;
