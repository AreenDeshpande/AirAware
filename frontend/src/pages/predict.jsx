import React, { useState } from 'react'; // Removed useEffect, Chart imports
import { Box, Container, Paper, Typography, Button, Grid, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Removed Chart.js imports and registration

const Predict = () => {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [plotImageUrl, setPlotImageUrl] = useState(null); // State for the image URL
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Removed chartData state

  const handlePredict = async () => {
    setError('');
    setPredictions([]);
    setPlotImageUrl(null); // Clear previous plot
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') || ''
        },
        body: JSON.stringify({})
      });

      const data = await response.json();

      if (response.ok) {
        // Store both raw predictions and the plot URL
        if (data.predictions && Array.isArray(data.predictions)) {
          setPredictions(data.predictions);
        }
        if (data.plot_url) {
          setPlotImageUrl(data.plot_url); // Store the Base64 data URL
        } else if(data.predictions && data.predictions.length > 0) {
          // Handle case where prediction succeeded but plot failed
           console.warn("Predictions received, but plot generation failed on backend.");
           // Optionally set a specific user message here
        }

        if (!data.predictions || data.predictions.length === 0) {
             setError(data.message || 'No prediction data received.');
        }

      } else {
        setError(data.message || 'Prediction failed. Please try again.');
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to connect to the prediction service.');
    } finally {
      setLoading(false);
    }
  };

  // Removed useEffect hook for chart data processing

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f4f8', pt: 4, pb: 4 }}>
      <Container maxWidth="lg"> {/* Keep wider container */}
        <Button variant="outlined" onClick={() => navigate('/dashboard')} sx={{ mb: 4 }}>
          ← Back to Dashboard
        </Button>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}>
            Air Quality Index Prediction
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
             Click the button below to get the predicted AQI and pollutant levels for the next 30 days.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
                onClick={handlePredict}
                variant="contained"
                disabled={loading}
                size="large"
                sx={{ /* Button styles */ }}
            >
              {loading ? <CircularProgress size={24} sx={{ /* Progress styles */ }} /> : 'Predict AQI for Next 30 Days'}
            </Button>
          </Box>

          {/* Display Error */}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {/* Display Plot Image */}
          {plotImageUrl && (
            <Box sx={{ mt: 4, textAlign: 'center' }}> {/* Center the image */}
              <Typography variant="h6" gutterBottom align="center" sx={{ mb: 2 }}>
                30-Day Forecast Plot
              </Typography>
              <img
                src={plotImageUrl} // Use the Base64 data URL directly
                alt="30-Day Air Quality Forecast Plot"
                style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }} // Basic styling
              />
            </Box>
          )}

          {/* Optionally, still display raw data in a table or list if needed */}
          {/*
          {predictions.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Raw Prediction Data (First 5 Days)</Typography>
              <ul>
                {predictions.slice(0, 5).map((p, index) => (
                  <li key={index}>{p.date}: AQI={p.aqi.toFixed(1)}, NO2={p.no2.toFixed(1)}, SO2={p.so2.toFixed(1)}, SPM={p.spm.toFixed(1)}</li>
                ))}
              </ul>
            </Box>
          )}
          */}

        </Paper>
      </Container>
    </Box>
  );
};

export default Predict;