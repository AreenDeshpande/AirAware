import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DataArrayIcon from '@mui/icons-material/DataArray';

const About = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
      py: 8
    }}>
      <Container>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            About Our AQI Prediction System
          </Typography>
          <Typography variant="body1" paragraph>
            Our Air Quality Index (AQI) prediction system utilizes advanced machine learning
            algorithms to provide accurate forecasts of air quality. The system analyzes
            various environmental parameters to deliver reliable predictions that help users
            make informed decisions about their outdoor activities.
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BarChartIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom align="center">
                  Data Analysis
                </Typography>
                <Typography variant="body1" align="center">
                  Comprehensive analysis of environmental data using statistical methods
                  and machine learning techniques.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PrecisionManufacturingIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom align="center">
                  ML Model
                </Typography>
                <Typography variant="body1" align="center">
                  State-of-the-art machine learning model trained on extensive historical
                  air quality data for accurate predictions.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DataArrayIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom align="center">
                  Real-time Processing
                </Typography>
                <Typography variant="body1" align="center">
                  Real-time processing of environmental data to provide up-to-date
                  predictions and insights.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;