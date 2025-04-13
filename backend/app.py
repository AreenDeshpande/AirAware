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

# Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/aqi_prediction"
app.config['SECRET_KEY'] = 'your-secret-key'  # Change this in production
mongo = PyMongo(app)

# Weather API configuration
WEATHER_API_KEY = 'your-weather-api-key'  # Get from OpenWeatherMap
WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather'

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
        features = np.array([[
            float(data['temperature']),
            float(data['humidity']),
            float(data['pm25']),
            float(data['pm10']),
            float(data['no2']),
            float(data['so2']),
            float(data['co'])
        ]])
        
        prediction = model.predict(features)[0]
        
        # Save prediction to history
        prediction_record = {
            'user_id': current_user['_id'],
            'date': datetime.utcnow(),
            'temperature': data['temperature'],
            'humidity': data['humidity'],
            'pm25': data['pm25'],
            'pm10': data['pm10'],
            'aqi': float(prediction)
        }
        mongo.db.predictions.insert_one(prediction_record)
        
        return jsonify({'prediction': float(prediction)})
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/api/weather', methods=['GET'])
@token_required
def get_weather(current_user):
    try:
        params = {
            'q': 'Mumbai',  # Default city
            'appid': WEATHER_API_KEY,
            'units': 'metric'
        }
        response = requests.get(WEATHER_API_URL, params=params)
        weather_data = response.json()
        
        return jsonify({
            'temperature': weather_data['main']['temp'],
            'humidity': weather_data['main']['humidity'],
            'windSpeed': weather_data['wind']['speed'],
            'condition': weather_data['weather'][0]['main'],
            'forecast': [
                {
                    'date': (datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d'),
                    'temperature': weather_data['main']['temp'],
                    'condition': weather_data['weather'][0]['main']
                } for i in range(4)
            ]
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
