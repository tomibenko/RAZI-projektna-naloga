import pandas as pd
import numpy as np
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker('sl_SI')

def generate_simulated_data(num_samples=100000, authorized_ratio=0.2):
    data = {
        'access_time': [],
        'user_id': [],
        'device_location': [],
        'is_authorized': []
    }

    for _ in range(num_samples):
        access_time = fake.date_time_between(start_date='-30d', end_date='now')
        user_id = random.randint(1, 100)
        device_location = fake.city()
        is_authorized = 1 if random.random() < authorized_ratio else 0

        data['access_time'].append(access_time)
        data['user_id'].append(user_id)
        data['device_location'].append(device_location)
        data['is_authorized'].append(is_authorized)

    df = pd.DataFrame(data)

    def get_time_of_day(dt):
        hour = dt.hour
        if 5 <= hour < 12:
            return 'morning'
        elif 12 <= hour < 17:
            return 'afternoon'
        elif 17 <= hour < 21:
            return 'evening'
        else:
            return 'night'

    df['time_of_day'] = df['access_time'].apply(get_time_of_day)
    df = pd.get_dummies(df, columns=['time_of_day','device_location'], drop_first=True)
    df.to_csv('simulated_access_data.csv', index=False)
    print("Simulirani podatki so shranjeni v 'simulated_access_data.csv'")

if __name__ == "__main__":
    generate_simulated_data()
