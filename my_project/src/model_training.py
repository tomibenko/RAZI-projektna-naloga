import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
import joblib

def train_model():
    df = pd.read_csv('simulated_access_data.csv')
    X = df.drop(['access_time', 'is_authorized'], axis=1)
    y = df['is_authorized']
   
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=12, stratify=y
    )

    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    clf = RandomForestClassifier(n_estimators=1000, random_state=12,class_weight='balanced')
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    joblib.dump(X.columns.tolist(), 'feature_columns.joblib')
    joblib.dump(clf, 'random_forest_model.joblib')
    joblib.dump(scaler, 'scaler.joblib')
    print("Model in scaler sta shranjena v 'src/' mapi.")

if __name__ == "__main__":
    train_model()
