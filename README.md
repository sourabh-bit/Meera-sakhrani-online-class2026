# Deployment

This repo now uses:

- `Render` for the FastAPI backend
- `Vercel` for the React frontend

## Backend on Render

1. Create a Render Web Service from the `backend` folder.
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. Add these environment variables:
   - `ADMIN_PASSCODE`
   - `UPI_ID`
   - `UPI_PAYEE_NAME`
   - `BOOKING_AMOUNT`
   - `MONGO_URL`
   - `DB_NAME`
   - `CORS_ORIGINS` with your Vercel production URL, for example `https://meera-masterclass-web.vercel.app`

If you want preview deployments to work too, set:

- `CORS_ORIGIN_REGEX = https://.*\.vercel\.app`

## Frontend on Vercel

1. Create a Vercel project from the `frontend` folder.
2. Set this environment variable in Vercel:
   - `REACT_APP_BACKEND_URL` = your Render backend URL, for example `https://meera-sakhrani-online-class2026.onrender.com`
3. Redeploy after setting the environment variable, because CRA reads it at build time.

## SPA routing

The frontend has a Vercel rewrite so routes like `/admin` load the app first and then React Router handles them.
