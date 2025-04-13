import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import TimelineIcon from '@mui/icons-material/Timeline';

const Home = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)'
    }}>
      <Container>
        <Box sx={{ pt: 8, pb: 6 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Air Quality Index Prediction
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Accurate AQI predictions using advanced machine learning models.
            Monitor air quality, check weather forecasts, and track historical data.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" component={Link} to="/login">
              Get Started
            </Button>
            <Button variant="outlined" component={Link} to="/about">
              Learn More
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <AirIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  AQI Prediction
                </Typography>
                <Typography>
                  Get accurate predictions of Air Quality Index using our advanced ML model.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <CloudIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  Weather Forecast
                </Typography>
                <Typography>
                  Access real-time weather forecasting data and air quality metrics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <TimelineIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  Historical Analysis
                </Typography>
                <Typography>
                  View and analyze your previous predictions and air quality trends.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;