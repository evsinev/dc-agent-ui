import { OverridableComponent } from '@mui/types';
import { SvgIconTypeMap } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface Row {
  Icon: OverridableComponent<SvgIconTypeMap>;
  text: string;
  href: string;
}

type Config = Row[][];

const config: Config = [
  [
    {
      Icon: DashboardIcon,
      text: 'home.title',
      href: '/',
    },
  ],
];

export default config;
