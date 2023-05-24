import { Fragment, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../../Store';

export default function Login() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);

  const isAuthenticated = Boolean(userInfo);

  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<PersonOutlineOutlinedIcon fontSize="large" />}
      >
        {!isAuthenticated ? 'My account' : userInfo.name}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {!isAuthenticated && (
          <Fragment>
            {' '}
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/signin');
              }}
            >
              Sign in
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/signup');
              }}
            >
              Sign up
            </MenuItem>
          </Fragment>
        )}

        {isAuthenticated && userInfo.isAdmin && (
          <Fragment>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/admin/dashboard');
              }}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/admin/orders');
              }}
            >
              Orders
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/admin/users');
              }}
            >
              Users
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/admin/products');
              }}
            >
              Products
            </MenuItem>
          </Fragment>
        )}

        {isAuthenticated && !userInfo.isAdmin && (
          <Fragment>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/profile');
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/orderhistory');
              }}
            >
              Orders
            </MenuItem>
          </Fragment>
        )}

        {isAuthenticated && (
          <MenuItem
            onClick={() => {
              handleClose();
              dispatch({ type: 'USER_SIGNOUT' });
            }}
          >
            sign out
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
