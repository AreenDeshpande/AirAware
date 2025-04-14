import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AirIcon from '@mui/icons-material/Air';
import { gradientText } from '../styles/theme';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ 
      background: 'rgba(10, 25, 41, 0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(66, 165, 245, 0.1)'
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <AirIcon sx={{ fontSize: 40, color: '#42A5F5', mr: 2 }} />
          <Typography variant="h5" sx={{ ...gradientText, fontWeight: 'bold' }}>
          AirAware
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            component={Link} 
            to="/" 
            sx={{ 
              color: '#B2BAC2',
              '&:hover': { 
                color: '#FFFFFF',
                backgroundColor: 'rgba(66, 165, 245, 0.08)'
              }
            }}
          >
            Home
          </Button>
          <Button 
            component={Link} 
            to="/about" 
            sx={{ 
              color: '#B2BAC2',
              '&:hover': { 
                color: '#FFFFFF',
                backgroundColor: 'rgba(66, 165, 245, 0.08)'
              }
            }}
          >
            About
          </Button>
          <Button 
            component={Link} 
            to="/login" 
            variant="outlined" 
            sx={{ 
              borderColor: '#42A5F5',
              color: '#42A5F5',
              '&:hover': {
                borderColor: '#90CAF9',
                color: '#90CAF9',
                backgroundColor: 'rgba(66, 165, 245, 0.08)'
              }
            }}
          >
            Login
          </Button>
          <Button 
            component={Link} 
            to="/signup" 
            variant="contained" 
            sx={{ 
              background: 'linear-gradient(45deg, #42A5F5 30%, #69F0AE 90%)',
              color: '#0A1929',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(45deg, #90CAF9 30%, #B2FF59 90%)',
              }
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;