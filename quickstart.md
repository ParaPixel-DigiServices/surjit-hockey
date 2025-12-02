# Quickstart Guide

> Step 1: Start the MySQL server with XAMPP, then:

## For Prod

### Terminal 1:
```bash
cd backend; .venv\Scripts\python -m uvicorn app.main:app --reload --port 8000
```

### Terminal 2:
```bash
ngrok http 8000
```

## For Dev

### Terminal 1:
```bash
cd frontend;npm run dev
```

### Terminal 2:
```bash
cd backend; .venv\Scripts\python -m uvicorn app.main:app --reload --port 8000
```