import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { gradientText, cardHoverEffect } from '../styles/theme';
import Navbar from '../components/Navbar';
import AirQualityIcon from '@mui/icons-material/Air';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import TimelineIcon from '@mui/icons-material/Timeline';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Home = () => {
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
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ ...gradientText, fontWeight: 800, mb: 3 }}>
                Smart Air Quality Predictions
              </Typography>
              <Typography variant="h5" sx={{ color: '#B2BAC2', lineHeight: 1.8, mb: 4 }}>
                Experience the future of air quality monitoring with our AI-powered prediction system. 
                Make informed decisions about your outdoor activities with real-time AQI forecasts.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <AnalyticsIcon sx={{ 
                  fontSize: 350, 
                  color: 'rgba(33, 150, 243, 0.1)',
                  position: 'absolute',
                  right: -50,
                  top: -50,
                  transform: 'rotate(-15deg)'
                }} />
                <Box sx={{ 
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <img 
                    src="/assets/aqi-chart.png" 
                    alt="AQI Chart" 
                    style={{ 
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '24px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }} 
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 12, mb: 8 }}>
            <Typography variant="h3" align="center" sx={{ ...gradientText, mb: 8, fontWeight: 700 }}>
              Why Choose Our Platform?
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  icon: <AirQualityIcon sx={{ fontSize: 60, color: '#2196F3' }} />,
                  title: "Accurate Predictions",
                  description: "Our advanced ML models provide highly accurate AQI predictions using real-time environmental data and historical patterns."
                },
                {
                  icon: <CloudQueueIcon sx={{ fontSize: 60, color: '#00BFA5' }} />,
                  title: "Real-time Monitoring",
                  description: "Stay informed with continuous monitoring of air quality parameters and instant updates on changing conditions."
                },
                {
                  icon: <TimelineIcon sx={{ fontSize: 60, color: '#FF4081' }} />,
                  title: "Trend Analysis",
                  description: "Understand air quality patterns with comprehensive historical data analysis and visual trend representations."
                }
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{
                    height: '100%',
                    borderRadius: '24px',
                    p: 2,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    ...cardHoverEffect
                  }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box sx={{
                        mb: 3,
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        background: 'rgba(33, 150, 243, 0.1)'
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;