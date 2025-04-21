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

# Load ML model
model = joblib.load('model/aqi_model.pkl')

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
@token_required
def predict(current_user):
    data = request.json
    try:
        # Load Prophet models
        model_no2 = joblib.load('models/model_no2.pkl')
        model_so2 = joblib.load('models/model_so2.pkl')
        model_spm = joblib.load('models/model_spm.pkl')
        
        # Get predictions for each pollutant
        date = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))
        no2_pred = float(model_no2.predict(date)[0])
        so2_pred = float(model_so2.predict(date)[0])
        spm_pred = float(model_spm.predict(date)[0])
        
        # Calculate AQI using the formula
        # Using a simplified formula for demonstration
        aqi = (no2_pred * 0.3 + so2_pred * 0.3 + spm_pred * 0.4) * 10
        
        # Save prediction to history
        prediction_record = {
            'user_id': current_user['_id'],
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
        return jsonify({'message': str(e)}), 400

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
