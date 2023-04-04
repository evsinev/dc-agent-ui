import { useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { CssBaseline, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Header from '@/components/header';
import { styled } from '@mui/system';
import { LayoutMeta } from '@/components/layout/meta-interface';
import MenuLists from './menu-lists';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)`
  background: ${(p) => p.theme.palette.background.paper};
`;

interface Props {
  children: any;
  meta: LayoutMeta;
}

export default function VerticalMenu(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setMobileOpen(!mobileOpen)}
        edge="start"
        sx={{ marginLeft: '8px', zIndex: theme.zIndex.mobileStepper }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(!mobileOpen)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <MenuLists currentPath={router.pathname} onClose={() => setMobileOpen(false)} />
          </Drawer>
          <StyledDrawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <MenuLists currentPath={router.pathname} onClose={() => setMobileOpen(false)} />
          </StyledDrawer>
        </Box>

        <Box
          component="main"
          sx={{
            position: 'relative',
            flexGrow: 1,
            width: [`calc(100% - ${drawerWidth}px)`, '100%'],
            top: '-64px',
            pt: 3,
            pb: 3,
          }}
        >
          <CssBaseline />
          <Header meta={props.meta} />
          <Divider />
          <Box sx={{ p: 3 }}>
            {props.children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
