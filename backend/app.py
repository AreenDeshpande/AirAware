from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps
import requests
import joblib
import numpy as np
import pandas as pd
import traceback
import os 
#from prophet import Prophet

# --- Add imports for plotting ---
import io
import base64
import matplotlib
matplotlib.use('Agg') # Use non-interactive backend REQUIRED for Flask/server environments
import matplotlib.pyplot as plt
import seaborn as sns
# --- End plotting imports ---

app = Flask(__name__)
CORS(app)

# Load environment variables
from dotenv import load_dotenv
import os

load_dotenv()

# Configuration
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
mongo = PyMongo(app)

# Weather API configuration
WEATHER_API_KEY = os.getenv('API_KEY')  # Get from OpenWeatherMap
WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/air_pollution'  # Air pollution API endpoint
GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/direct'  # Geocoding API endpoint

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models')

model_so2_path = os.path.join(MODEL_DIR, 'model_so2.pkl')
model_no2_path = os.path.join(MODEL_DIR, 'model_no2.pkl')
model_spm_path = os.path.join(MODEL_DIR, 'model_spm.pkl')

model_so2, model_no2, model_spm = None, None, None # Initialize
try:
    print(f"Loading SO2 model from: {model_so2_path}")
    model_so2 = joblib.load(model_so2_path)
    print(f"Loading NO2 model from: {model_no2_path}")
    model_no2 = joblib.load(model_no2_path)
    print(f"Loading SPM model from: {model_spm_path}")
    model_spm = joblib.load(model_spm_path)
    print("Models loaded successfully.")
except FileNotFoundError as e:
    print(f"ERROR: Model file not found. Check paths relative to the script location.")
    print(f"Attempted paths:\n - {model_so2_path}\n - {model_no2_path}\n - {model_spm_path}")
    print(f"Error details: {e}")
except Exception as e:
    print(f"ERROR: Failed to load one or more models during startup. {e}")
    traceback.print_exc()
# --- End Model Loading ---


# Load ML model
#model = joblib.load('model/aqi_model.pkl')

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = mongo.db.users.find_one({'_id': data['user_id']})
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    if mongo.db.users.find_one({'email': data['email']}):
        return jsonify({'message': 'Email already exists'}), 400
    
    hashed_password = generate_password_hash(data['password'])
    user = {
        'name': data['name'],
        'email': data['email'],
        'password': hashed_password,
        'created_at': datetime.utcnow()
    }
    mongo.db.users.insert_one(user)
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = mongo.db.users.find_one({'email': data['email']})
    
    if user and check_password_hash(user['password'], data['password']):
        token = jwt.encode({
            'user_id': str(user['_id']),
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, app.config['SECRET_KEY'])
        return jsonify({'token': token})
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/predict', methods=['POST'])
#@token_required
def predict():
    # --- Check if models are loaded ---
    if not all([model_so2, model_no2, model_spm]):
        print("Error: Prediction endpoint called, but models are not loaded.")
        return jsonify({'message': 'Prediction service is unavailable due to model loading errors'}), 503

    # Input JSON is received but we don't need 'date' from it anymore
    # data = request.json # You might still need this if other params are used later
    num_days_to_predict = 30
    print(f"Received prediction request (will predict for next 2 days automatically)")

    try:
        # === Calculate Target Dates & Prepare Future DF ===
        now = datetime.now()
        prediction_dates = [now + timedelta(days=i) for i in range(1, num_days_to_predict + 1)]
        future_df = pd.DataFrame({'ds': prediction_dates})

        # === Make Predictions ===
        print("--- Predicting SO2, NO2, SPM ---")
        forecast_so2 = model_so2.predict(future_df)
        forecast_no2 = model_no2.predict(future_df)
        forecast_spm = model_spm.predict(future_df)

        # === Process Results ===
        results = []
        for i in forecast_so2.index:
            target_date = future_df.loc[i, 'ds']
            target_date_str = target_date.strftime('%Y-%m-%d')
            try:
                so2_pred = max(0, float(forecast_so2.loc[i, 'yhat']))
                no2_pred = max(0, float(forecast_no2.loc[i, 'yhat']))
                spm_pred = max(0, float(forecast_spm.loc[i, 'yhat']))
                aqi = float((no2_pred * 0.3 + so2_pred * 0.3 + spm_pred * 0.4) * 10)

                results.append({
                    'date': target_date_str, 'no2': no2_pred, 'so2': so2_pred,
                    'spm': spm_pred, 'aqi': aqi
                })
                # Optional: DB saving removed for brevity, add back if needed
            except (KeyError, IndexError) as extract_err:
                print(f"ERROR: Skipping date {target_date_str}. Failed extract: {extract_err}")

        if not results:
            return jsonify({'message': 'Failed to generate valid predictions.'}), 500

        # === Generate Plot using Seaborn ===
        plot_url = None # Initialize plot URL
        try:
            print("--- Generating Plot ---")
            # Create DataFrame from results for easier plotting
            plot_df = pd.DataFrame(results)
            # Convert date string back to datetime for plotting if needed, or use as category
            plot_df['date'] = pd.to_datetime(plot_df['date'])

            # --- Prepare data for lineplot (melt) ---
            # This structure makes plotting multiple lines easier with Seaborn's hue
            plot_df_melted = plot_df.melt(id_vars=['date'],
                                         value_vars=['aqi', 'no2', 'so2', 'spm'],
                                         var_name='Metric', value_name='Value')

            # --- Create the plot ---
            plt.style.use('seaborn-v0_8-whitegrid') # Use a seaborn style
            fig, ax = plt.subplots(figsize=(12, 6)) # Adjust figure size

            sns.lineplot(data=plot_df_melted, x='date', y='Value', hue='Metric', ax=ax, marker='o', markersize=4)

            # Customize plot
            ax.set_title(f'30-Day Air Quality Forecast (AQI & Pollutants)', fontsize=16)
            ax.set_xlabel('Date', fontsize=12)
            ax.set_ylabel('Value', fontsize=12)
            ax.tick_params(axis='x', rotation=45) # Rotate x-axis labels
            ax.legend(title='Metric')
            plt.tight_layout() # Adjust layout

            # --- Save plot to memory buffer ---
            buf = io.BytesIO()
            plt.savefig(buf, format='png', dpi=100) # Save as PNG to buffer
            buf.seek(0) # Rewind buffer
            plt.close(fig) # Close the figure to free memory

            # --- Encode image to Base64 ---
            img_base64 = base64.b64encode(buf.read()).decode('utf-8')
            plot_url = f'data:image/png;base64,{img_base64}' # Create data URL
            print("--- Plot generated successfully ---")

        except Exception as plot_e:
            print(f"ERROR generating plot: {plot_e}")
            traceback.print_exc()
            # Continue without plot_url if plotting fails

        # === Return Response (including plot URL) ===
        print(f"--- Prediction process complete. Returning {len(results)} result(s). ---")
        return jsonify({
            'predictions': results, # Raw data
            'plot_url': plot_url,   # Base64 encoded image data URL (or null if error)
            'message': f'Predictions generated for {len(results)} day(s).' + (' Plot included.' if plot_url else ' Plot generation failed.')
        }), 200

    except Exception as e:
        print(f"Unhandled exception in /api/predict: {e}")
        traceback.print_exc()
        return jsonify({'message': 'An unexpected server error occurred'}), 500
        # Load Prophet models
        '''model_no2 = joblib.load('models/model_no2.pkl')
        model_so2 = joblib.load('models/model_so2.pkl')
        model_spm = joblib.load('models/model_spm.pkl')

            # --- Check if models loaded successfully ---
        if not all([model_so2, model_no2, model_spm]):
            print("Error: Prediction endpoint called, but models are not loaded.")
            return jsonify({'message': 'Prediction service is unavailable due to model loading errors'}), 503 # Service Unavailable
        
        
        # Get predictions for each pollutant
        date = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))
        no2_pred = float(model_no2.predict(date)[0])
        so2_pred = float(model_so2.predict(date)[0])
        spm_pred = float(model_spm.predict(date)[0])
        
        # Calculate AQI using the formula
        # Using a simplified formula for demonstration
        aqi = (no2_pred * 0.3 + so2_pred * 0.3 + spm_pred * 0.4) * 10
        print(aqi)
        
        # Save prediction to history
        prediction_record = {
            #'user_id': current_user['_id'],
            'date': datetime.strptime(date, '%Y-%m-%d'),
            'no2': no2_pred,
            'so2': so2_pred,
            'spm': spm_pred,
            'aqi': float(aqi)
        }
        mongo.db.predictions.insert_one(prediction_record)
        
        return jsonify({
            'prediction': {
                'date': date,
                'no2': no2_pred,
                'so2': so2_pred,
                'spm': spm_pred,
                'aqi': aqi
            }
        })
    except Exception as e:
        return jsonify({'message': str(e)}), 400'''


@app.route('/api/weather', methods=['GET'])
@token_required
def get_weather(current_user):
    try:
        # First get coordinates for Mumbai
        geo_params = {
            'q': 'Mumbai,IN',  # Default city
            'limit': 1,
            'appid': WEATHER_API_KEY
        }
        geo_response = requests.get(GEO_API_URL, params=geo_params)
        if not geo_response.ok:
            return jsonify({'message': 'Failed to get location data'}), 400
            
        location_data = geo_response.json()
        if not location_data:
            return jsonify({'message': 'Location not found'}), 404
            
        lat = location_data[0]['lat']
        lon = location_data[0]['lon']
        
        # Get air quality data
        air_params = {
            'lat': lat,
            'lon': lon,
            'appid': WEATHER_API_KEY
        }
        
        response = requests.get(WEATHER_API_URL, params=air_params)
        if not response.ok:
            return jsonify({'message': 'Failed to fetch air quality data'}), 400
            
        air_data = response.json()
        if not air_data.get('list') or not air_data['list']:
            return jsonify({'message': 'No air quality data available'}), 404
            
        current_air = air_data['list'][0]
        
        return jsonify({
            'main': {
                'aqi': current_air['main']['aqi']
            },
            'components': current_air['components']
        })
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/api/history', methods=['GET'])
@token_required
def get_history(current_user):
    try:
        predictions = list(mongo.db.predictions.find(
            {'user_id': current_user['_id']},
            {'_id': 0}
        ).sort('date', -1))
        
        return jsonify(predictions)
    except Exception as e:
        return jsonify({'message': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
