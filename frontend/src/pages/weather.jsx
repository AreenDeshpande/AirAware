import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';

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

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pt: 4, pb: 4 }}>
      <Container>
        <Button onClick={() => navigate('/dashboard')} sx={{ mb: 4 }}>
          Back to Dashboard
        </Button>

        <Typography variant="h4" gutterBottom>
          Weather Forecast
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper sx={{ p: 3, backgroundColor: '#ffebee' }}>
            <Typography color="error">{error}</Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WbSunnyIcon sx={{ fontSize: 40, color: 'orange', mr: 2 }} />
                  <Typography variant="h6">Temperature</Typography>
                </Box>
                <Typography variant="h4">{weatherData?.temperature}°C</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <OpacityIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6">Humidity</Typography>
                </Box>
                <Typography variant="h4">{weatherData?.humidity}%</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AirIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6">Wind Speed</Typography>
                </Box>
                <Typography variant="h4">{weatherData?.windSpeed} km/h</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Forecast
                </Typography>
                <Grid container spacing={2}>
                  {weatherData?.forecast?.map((day, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1">{day.date}</Typography>
                        <WbSunnyIcon sx={{ fontSize: 30, color: 'orange', my: 1 }} />
                        <Typography>{day.temperature}°C</Typography>
                        <Typography variant="body2">{day.condition}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Weather;