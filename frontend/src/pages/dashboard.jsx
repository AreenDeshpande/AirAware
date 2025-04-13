import React from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloudIcon from '@mui/icons-material/Cloud';
import TimelineIcon from '@mui/icons-material/Timeline';
import HistoryIcon from '@mui/icons-material/History';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pt: 4, pb: 4 }}>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Welcome to AQI Prediction Dashboard
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s' }
              }}
              onClick={() => navigate('/predict')}
            >
              <CloudIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Predict AQI
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Get accurate AQI predictions using our ML model
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s' }
              }}
              onClick={() => navigate('/weather')}
            >
              <TimelineIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Weather Forecast
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                View current weather and forecasting data
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s' }
              }}
              onClick={() => navigate('/history')}
            >
              <HistoryIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                History
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                View your previous predictions and analyses
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;