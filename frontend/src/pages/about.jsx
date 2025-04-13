import React from 'react';
import { Box, Container, Typography, Grid, Paper, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AirIcon from '@mui/icons-material/Air';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DataArrayIcon from '@mui/icons-material/DataArray';
import BarChartIcon from '@mui/icons-material/BarChart';
import ScienceIcon from '@mui/icons-material/Science';
import SpeedIcon from '@mui/icons-material/Speed';
import Navbar from '../components/Navbar';

const About = () => {
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
                About Our Technology
              </Typography>
              <Typography variant="h6" sx={{ color: '#555', mb: 4, lineHeight: 1.8 }}>
                Our AQI prediction system combines cutting-edge machine learning algorithms with real-time environmental data 
                to provide accurate air quality forecasts. We utilize advanced neural networks and ensemble methods to analyze 
                multiple parameters and deliver reliable predictions.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ScienceIcon sx={{ fontSize: 300, color: 'rgba(33, 150, 243, 0.3)' }} />
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
            Our Approach
          </Typography>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch'
          }}>
            <Grid container spacing={4} maxWidth="lg" justifyContent="center">
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ 
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
                  <Box sx={{ textAlign: 'center' }}>
                    <PrecisionManufacturingIcon sx={{ fontSize: 70, color: '#2196F3', mb: 2 }} />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Machine Learning
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Advanced ML algorithms trained on extensive historical data to provide accurate predictions.
                      Our models continuously learn and adapt to changing patterns.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ 
                  p: 4, 
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 5
                  }
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <SpeedIcon sx={{ fontSize: 70, color: '#2196F3', mb: 2 }} />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Real-time Processing
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Instant processing of environmental data to provide up-to-date predictions.
                      Real-time monitoring of multiple air quality parameters.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ 
                  p: 4, 
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 5
                  }
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <BarChartIcon sx={{ fontSize: 70, color: '#2196F3', mb: 2 }} />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Data Analytics
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Comprehensive analysis of historical trends and patterns.
                      Advanced visualization tools for better understanding.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default About;