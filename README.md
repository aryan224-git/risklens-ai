# RiskLens AI

RiskLens AI is an explainable AI-powered fraud risk analysis platform designed to help payment risk teams identify suspicious transactions, understand model decisions, and take appropriate operational action.

The system combines predictive machine learning, explainable AI, deterministic risk intelligence, and generative AI in a single analyst-focused dashboard.

## Key Features

- Fraud detection using a trained Random Forest classifier
- Fraud probability and confidence scoring
- Low, Medium, and High operational risk classification
- SHAP-based model explainability
- Top risk-increasing and risk-decreasing factors
- Deterministic risk analyst recommendations
- Gemini-powered investigation briefs
- Automatic deterministic fallback when Gemini is unavailable
- FastAPI REST API with Swagger documentation
- Premium React risk operations dashboard
- Backend and model health monitoring
- Dockerized full-stack application

---

## Architecture

```text
Transaction
    |
    v
Random Forest Fraud Model
    |
    +------> Fraud Probability
    |
    +------> Fraud / Legitimate Prediction
    |
    v
SHAP Explainability
    |
    v
Deterministic Risk Engine
    |
    v
Gemini Generative AI Analyst
    |
    v
Investigation Brief
    |
    v
React Risk Operations Dashboard
```

The fraud decision is made by the trained machine-learning model. Gemini is used only to transform grounded model evidence into an analyst-friendly investigation brief.

---

## AI Architecture

RiskLens AI uses multiple AI layers with clearly separated responsibilities.

### 1. Predictive AI

A Random Forest classifier performs the actual fraud prediction.

The model produces:

- Fraud or Legitimate classification
- Fraud probability
- Prediction confidence
- Operational risk level

The generative AI layer does not make or override the fraud prediction.

### 2. Explainable AI

SHAP is used to explain individual model predictions.

The dashboard identifies:

- Features increasing fraud risk
- Features decreasing fraud risk
- Relative contribution of important features

The dataset contains anonymized PCA features named `V1` through `V28`. RiskLens AI therefore does not assign unsupported real-world meanings to these features.

### 3. Deterministic Risk Analyst

A deterministic operational layer converts the model result into an actionable recommendation.

Depending on the model output and risk level, the system can recommend actions such as:

- Allow normal processing
- Manual review
- Escalation or temporary hold for high-risk transactions

This layer also provides a reliable fallback if the generative AI service is unavailable.

### 4. Generative AI Analyst

Google Gemini receives only grounded outputs produced by the fraud analysis pipeline, including:

- Prediction
- Fraud probability
- Risk level
- SHAP factors
- Existing operational recommendation

Gemini converts this evidence into a concise investigation brief for a payment risk analyst.

Gemini does not independently determine whether a transaction is fraudulent.

If Gemini is unavailable, RiskLens AI automatically falls back to the deterministic analyst response.

---

## Model Performance

The Credit Card Fraud Detection dataset contains:

```text
Total transactions:      284,807
Legitimate transactions: 284,315
Fraudulent transactions:     492
Fraud rate:                ~0.17%
```

Baseline Random Forest evaluation:

```text
Fraud Precision: 0.93
Fraud Recall:    0.79
Fraud F1-score:  0.85
ROC-AUC:         ~0.96
```

Because fraud detection is an extremely imbalanced classification problem, accuracy alone is not treated as the primary evaluation metric.

---

## Technology Stack

### Machine Learning

- Python
- Scikit-learn
- Pandas
- SHAP
- Joblib

### Generative AI

- Google Gemini
- Google Gen AI Python SDK

### Backend

- FastAPI
- Pydantic
- Uvicorn

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### DevOps

- Docker
- Docker Compose
- Nginx
- GitHub

---

## Project Structure

```text
risklens-ai/
|
├── backend/
│   ├── api/
│   ├── data/
│   ├── models/
│   ├── reports/
│   ├── services/
│   │   ├── evaluator.py
│   │   ├── explainer.py
│   │   ├── llm_analyst.py
│   │   ├── predictor.py
│   │   ├── risk_analyst.py
│   │   └── trainer.py
│   ├── utils/
│   ├── app.py
│   ├── eda.py
│   ├── train.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── services/
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Environment Variables

Create a local `.env` file in the project root.

You can use `.env.example` as the template:

```env
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_ORIGINS=http://localhost:5173
```

The real `.env` file is excluded from Git and should never be committed.

For the frontend, `frontend/.env.example` contains:

```env
VITE_API_URL=http://127.0.0.1:8000
```

During production deployment, `VITE_API_URL` should point to the deployed backend.

---

## Running the Project Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd risklens-ai
```

### 2. Backend Setup

Create a Python virtual environment:

```bash
python -m venv venv
```

On Windows Git Bash:

```bash
source venv/Scripts/activate
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Create `.env` and configure your Gemini API key if you want the generative analyst functionality.

Start FastAPI:

```bash
uvicorn backend.app:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Running with Docker

Make sure Docker Desktop is running.

Create your root `.env` file with the required environment variables.

Then run:

```bash
docker compose up --build
```

Docker frontend:

```text
http://localhost:3000
```

Docker backend:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

Stop the containers with:

```bash
docker compose down
```

---

## API Endpoints

### Health Check

```text
GET /health
```

Returns the current backend/model status.

### Fraud Prediction

```text
POST /predict
```

The prediction response can contain:

- Prediction
- Fraud probability
- Confidence
- Risk level
- SHAP top factors
- Deterministic analyst summary
- Gemini investigation brief

---

## Example Fraud Analysis

A demonstration fraudulent transaction can produce an output similar to:

```text
Prediction:        Fraud
Fraud Probability: 57%
Confidence:        57%
Risk Level:        Medium

Operational Decision:
Manual Review Recommended
```

Example explanation factors:

```text
Time  -> decreases risk
V14   -> increases risk
V17   -> increases risk
V10   -> increases risk
V4    -> increases risk
```

This demonstrates an important property of the system: RiskLens AI presents both evidence supporting fraud risk and evidence opposing it instead of hiding conflicting model signals.

The Generative AI Analyst then converts this grounded evidence into a concise investigation brief while preserving the model's original decision.

---

## Demo Flow

A recommended demonstration sequence is:

1. Open the RiskLens AI dashboard.
2. Load the Legitimate Sample.
3. Analyze the transaction.
4. Inspect the Legitimate prediction and Low risk result.
5. Review the Risk Analyst recommendation.
6. Review the SHAP explanation.
7. Load the Fraud Sample.
8. Analyze the transaction.
9. Inspect the Fraud prediction and Medium risk result.
10. Review the Manual Review recommendation.
11. Inspect the risk-increasing and risk-decreasing SHAP factors.
12. Review the Gemini-generated investigation brief.
13. Open the FastAPI Swagger documentation.
14. Demonstrate that the complete application can run using Docker.

---

## Development Timeline

### Day 1

Baseline fraud detection model and initial project setup.

### Day 2

Exploratory analysis, class imbalance analysis, and modular ML training pipeline.

### Day 3

FastAPI backend, prediction API, and request validation.

### Day 4

React frontend and premium risk operations dashboard.

### Day 5

SHAP explainability and feature-contribution visualization.

### Day 6

Deterministic Risk Analyst and operational decision support.

### Day 7

Gemini Generative AI integration, Dockerization, environment configuration, deployment preparation, and final submission polish.

---

## Security and Reliability

RiskLens AI follows several important design principles:

- API keys are supplied through environment variables.
- Real secrets are excluded from Git.
- The raw transaction dataset is excluded from the repository.
- Gemini receives only the model evidence required to generate the analyst brief.
- Generative AI does not make the underlying fraud decision.
- SHAP explanations remain grounded in the trained model.
- A deterministic fallback remains available when Gemini cannot be reached.
- The trained model artifact is included so the prediction service can start without retraining the model.

---

## Dataset

RiskLens AI uses the Credit Card Fraud Detection dataset containing anonymized European card transactions.

The raw dataset is intentionally not committed to the repository.

For retraining or evaluation, place:

```text
creditcard.csv
```

inside:

```text
backend/data/
```

The already-trained model artifact is included for running the prediction application without requiring the raw dataset.

---

## Important Design Decision

RiskLens AI intentionally separates prediction from generative reasoning.

```text
Random Forest
      |
      | makes prediction
      v
SHAP
      |
      | explains prediction
      v
Risk Engine
      |
      | determines operational recommendation
      v
Gemini
      |
      | communicates grounded evidence
      v
Risk Analyst
```

This prevents the language model from independently deciding whether a financial transaction is fraudulent while still using generative AI to improve analyst usability.

---

## Disclaimer

RiskLens AI is a demonstration and buildathon project.

It should not be used for real financial authorization or fraud-blocking decisions without additional:

- Model validation
- Security controls
- Bias and drift monitoring
- Production observability
- Compliance review
- Human oversight