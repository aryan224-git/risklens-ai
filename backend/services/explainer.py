import shap
import pandas as pd


FEATURE_NAMES = [
    "Time",
    "V1", "V2", "V3", "V4", "V5", "V6", "V7",
    "V8", "V9", "V10", "V11", "V12", "V13", "V14",
    "V15", "V16", "V17", "V18", "V19", "V20", "V21",
    "V22", "V23", "V24", "V25", "V26", "V27", "V28",
    "Amount"
]


def explain_prediction(model, features):
    input_df = pd.DataFrame(
        [features],
        columns=FEATURE_NAMES
    )

    explainer = shap.TreeExplainer(model)

    shap_values = explainer.shap_values(input_df)

    if isinstance(shap_values, list):
        fraud_values = shap_values[1][0]
    else:
        values = shap_values[0]

        if len(values.shape) == 2:
            fraud_values = values[:, 1]
        else:
            fraud_values = values

    factors = []

    for feature, value in zip(FEATURE_NAMES, fraud_values):
        factors.append({
            "feature": feature,
            "impact": round(float(abs(value)), 6),
            "direction": (
                "increases risk"
                if value > 0
                else "decreases risk"
            )
        })

    factors.sort(
        key=lambda item: item["impact"],
        reverse=True
    )

    return factors[:5]