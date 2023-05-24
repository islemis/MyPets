import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import http from '../libs/axios';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

const NewProductScreen = () => {
  const formRef = useRef();

  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [value, setValue] = useState(null);

  const {
    state: { userInfo },
  } = useContext(Store);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(formRef.current);

    data.append('category', value.title);

    try {
      const { data: product } = await http.post('/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      console.log(product);

      toast.success('Product added successfully');

      navigate(`/product/${product.slug}`);
    } catch (e) {
      console.log(e);

      toast.error('An error occurred while adding the product');
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      const { data: categories } = await http.get('/products/categories');

      setCategories(categories.map((category) => ({ title: category })));
    };

    fetcher();
  }, []);

  console.log(value);

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Create new product</Typography>
      <Stack component="form" ref={formRef} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="upload-image">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <PhotoCamera />
                  <input
                    id="upload-image"
                    hidden
                    accept="image/*"
                    type="file"
                    name="image"
                    onChange={handleFileUpload}
                  />
                </IconButton>
              </label>
              {imageUrl && (
                <Box
                  component="img"
                  src={imageUrl}
                  alt="Uploaded Image"
                  height="300"
                  sx={{
                    maxWidth: 300,
                    display: 'block',
                  }}
                />
              )}
            </Stack>
          </Grid>

          <Grid item lg={6}>
            <TextField fullWidth name="name" label="Name" required />
          </Grid>
          <Grid item lg={6}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setValue({
                    title: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setValue({
                    title: newValue.inputValue,
                  });
                } else {
                  setValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.title
                );
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    title: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={categories}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.title;
              }}
              renderOption={(props, option) => (
                <li {...props}>{option.title}</li>
              )}
              freeSolo
              renderInput={(params) => (
                <TextField required fullWidth {...params} label="Category" />
              )}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              fullWidth
              name="price"
              label="Price"
              type="number"
              required
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              fullWidth
              name="countInStock"
              label="Stock"
              type="number"
              required
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              name="description"
              fullWidth
              label="Description"
              multiline
              rows={2}
              required
            />
          </Grid>
          <Grid item lg={12}>
            <Button type="submit" variant="contained" disabled={!imageUrl}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default NewProductScreen;
