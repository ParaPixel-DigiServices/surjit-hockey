# Quickstart Guide

## For Prod

### Terminal 1:
```bash
uvicorn app.main:app --reload --port 8000
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
uvicorn app.main:app --reload --port 8000
```