import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { gradientText, cardHoverEffect } from '../styles/theme';
import Navbar from '../components/Navbar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('Network error occurred');
      console.error('Signup failed:', error);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      pt: 8
    }}>
      <Navbar />
      <Container maxWidth="sm" sx={{ pt: 8 }}>
        <Paper sx={{
          p: 4,
          borderRadius: '24px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          ...cardHoverEffect
        }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <PersonAddIcon sx={{ 
              fontSize: 48, 
              color: 'primary.main',
              p: 1,
              borderRadius: '50%',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              mb: 2
            }} />
            <Typography variant="h4" sx={{ ...gradientText, fontWeight: 'bold' }}>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Join us to start predicting air quality
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #00BFA5 90%)',
                color: 'white',
                mb: 2
              }}
            >
              Sign Up
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link to="/login" style={{ 
                  color: '#2196F3',
                  textDecoration: 'none',
                  fontWeight: 500
                }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;