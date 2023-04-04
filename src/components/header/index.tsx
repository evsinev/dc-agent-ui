import NextLink from 'next/link';
import { Breadcrumbs, Link, Typography, Hidden, useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { LayoutMeta } from '@/components/layout/meta-interface';
import { t } from 'i18next';
import HomeIcon from '@mui/icons-material/Home';

interface HeaderProps {
  meta: LayoutMeta;
}

export default function Header(props: HeaderProps) {
  const theme = useTheme();

  return (
    <Toolbar sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      pl: [7, 3, 3],
      minHeight: '48px',
      background: theme.palette.background.paper,
    }}
    >
      <Hidden smDown>
        <Typography component="h1" variant="subtitle1">
          {t(props.meta?.title)}
        </Typography>
      </Hidden>

      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component={NextLink}
          underline="hover"
          color="inherit"
          href="/"
          sx={{ display: 'flex', alignItems: 'center', fontSize: 12 }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {t`header.breadcrumbs.main`}
        </Link>

        {props.meta?.breadcrumbs?.map((crumb) => (
          <Typography
            key={crumb.name}
            color="text.primary"
            sx={{ fontSize: 12 }}
          >
            {t(crumb.name)}
          </Typography>
        ))}
      </Breadcrumbs>
    </Toolbar>
  );
}
