import { Link as RouterLink } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { forwardRef } from 'react';

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
      fontSize: 40,
    },
    h3: {
      fontWeight: 600,
      fontSize: 30,
    },
    h4: {
      fontWeight: 600,
    },

    caption: {
      fontWeight: 400,
    },

    allVariants: {
      fontFamily: 'Poppins',
      fontWeight: 300,
      color: '#000',
    },
  },
  palette: {
    primary: {
      main: '#1bbc9b',
    },
    secondary: {
      main: '#000',
    },
    common: {
      black: '#222',
      white: '#fff',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: '#fff',
        },
        root: {
          fontFamily: 'poppins',
          fontWeight: 500,
          textTransform: 'none',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default theme;
