import { Box } from '@mui/material';

const Image = ({ fromApi = true, src, ...props }) => (
  <Box
    sx={{ maxWidth: '100%' }}
    component="img"
    src={`http://localhost:8000/static/${src}`}
    alt=""
    {...props}
  />
);

export default Image;
