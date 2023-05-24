import { useEffect, useState } from 'react';
import http from '../../../libs/axios';
import { Box, Container, Link, Stack } from '@mui/material';

const Nav = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    http.get('/products/categories').then(({ data }) => {
      setItems(data);
    });
  }, []);

  return (
    <Box
      component="nav"
      color="#fff"
      sx={(theme) => ({
        bgcolor: theme.palette.primary.main,
        py: 2,
      })}
    >
      <Container>
        <Stack
          direction="row"
          spacing={2}
          component="ul"
          sx={{ listStyle: 'none', m: 0 }}
        >
          {items.map((item) => (
            <Box key={item} component="li">
              <Link
                sx={{
                  textDecoration: 'none',
                  color: '#fff',
                }}
                href={`/category/${item}`}
              >
                {item}
              </Link>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Nav;
