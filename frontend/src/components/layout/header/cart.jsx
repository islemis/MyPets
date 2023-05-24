import { Badge, Link, Typography } from '@mui/material';
import { useContext } from 'react';
import { Store } from '../../../Store';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

const Cart = () => {
  const {
    state: {
      cart: { cartItems },
    },
  } = useContext(Store);

  return (
    <Link
      href="/cart"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        textDecoration: 'none',
      }}
    >
      <Badge badgeContent={cartItems.length} color="primary">
        <LocalMallOutlinedIcon color="primary" />
      </Badge>
      <Typography color="primary" ml={1}>
        Cart
      </Typography>
    </Link>
  );
};

export default Cart;
