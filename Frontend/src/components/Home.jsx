import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import webimg from './assets/webimg.webp';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#777", minHeight: "100vh", p: 4, color: "#fff" }}>
  
      {/* Animated Heading */}
      <div className="home-container">
      <h1 className="animated-heading">
        WELCOME TO SHREE GURUDATTA SADAN CO.HSG 
      </h1>
    </div>

      <Grid container spacing={4} alignItems="center" justifyContent="center" mt={8}>
        <Grid item xs={10} md={6}>
          <Typography variant="h5" fontSize={30} fontWeight="bold" gutterBottom>
            Built for Society with all the features and rewards you love,<br />
            plus much more.<br/>
            The simplest way to pay maintenance and at that same time <br/>
            download the Receipt!!
          </Typography>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box component="img"
            src={webimg}
            alt="invoice"
            sx={{ width: '100%', height: 'auto',  maxWidth: '500px',}}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
