import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/history', {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        if (response.ok) {
          setPredictions(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to fetch prediction history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getAQIStatus = (aqi) => {
    if (aqi < 50) return { text: 'Good', color: '#4caf50' };
    if (aqi < 100) return { text: 'Moderate', color: '#ff9800' };
    if (aqi < 150) return { text: 'Unhealthy for Sensitive Groups', color: '#f44336' };
    return { text: 'Unhealthy', color: '#d32f2f' };
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pt: 4, pb: 4 }}>
      <Container>
        <Button onClick={() => navigate('/dashboard')} sx={{ mb: 4 }}>
          Back to Dashboard
        </Button>

        <Typography variant="h4" gutterBottom>
          Prediction History
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Temperature</TableCell>
                  <TableCell>Humidity</TableCell>
                  <TableCell>PM2.5</TableCell>
                  <TableCell>PM10</TableCell>
                  <TableCell>Predicted AQI</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {predictions.map((prediction, index) => {
                  const status = getAQIStatus(prediction.aqi);
                  return (
                    <TableRow key={index}>
                      <TableCell>{new Date(prediction.date).toLocaleDateString()}</TableCell>
                      <TableCell>{prediction.temperature}°C</TableCell>
                      <TableCell>{prediction.humidity}%</TableCell>
                      <TableCell>{prediction.pm25}</TableCell>
                      <TableCell>{prediction.pm10}</TableCell>
                      <TableCell>{prediction.aqi}</TableCell>
                      <TableCell>
                        <Typography style={{ color: status.color }}>
                          {status.text}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default History;