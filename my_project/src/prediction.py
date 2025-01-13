import joblib
import pandas as pd

# Load the model, scaler, and feature columns
clf = joblib.load('random_forest_model.joblib')
scaler = joblib.load('scaler.joblib')
feature_columns = joblib.load('feature_columns.joblib')  # Load feature columns

all_locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']  # Adjust as needed

def predict_suspicious_access(access_time, user_id, device_location):
    new_data = {
        'user_id': [user_id],
        'hour': [pd.to_datetime(access_time).hour],
        'device_location_' + device_location: [1]
    }

    # Ensure all other locations are set to 0
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

    # Add time of day as one-hot encoded features
    new_data['time_of_day_afternoon'] = 1 if time_of_day == 'afternoon' else 0
    new_data['time_of_day_evening'] = 1 if time_of_day == 'evening' else 0
    new_data['time_of_day_morning'] = 1 if time_of_day == 'morning' else 0
    new_data['time_of_day_night'] = 1 if time_of_day == 'night' else 0

    # Convert new data to DataFrame
    df_new = pd.DataFrame(new_data)

    # Ensure all expected columns are present
    for col in feature_columns:
        if col not in df_new.columns:
            df_new[col] = 0

    # Match the order of columns
    df_new = df_new[feature_columns]

    # Scale the input features
    X_new = scaler.transform(df_new)

    # Make predictions
    prediction = clf.predict(X_new)
    probability = clf.predict_proba(X_new)[:, 1]

    return 'Sumljivo' if prediction[0] == 0 else 'Pooblaščeno', probability[0]

if __name__ == "__main__":
    access_time = '2024-12-15 7:30:00'
    user_id = 32
    device_location = 'Ljubljana'
    status, prob = predict_suspicious_access(access_time, user_id, device_location)
    print(f"Status dostopa: {status} (Verjetnost: {prob:.2f})")
