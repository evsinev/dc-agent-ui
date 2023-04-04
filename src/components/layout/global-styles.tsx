import { css, GlobalStyles as Global } from '@mui/material';

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        html {
          height: 100%;
        }

        body {
          display: block;
          position: relative;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          height: 100%;
          -webkit-font-smoothing: antialiased;
        }

        #__next {
          box-sizing: border-box;
          min-height: 100%;
          height: 1px;
        }
      `}
    />
  );
}
