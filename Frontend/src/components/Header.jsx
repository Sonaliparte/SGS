import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from '../auth/Authcontext';
import { auth } from '../auth/firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/auth'); // Redirect to the sign-in page after signing out
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle sign-out error (e.g., display an error message)
    }
  };

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem button onClick={() => scrollTo('home')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => scrollTo('about')}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => scrollTo('contact')}>
          <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem button onClick={() => navigate('/payment')}>
          <ListItemText primary="Payment" />
        </ListItem>
        <Divider />
        {user ? (
          <ListItem button onClick={handleSignOut}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/auth">
            <ListItemText primary="Sign In" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
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

          {isMobile ? (
            <>
              {user && (
                <IconButton color="inherit" sx={{ mr: 2 }}>
                  <Avatar src={user.photoURL} alt={user.displayName} />
                </IconButton>
              )}
              <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: '#000' }} />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
              </Drawer>
            </>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              {user && (
                <IconButton color="inherit" sx={{ mr: 2 }}>
                  <Avatar src={user.photoURL} alt={user.displayName} />
                </IconButton>
              )}
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

              {user ? (
                <Button
                  variant="contained"
                  onClick={handleSignOut}
                  sx={{
                    backgroundColor: '#222', 
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#c82333',
                    },
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#222',
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
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;