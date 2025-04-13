import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        pt: 8 // Add padding top for fixed navbar
      }}>
        <Container maxWidth="lg" sx={{ pt: 8 }}>
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Predict Air Quality with AI
              </Typography>
              <Typography variant="h5" sx={{ color: '#666', mb: 4 }}>
                Get accurate AQI predictions powered by machine learning. Make informed decisions about your outdoor activities.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/signup"
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    px: 4,
                    py: 2
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/about"
                  size="large"
                  sx={{ px: 4, py: 2 }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <BarChartIcon sx={{ fontSize: 300, color: 'rgba(33, 150, 243, 0.3)' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ py: 12 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 8,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Features
          </Typography>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch'
          }}>
            <Grid container spacing={4} maxWidth="lg" justifyContent="center">
              <Grid item xs={12} md={4}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 50px rgba(0,0,0,0.16)'
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <AirIcon sx={{ fontSize: 60, color: '#2196F3', mb: 2 }} />
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      AQI Prediction
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Advanced ML models provide accurate Air Quality Index predictions to help you plan your activities.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 5
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <CloudIcon sx={{ fontSize: 60, color: '#2196F3', mb: 2 }} />
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      Weather Forecast
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Real-time weather data and forecasting to keep you informed about environmental conditions.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 5
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <TimelineIcon sx={{ fontSize: 60, color: '#2196F3', mb: 2 }} />
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      Historical Analysis
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Track and analyze historical air quality data to identify patterns and trends.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;