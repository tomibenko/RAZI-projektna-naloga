from src.data_generation import generate_simulated_data
from src.model_training import train_model
from src.prediction import predict_suspicious_access

if __name__ == "__main__":
    # Generiranje podatkov
    #generate_simulated_data()

    # Treniranje modela
   # train_model()

    # Napovedovanje
    access_time = '2024-12-15 14:30:00'
    user_id = 25
    device_location = 'Maribor'
    
    status, prob = predict_suspicious_access(access_time, user_id, device_location)
    print(f"Status dostopa: {status} (Verjetnost: {prob:.2f})")
