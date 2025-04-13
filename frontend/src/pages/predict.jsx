import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Predict = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    pm25: '',
    pm10: '',
    no2: '',
    so2: '',
    co: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to get prediction');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pt: 4, pb: 4 }}>
      <Container>
        <Button onClick={() => navigate('/dashboard')} sx={{ mb: 4 }}>
          Back to Dashboard
        </Button>
        
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            AQI Prediction
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Temperature (°C)"
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Humidity (%)"
                  type="number"
                  value={formData.humidity}
                  onChange={(e) => setFormData({...formData, humidity: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PM2.5 (μg/m³)"
                  type="number"
                  value={formData.pm25}
                  onChange={(e) => setFormData({...formData, pm25: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PM10 (μg/m³)"
                  type="number"
                  value={formData.pm10}
                  onChange={(e) => setFormData({...formData, pm10: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="NO2 (ppb)"
                  type="number"
                  value={formData.no2}
                  onChange={(e) => setFormData({...formData, no2: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="SO2 (ppb)"
                  type="number"
                  value={formData.so2}
                  onChange={(e) => setFormData({...formData, so2: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="CO (ppm)"
                  type="number"
                  value={formData.co}
                  onChange={(e) => setFormData({...formData, co: e.target.value})}
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 4 }}
              fullWidth
            >
              Predict AQI
            </Button>
          </form>

          {prediction && (
            <Paper sx={{ mt: 4, p: 3, backgroundColor: '#e3f2fd' }}>
              <Typography variant="h5" gutterBottom>
                Predicted AQI: {prediction}
              </Typography>
              <Typography variant="body1">
                {prediction < 50 ? 'Good air quality' :
                 prediction < 100 ? 'Moderate air quality' :
                 prediction < 150 ? 'Unhealthy for sensitive groups' :
                 'Unhealthy air quality'}
              </Typography>
            </Paper>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Predict;