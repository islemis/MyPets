import { Stack, Box, Container, Link } from '@mui/material';
import SearchInput from './search';
import Cart from './cart';
import Login from './login';
import Nav from './nav';

const Header = () => {
  return (
    <Box component="header" sx={{ py: 1 }}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Link href="/">
              <Box
                component="img"
                src="/images/logo.jpg"
                alt=""
                sx={{
                  maxWidth: '100%',
                  maxHeight: 80,
                }}
              />
            </Link>
          </Box>

          <SearchInput />

          <Stack direction="row" alignItems="center" spacing={2}>
            <Cart />
            <Login />
          </Stack>
        </Stack>
      </Container>
      <Nav />
    </Box>
  );
};

export default Header;
