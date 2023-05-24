import {
  Box,
  TextField,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useTransition } from 'react';
import http from '../../../libs/axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [pending, setTransition] = useTransition();

  const [result, setResult] = useState([]);

  const navigate = useNavigate();

  const handleClick = (e, product) => {
    if (product) {
      navigate(`/product/${product.slug}`);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;

    if (query.length < 3) return;

    setTransition(async () => {
      const {
        data: { products },
      } = await http.get('/products/search', {
        params: { query },
      });

      setResult(
        products.map(({ name, slug }) => ({
          label: name,
          slug,
        }))
      );
    });
  };
  return (
    <Box minWidth={400}>
      <Autocomplete
        disablePortal
        loading={pending}
        id="combo-box-demo"
        options={result}
        sx={{ width: 300 }}
        onChange={handleClick}
        renderInput={(params) => (
          <TextField
            fullWidth
            variant="outlined"
            onChange={handleChange}
            noOptionsText="No product found"
            
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
           { ...params}
            
          />
        )}
      />
    </Box>
  );
};

export default SearchInput;
