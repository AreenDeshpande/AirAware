import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import CO2Icon from '@mui/icons-material/Co2';
import CloudIcon from '@mui/icons-material/Cloud';
import Navbar from '../components/Navbar';

const Weather = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/weather', {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        if (response.ok) {
          setWeatherData(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const AirQualityCard = ({ title, value, unit, icon: Icon }) => (
    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{
        p: 3,
        background: 'rgba(19, 47, 76, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(66, 165, 245, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(66, 165, 245, 0.1)',
          mb: 2
        }}>
          <Icon sx={{ fontSize: 30, color: '#42A5F5' }} />
        </Box>
        <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1, textAlign: 'center' }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color: '#42A5F5', mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: '#B2BAC2' }}>
          {unit}
        </Typography>
      </Paper>
    </Grid>
  );

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
          <Button
            onClick={() => navigate('/dashboard')}
            sx={{
              mb: 4,
              color: '#42A5F5',
              borderColor: '#42A5F5',
              '&:hover': {
                borderColor: '#90CAF9',
                backgroundColor: 'rgba(66, 165, 245, 0.08)'
              }
            }}
            variant="outlined"
          >
            Back to Dashboard
          </Button>

          <Typography variant="h4" sx={{ color: '#FFFFFF', mb: 4 }}>
            Air Quality Information
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress sx={{ color: '#42A5F5' }} />
            </Box>
          ) : error ? (
            <Paper sx={{ p: 3, backgroundColor: 'rgba(244, 67, 54, 0.1)', borderRadius: '16px' }}>
              <Typography sx={{ color: '#f44336' }}>{error}</Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              <AirQualityCard
                title="Carbon Monoxide"
                value={weatherData?.components?.co?.toFixed(2)}
                unit="μg/m³"
                icon={CO2Icon}
              />
              <AirQualityCard
                title="Nitrogen Dioxide"
                value={weatherData?.components?.no2?.toFixed(2)}
                unit="μg/m³"
                icon={CloudIcon}
              />
              <AirQualityCard
                title="Ozone"
                value={weatherData?.components?.o3?.toFixed(2)}
                unit="μg/m³"
                icon={AirIcon}
              />
              <AirQualityCard
                title="Sulfur Dioxide"
                value={weatherData?.components?.so2?.toFixed(2)}
                unit="μg/m³"
                icon={CloudIcon}
              />
              <AirQualityCard
                title="PM2.5"
                value={weatherData?.components?.pm2_5?.toFixed(2)}
                unit="μg/m³"
                icon={AirIcon}
              />
              <AirQualityCard
                title="PM10"
                value={weatherData?.components?.pm10?.toFixed(2)}
                unit="μg/m³"
                icon={AirIcon}
              />
              <AirQualityCard
                title="Ammonia"
                value={weatherData?.components?.nh3?.toFixed(2)}
                unit="μg/m³"
                icon={CloudIcon}
              />
              <AirQualityCard
                title="Air Quality Index"
                value={weatherData?.main?.aqi}
                unit="AQI"
                icon={AirIcon}
              />
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Weather;