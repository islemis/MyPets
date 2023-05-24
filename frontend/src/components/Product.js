import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import http from '../libs/axios';
import { Box, Button, Link, Typography } from '@mui/material';
import Price from './price';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import Image from './image';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await http.get(`/products/${item._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });

    toast.success('Product added successfully');
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <Image
          sx={{ maxHeight: 180, objectFit: 'contain' }}
          src={product.image}
          className="card-img-top"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`} sx={{ textDecoration: 'none' }}>
          <Card.Title>
            <Typography fontSize={22} fontWeight={600}>
              {product.name}
            </Typography>
          </Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <Price mt={1} fontSize={20} value={product.price} />
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="contained" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
