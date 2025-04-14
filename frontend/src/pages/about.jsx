import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { gradientText, cardHoverEffect } from '../styles/theme';
import Navbar from '../components/Navbar';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ScienceIcon from '@mui/icons-material/Science';
import SpeedIcon from '@mui/icons-material/Speed';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import SecurityIcon from '@mui/icons-material/Security';

const About = () => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        pt: 12,
        pb: 8
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ ...gradientText, fontWeight: 800, mb: 3 }}>
                Innovative Air Quality Technology
              </Typography>
              <Typography variant="h5" sx={{ color: '#555', lineHeight: 1.8, mb: 4 }}>
                Our cutting-edge AQI prediction system harnesses the power of advanced machine learning 
                and real-time data processing to deliver accurate forecasts. We're committed to helping 
                you make informed decisions about air quality.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <ScienceIcon sx={{ 
                  fontSize: 350, 
                  color: 'rgba(33, 150, 243, 0.1)',
                  position: 'absolute',
                  right: -50,
                  top: -50,
                  transform: 'rotate(-15deg)'
                }} />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 12, mb: 8 }}>
            <Typography variant="h3" align="center" sx={{ ...gradientText, mb: 8, fontWeight: 700 }}>
              Our Advanced Approach
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  icon: <PrecisionManufacturingIcon sx={{ fontSize: 60, color: '#2196F3' }} />,
                  title: "Machine Learning Excellence",
                  description: "State-of-the-art ML algorithms trained on extensive historical data ensure highly accurate predictions and adaptive learning capabilities."
                },
                {
                  icon: <SpeedIcon sx={{ fontSize: 60, color: '#00BFA5' }} />,
                  title: "Real-time Processing",
                  description: "Lightning-fast data processing enables instant updates and continuous monitoring of multiple air quality parameters."
                },
                {
                  icon: <BarChartIcon sx={{ fontSize: 60, color: '#FF4081' }} />,
                  title: "Advanced Analytics",
                  description: "Comprehensive data analysis tools provide deep insights into air quality trends and patterns."
                },
                {
                  icon: <CloudSyncIcon sx={{ fontSize: 60, color: '#7C4DFF' }} />,
                  title: "Cloud Integration",
                  description: "Seamless cloud infrastructure ensures reliable data storage and instant access to historical information."
                },
                {
                  icon: <SecurityIcon sx={{ fontSize: 60, color: '#FF6E40' }} />,
                  title: "Secure Platform",
                  description: "Enterprise-grade security measures protect your data while maintaining easy accessibility."
                },
                {
                  icon: <ScienceIcon sx={{ fontSize: 60, color: '#00B8D4' }} />,
                  title: "Scientific Accuracy",
                  description: "Research-backed methodologies and continuous validation ensure prediction reliability."
                }
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ height: '100%', p: 1 }}>
                    <Card sx={{
                      height: '100%',
                      borderRadius: '24px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 3,
                      ...cardHoverEffect
                    }}>
                      <CardContent sx={{ 
                        textAlign: 'center',
                        p: { xs: 2, md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <Box>
                          <Box sx={{
                            mb: 3,
                            display: 'inline-flex',
                            p: 2,
                            borderRadius: '50%',
                            background: 'rgba(33, 150, 243, 0.1)'
                          }}>
                            {feature.icon}
                          </Box>
                          <Typography 
                            variant="h5" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 600,
                              fontSize: { xs: '1.25rem', md: '1.5rem' }
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ 
                              lineHeight: 1.8,
                              fontSize: { xs: '0.875rem', md: '1rem' }
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
