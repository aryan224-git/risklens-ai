def generate_risk_summary(
    prediction,
    fraud_probability,
    risk_level,
    top_factors
):
    increasing_factors = [
        factor
        for factor in top_factors
        if factor["direction"] == "increases risk"
    ]

    if prediction == "Fraud":
        if risk_level == "High":
            decision = "Block or Escalate Transaction"
            priority = "High"
            recommended_action = (
                "Temporarily hold the transaction and escalate it "
                "for immediate analyst review."
            )
        else:
            decision = "Manual Review Recommended"
            priority = "Medium"
            recommended_action = (
                "Hold the transaction for analyst review before approval."
            )

        reason = (
            f"{len(increasing_factors)} of the top contributing features "
            "are increasing the model's fraud risk."
        )

    else:
        decision = "Transaction Appears Legitimate"
        priority = "Low"
        recommended_action = (
            "Allow normal processing while continuing standard monitoring."
        )

        reason = (
            "The model classified the transaction as legitimate and the "
            "overall fraud probability remained below the decision threshold."
        )

    return {
        "decision": decision,
        "priority": priority,
        "reason": reason,
        "recommended_action": recommended_action,
        "fraud_probability_percent": round(
            fraud_probability * 100,
            2
        )
    }