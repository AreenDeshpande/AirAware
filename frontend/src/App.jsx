import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import About from './pages/about';
import Dashboard from './pages/dashboard';
import Predict from './pages/predict';
import Weather from './pages/weather';
import History from './pages/history';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          
            <Dashboard />
          
        } />
        <Route path="/predict" element={
          
            <Predict />
          
        } />
        <Route path="/weather" element={
          
            <Weather />
          
        } />
        <Route path="/history" element={
          
            <History />
          
        } />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;