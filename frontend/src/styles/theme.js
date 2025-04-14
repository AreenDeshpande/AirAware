import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    secondary: {
      main: '#00BFA5',
      light: '#1DE9B6',
      dark: '#00897B',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
        },
        contained: {
          boxShadow: '0 8px 16px rgba(33, 150, 243, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export const gradientText = {
  background: 'linear-gradient(45deg, #2196F3 30%, #00BFA5 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const cardHoverEffect = {
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
  },
};