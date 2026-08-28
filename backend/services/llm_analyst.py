import os

from google import genai


def generate_ai_analysis(
    prediction,
    fraud_probability,
    risk_level,
    top_factors,
    analyst_summary
):
    api_key = os.getenv("GEMINI_API_KEY")

    # Safe fallback when Gemini is not configured
    if not api_key:
        return {
            "available": False,
            "summary": analyst_summary["reason"],
            "recommended_next_step": analyst_summary[
                "recommended_action"
            ],
            "source": "deterministic_fallback"
        }

    factors_text = "\n".join(
        [
            (
                f"- {factor['feature']}: "
                f"{factor['direction']} "
                f"(SHAP impact: {factor['impact']})"
            )
            for factor in top_factors
        ]
    )

    prompt = f"""
You are assisting a payment fraud risk analyst.

You must use ONLY the supplied model evidence.

Do not invent meanings for anonymized PCA features V1-V28.
Do not claim that a specific PCA feature means location,
device, merchant type, customer behavior, or any other
real-world characteristic.

The fraud decision has already been made by a machine
learning model. Your job is only to summarize its evidence.

Prediction: {prediction}

Fraud probability:
{fraud_probability * 100:.2f}%

Risk level:
{risk_level}

Top SHAP factors:
{factors_text}

Existing operational decision:
{analyst_summary["decision"]}

Existing recommendation:
{analyst_summary["recommended_action"]}

Write a concise payment-risk analyst brief.

Requirements:
1. Explain the overall risk in 2-3 sentences.
2. Mention the strongest supporting and counter-risk evidence.
3. State the recommended operational next step.
4. Do not override the machine-learning prediction.
5. Do not invent information that is not supplied.
"""

    try:
        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt
        )

        if not response.text:
            raise ValueError("Gemini returned an empty response")

        return {
            "available": True,
            "summary": response.text.strip(),
            "recommended_next_step": analyst_summary[
                "recommended_action"
            ],
            "source": "gemini"
        }

    except Exception as error:
        print(f"Gemini unavailable: {error}")

        return {
            "available": False,
            "summary": analyst_summary["reason"],
            "recommended_next_step": analyst_summary[
                "recommended_action"
            ],
            "source": "deterministic_fallback"
        }