from pathlib import Path
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "fraud_model.pkl"

model = joblib.load(MODEL_PATH)


def predict_transaction(features):

    probability = float(model.predict_proba([features])[0][1])

    prediction = "Fraud" if probability >= 0.5 else "Legitimate"

    if probability >= 0.80:
        risk = "High"
    elif probability >= 0.40:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "prediction": prediction,
        "fraud_probability": round(probability, 4),
        "confidence": f"{round(probability * 100, 2)}%",
        "risk_level": risk
    }