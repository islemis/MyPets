import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../libs/axios';
import { Box, Container, Grid, Typography } from '@mui/material';
import Product from '../components/Product';

const ProductCategoryScreen = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const {
        data: { products },
      } = await http.get('/products/search', {
        params: {
          category: slug,
        },
      });

      setProducts(products);
    };

    fetchProducts();
  }, [slug]);

  return (
    <Container>
      <Box my={3}>
        <Typography variant="h2" textAlign="center" mb={2}>
          {slug}
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product._id} item lg={3}>
              <Product product={product}></Product>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductCategoryScreen;
