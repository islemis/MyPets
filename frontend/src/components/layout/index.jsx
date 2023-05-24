import { Box, CssBaseline, ThemeProvider, Container } from '@mui/material';
import Header from './header';
import { ToastContainer } from 'react-toastify';
import theme from '../../libs/mui/theme';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box>
      <Header />
      <Box component="main">
        <Container>{children}</Container>
      </Box>

      <ToastContainer autoClose={2000} position="bottom-center" limit={1} />
    </Box>
  </ThemeProvider>
);

export default Layout;
