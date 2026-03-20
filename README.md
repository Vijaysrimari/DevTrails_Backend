# AI-Powered Parametric Insurance Platform

Full-stack web application for gig delivery workers to protect weekly income from weather disruptions.

## Tech Stack

- Frontend: React + TailwindCSS + Recharts
- Backend: FastAPI
- ML: Scikit-learn model loaded from `premium_model.pkl`

## Project Structure

```text
frontend/
  src/
    components/
    pages/
    context/
    services/
backend/
  app/
    routes/
    schemas/
    services/
  premium_model.pkl
ml_model/
  premium_model.py
  insurance_premium_data.csv
premium_model.py
insurance_premium_data.csv
```

## Backend Setup

```bash
cd backend
..\.venv\Scripts\python.exe -m pip install -r requirements.txt
..\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env` in `frontend/` from `.env.example`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Core API Endpoints

- `POST /predict`
- `POST /auth/signup`
- `POST /auth/login`
- `GET /admin/analytics`

## Premium Prediction Payload

```json
{
  "rainfall": 50,
  "flood_risk": 3,
  "aqi": 120,
  "disruption_days": 2,
  "worker_income": 4500,
  "zone_risk": 4
}
```

## Notes

- Auth data is stored in `backend/users.json` for demo usage.
- Admin analytics currently uses mock aggregated data to render charts.
- Model training scripts and dataset are available in `ml_model/`.
