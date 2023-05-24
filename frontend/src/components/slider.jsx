import { Box } from '@mui/material';
import { register } from 'swiper/element/bundle';

register();

const Slider = () => {
  return (
    <>
      <swiper-container>
        <swiper-slide>
          <Box
            sx={{
              maxWidth: '100%',
              display: 'block',
            }}
            component="img"
            src="/images/slider1.png"
            alt=""
          />
        </swiper-slide>
      </swiper-container>
    </>
  );
};

export default Slider;
