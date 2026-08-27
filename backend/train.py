from pathlib import Path

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    roc_auc_score,
)
from sklearn.model_selection import train_test_split

# =====================================================
# Paths
# =====================================================

BASE_DIR = Path(__file__).resolve().parent

DATA_PATH = BASE_DIR / "data" / "creditcard.csv"

MODEL_DIR = BASE_DIR / "models"

MODEL_PATH = MODEL_DIR / "fraud_model.pkl"


# =====================================================
# Load Dataset
# =====================================================

def load_data():
    print("\nLoading dataset...")

    df = pd.read_csv(DATA_PATH)

    print("Dataset Loaded Successfully!")

    print(f"Shape : {df.shape}")

    return df


# =====================================================
# Split Dataset
# =====================================================

def split_data(df):

    X = df.drop("Class", axis=1)

    y = df["Class"]

    return train_test_split(
        X,
        y,
        test_size=0.20,
        stratify=y,
        random_state=42,
    )


# =====================================================
# Train Model
# =====================================================

def train_model(X_train, y_train):

    print("\nTraining Random Forest Model...")

    model = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        class_weight="balanced",
        n_jobs=-1,
    )

    model.fit(X_train, y_train)

    print("Training Complete!")

    return model


# =====================================================
# Evaluate
# =====================================================

def evaluate(model, X_test, y_test):

    print("\nEvaluating Model...\n")

    predictions = model.predict(X_test)

    probabilities = model.predict_proba(X_test)[:, 1]

    print(classification_report(y_test, predictions))

    print("\nROC AUC Score")

    print(roc_auc_score(y_test, probabilities))

    print("\nConfusion Matrix")

    print(confusion_matrix(y_test, predictions))


# =====================================================
# Save Model
# =====================================================

def save_model(model):

    MODEL_DIR.mkdir(exist_ok=True)

    joblib.dump(model, MODEL_PATH)

    print(f"\nModel Saved Successfully!")

    print(MODEL_PATH)


# =====================================================
# Main
# =====================================================

def main():

    df = load_data()

    X_train, X_test, y_train, y_test = split_data(df)

    model = train_model(X_train, y_train)

    evaluate(model, X_test, y_test)

    save_model(model)


if __name__ == "__main__":
    main()