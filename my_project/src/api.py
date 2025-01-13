from flask import Flask, request, jsonify
import joblib
import pandas as pd

# Load model, scaler, and feature columns
clf = joblib.load('random_forest_model.joblib')
scaler = joblib.load('scaler.joblib')
feature_columns = joblib.load('feature_columns.joblib')

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the POST request
    data = request.json
    access_time = data.get('access_time')
    user_id = data.get('user_id')
    device_location = data.get('device_location')

    # Preprocess input
    new_data = {
        'user_id': [user_id],
        'hour': [pd.to_datetime(access_time).hour],
        'device_location_' + device_location: [1]
    }

    all_locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']  # Adjust as needed
    for loc in all_locations:
        if loc != device_location:
            new_data['device_location_' + loc] = 0

    hour = pd.to_datetime(access_time).hour
    if 5 <= hour < 12:
        time_of_day = 'morning'
    elif 12 <= hour < 17:
        time_of_day = 'afternoon'
    elif 17 <= hour < 21:
        time_of_day = 'evening'
    else:
        time_of_day = 'night'

    new_data['time_of_day_afternoon'] = 1 if time_of_day == 'afternoon' else 0
    new_data['time_of_day_evening'] = 1 if time_of_day == 'evening' else 0
    new_data['time_of_day_morning'] = 1 if time_of_day == 'morning' else 0
    new_data['time_of_day_night'] = 1 if time_of_day == 'night' else 0

    df_new = pd.DataFrame(new_data)

    # Ensure all expected columns are present
    for col in feature_columns:
        if col not in df_new.columns:
            df_new[col] = 0

    df_new = df_new[feature_columns]

    # Scale the input
    X_new = scaler.transform(df_new)

    # Make predictions
    prediction = clf.predict(X_new)[0]
    probability = clf.predict_proba(X_new)[0, 1]

    result = {
        'status': 'Sumljivo' if prediction < 0.5 else 'Pooblaščeno',
        'probability': probability
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
