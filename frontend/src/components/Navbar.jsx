import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AirIcon from '@mui/icons-material/Air';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ 
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <AirIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
          <Typography variant="h5" sx={{ 
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            AQI Predictor
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" sx={{ 
            color: '#1976d2',
            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' }
          }}>
            Home
          </Button>
          <Button component={Link} to="/about" sx={{ 
            color: '#1976d2',
            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' }
          }}>
            About
          </Button>
          <Button 
            component={Link} 
            to="/login" 
            variant="outlined" 
            sx={{ 
              borderRadius: '20px',
              px: 3
            }}
          >
            Login
          </Button>
          <Button 
            component={Link} 
            to="/signup" 
            variant="contained" 
            sx={{ 
              borderRadius: '20px',
              px: 3,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
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