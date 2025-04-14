# AirAware (Air Quality Index (AQI) Prediction System)

This project is a comprehensive Air Quality Index (AQI) prediction system built using time series forecasting. It predicts the AQI values using the Prophet model and provides a user-friendly interface for interacting with the system. The frontend is developed using React, while the backend is built with Flask, and MongoDB is used for storing air quality data.

## Features

- **Time Series Prediction**: Forecast AQI values based on historical data of Ozone (O₃), Nitrogen Dioxide (NO₂), and other air quality parameters.
- **Real-Time Data**: The system fetches real-time air quality data for predictions.
- **Graphical Representation**: A React-based frontend displays the historical data, predicted AQI values, and trends.
- **Data Storage**: All data is stored in MongoDB for easy retrieval and analysis.
- **Prediction Analysis**: The system uses the Prophet model for predicting future AQI values.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Data Storage**: MongoDB
- **Time Series Prediction**: Prophet (for forecasting AQI values)
- **Other Libraries**:
  - Pandas (data manipulation)
  - NumPy (numerical operations)
  - Matplotlib (plotting)
  - Flask-RESTful (building APIs)
  - Flask-CORS (for handling CORS in React-Backend communication)
  - PyMongo (MongoDB interaction)

