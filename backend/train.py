from pathlib import Path

import joblib
import pandas as pd

from backend.services.trainer import train_model
from backend.services.evaluator import evaluate_model
from backend.utils.preprocess import split_data


BASE_DIR = Path(__file__).resolve().parent

DATA_PATH = BASE_DIR / "data" / "creditcard.csv"

MODEL_DIR = BASE_DIR / "models"

MODEL_PATH = MODEL_DIR / "fraud_model.pkl"


def load_data():
    print("Loading dataset...")

    df = pd.read_csv(DATA_PATH)

    print(f"Dataset Shape: {df.shape}")

    return df


def save_model(model):
    MODEL_DIR.mkdir(exist_ok=True)

    joblib.dump(model, MODEL_PATH)

    print(f"\nModel saved to:\n{MODEL_PATH}")


def main():

    df = load_data()

    X_train, X_test, y_train, y_test = split_data(df)

    model = train_model(X_train, y_train)

    evaluate_model(model, X_test, y_test)

    save_model(model)


if __name__ == "__main__":
    main()