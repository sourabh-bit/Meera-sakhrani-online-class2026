# Deployment

This repo is ready for Render as a two-service app:

1. `meera-masterclass-api` is the FastAPI backend.
2. `meera-masterclass-web` is the React frontend static site.

## Deploy on Render

1. Push this repo to GitHub.
2. In Render, create a new Blueprint and point it at the repo.
3. Let Render create both services from [`render.yaml`](./render.yaml).
4. Render will set `REACT_APP_BACKEND_URL` on the frontend and `CORS_ORIGINS` on the backend for you.
5. After the first deploy, confirm both services are healthy and the frontend can reach the backend.

## Important settings

- Backend start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- Frontend build command: `yarn install --frozen-lockfile && yarn build`
- Frontend SPA routing: Render rewrites all paths to `/index.html`

## Local dev

- Backend: run FastAPI from `backend/server.py`
- Frontend: run the CRA app from `frontend`
