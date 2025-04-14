import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { gradientText } from '../styles/theme';
import Navbar from '../components/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <Box>
      <Navbar />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A1929 0%, #132F4C 100%)',
        pt: 12
      }}>
        <Container maxWidth="sm">
          <Paper sx={{
            p: 4,
            background: 'rgba(19, 47, 76, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid rgba(66, 165, 245, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <Typography variant="h4" sx={{ ...gradientText, mb: 4, textAlign: 'center' }}>
              Welcome Back
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFFFFF',
                    '& fieldset': {
                      borderColor: 'rgba(66, 165, 245, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(66, 165, 245, 0.5)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#B2BAC2',
                  }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFFFFF',
                    '& fieldset': {
                      borderColor: 'rgba(66, 165, 245, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(66, 165, 245, 0.5)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#B2BAC2',
                  }
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: 'linear-gradient(45deg, #42A5F5 30%, #69F0AE 90%)',
                  color: '#0A1929',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #90CAF9 30%, #B2FF59 90%)',
                  }
                }}
              >
                Login
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#B2BAC2' }}>
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ 
                    color: '#42A5F5',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}>
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;