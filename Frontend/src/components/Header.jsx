import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth scroll only if you're on the homepage
  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      // Delay the scroll to wait for homepage to render
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // adjust delay if needed
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#777', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and title */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton edge="start" color="inherit">
            <Avatar src="sgslogo.jpg" alt="Logo" sx={{ bgcolor: '#fff', width: 60, height: 60 }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
            SHREE GURUDATTA SADAN
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={4}>
          <Button onClick={() => scrollTo('home')} sx={{ color: '#000', fontWeight: 'bold', fontSize: "15px" }}>
            Home
          </Button>
          <Button onClick={() => scrollTo('about')} sx={{ color: '#000', fontWeight: 'bold', fontSize: "15px" }}>
            About
          </Button>
          <Button onClick={() => navigate("/payment")} sx={{ color: '#000', fontWeight: 'bold', fontSize: "15px" }}>
            Payment
          </Button>
          <Button onClick={() => scrollTo('contact')} sx={{ color: '#000', fontWeight: 'bold', fontSize: "15px" }}>
            Contact Us
          </Button>
        </Box>

        <Link to="/auth">
        <Button className="signin-button"
          variant="contained"
          sx={{
            backgroundColor: '#000',
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            '&:hover': {
              backgroundColor: '#222',
            },
          }}
        >
          Sign In
        </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
