from pathlib import Path
import joblib

from backend.services.explainer import explain_prediction

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "fraud_model.pkl"

model = joblib.load(MODEL_PATH)


def predict_transaction(features):

    fraud_probability = float(
        model.predict_proba([features])[0][1]
    )

    if fraud_probability >= 0.5:
        prediction = "Fraud"
        confidence = fraud_probability
    else:
        prediction = "Legitimate"
        confidence = 1 - fraud_probability

    if fraud_probability >= 0.80:
        risk = "High"
    elif fraud_probability >= 0.40:
        risk = "Medium"
    else:
        risk = "Low"

    top_factors = explain_prediction(
        model,
        features
    )

    return {
        "prediction": prediction,
        "fraud_probability": round(
            fraud_probability,
            4
        ),
        "confidence": f"{confidence * 100:.2f}%",
        "risk_level": risk,
        "top_factors": top_factors
    }