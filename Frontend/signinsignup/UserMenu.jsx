import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';

const UserMenu = ({ user, onSignOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ position: 'relative' }}>
      <Avatar
        onClick={handleMenuClick}
        sx={{ bgcolor: 'gray', cursor: 'pointer' }}
      >
        {user.name[0]}
      </Avatar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 250,
            bgcolor: '#1e1e1e',
            color: '#fff',
            mt: 1.5,
            borderRadius: 2,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography fontWeight="bold">{user.name}</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#333' }} />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: '#aaa' }} fontSize="small" />
          </ListItemIcon>
          My Account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FolderOpenIcon sx={{ color: '#aaa' }} fontSize="small" />
          </ListItemIcon>
          My Projects
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LocalLibraryIcon sx={{ color: '#aaa' }} fontSize="small" />
          </ListItemIcon>
          My Libraries
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: '#aaa' }} fontSize="small" />
          </ListItemIcon>
          My Orders
        </MenuItem>

        <Divider sx={{ borderColor: '#333' }} />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BusinessIcon sx={{ color: '#aaa' }} fontSize="small" />
          </ListItemIcon>
          Business Details
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <VerifiedUserIcon sx={{ color: '#aaa' }} fontSize="small" />
          </ListItemIcon>
          Licenses
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DescriptionIcon sx={{ color: '#aaa' }} fontSize="small" />
          </ListItemIcon>
          License Usage Details
        </MenuItem>

        <Divider sx={{ borderColor: '#333' }} />

        <MenuItem onClick={() => { handleClose(); onSignOut(); }}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: 'red' }} fontSize="small" />
          </ListItemIcon>
          <Typography color="error">Sign out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
