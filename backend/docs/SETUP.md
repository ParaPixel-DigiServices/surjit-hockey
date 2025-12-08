# Development Setup Guide

## Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher

---

## Backend Setup

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Create virtual environment

```bash
python -m venv .venv
```

### 3. Activate virtual environment

**Windows:**

```bash
.venv\Scripts\activate
```

**Linux/Mac:**

```bash
source .venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure environment

Create `.env` file in backend directory:

```env
# Database
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/surjit_hockey

# Security
SECRET_KEY=your-secret-key-here-generate-with-openssl
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

To generate a secure SECRET_KEY:

```bash
openssl rand -hex 32
```

### 6. Create database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE surjit_hockey CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 7. Run migrations

```bash
python migrations/add_core_committee.py
python migrations/add_dedicated_team.py
```

### 8. Create admin user

```bash
python -c "
from app.core.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

db = SessionLocal()
admin = User(
    username='admin',
    email='admin@example.com',
    hashed_password=get_password_hash('your_password'),
    is_superuser=True,
    is_active=True
)
db.add(admin)
db.commit()
print('Admin user created!')
"
```

### 9. Start development server

```bash
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: http://localhost:8000

API documentation: http://localhost:8000/docs

---

## Frontend Setup

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create `.env` file in frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

### 4. Start development server

```bash
npm run dev
```

Frontend will be available at: http://localhost:5173

---

## Project Structure

```
surjit-hockey/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/          # API route handlers
│   │   ├── core/            # Config, database, security
│   │   ├── models/          # SQLAlchemy models
│   │   └── schemas/         # Pydantic schemas
│   ├── migrations/          # Database migrations
│   ├── docs/               # Backend documentation
│   ├── uploads/            # User uploaded files
│   ├── .env                # Environment variables
│   ├── requirements.txt    # Python dependencies
│   └── README.md
│
└── frontend/
    ├── public/
    │   └── images/         # Static images
    ├── src/
    │   ├── assets/         # React assets
    │   ├── components/     # React components
    │   ├── config/         # App configuration
    │   ├── pages/          # Page components
    │   └── utils/          # Utility functions
    ├── .env                # Environment variables
    ├── package.json
    └── README.md
```

---

## Common Commands

### Backend

```bash
# Run development server
uvicorn app.main:app --reload

# Run on different port
uvicorn app.main:app --reload --port 8080

# Create migration
python migrations/create_migration.py

# Access Python shell with app context
python -c "from app.core.database import SessionLocal; db = SessionLocal()"
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Troubleshooting

### Database Connection Issues

- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists
- Check firewall settings

### CORS Errors

- Verify `ALLOWED_ORIGINS` in backend `.env`
- Check frontend API URL configuration
- Ensure both servers are running

### Import Errors (Backend)

- Activate virtual environment
- Reinstall dependencies: `pip install -r requirements.txt`
- Check Python version: `python --version`

### Module Not Found (Frontend)

- Clear node_modules: `rm -rf node_modules`
- Clear package-lock: `rm package-lock.json`
- Reinstall: `npm install`

---

## Production Deployment

### Backend

1. Set production environment variables
2. Use production-grade server (Gunicorn, uWSGI)
3. Set up reverse proxy (Nginx)
4. Enable HTTPS
5. Set `DEBUG=False`

### Frontend

1. Build production bundle: `npm run build`
2. Serve `dist` folder with web server
3. Configure environment variables
4. Enable gzip compression
5. Set up CDN for static assets

---

## Testing

### Backend

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_endpoints.py

# Run with coverage
pytest --cov=app tests/
```

### Frontend

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

---

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Vite Documentation](https://vitejs.dev/)
