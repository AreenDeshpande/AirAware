import React from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AirIcon from '@mui/icons-material/Air';
import TimelineIcon from '@mui/icons-material/Timeline';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import HistoryIcon from '@mui/icons-material/History';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Predict AQI',
      description: 'Get accurate air quality predictions',
      icon: <AirIcon sx={{ fontSize: 40, color: '#42A5F5' }} />,
      path: '/predict'
    },
    {
      title: 'Weather Info',
      description: 'Check current weather conditions',
      icon: <WbSunnyIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
      path: '/weather'
    },
    {
      title: 'View History',
      description: 'Access historical AQI data',
      icon: <HistoryIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      path: '/history'
    },
    {
      title: 'Analytics',
      description: 'Analyze air quality trends',
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#9C27B0' }} />,
      path: '/analytics'
    }
  ];

  return (
    <Box>
      <Navbar />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A1929 0%, #132F4C 100%)',
        pt: 12,
        pb: 8
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ color: '#FFFFFF', mb: 4 }}>
            Dashboard
          </Typography>
          <Grid container spacing={4}>
            {menuItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    cursor: 'pointer',
                    background: 'rgba(19, 47, 76, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(66, 165, 245, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4)'
                    }
                  }}
                  onClick={() => navigate(item.path)}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'rgba(66, 165, 245, 0.1)',
                      mb: 2
                    }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h5" sx={{ color: '#FFFFFF', textAlign: 'center', mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#B2BAC2', textAlign: 'center' }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;