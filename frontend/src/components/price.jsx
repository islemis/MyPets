import { Typography } from '@mui/material';

const Price = ({ value, currency = 'USD', ...typoProps }) => {
  const price = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency,
  }).format(value);

  return (
    <Typography fontWeight={500} color="primary" {...typoProps}>
      {price}
    </Typography>
  );
};

export default Price;
