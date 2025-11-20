# Surjit Hockey - Quick Setup Guide

## What You Have Now

A complete FastAPI backend for the Surjit Hockey Tournament website with:

✅ **Full project documentation** (main README.md)
✅ **Backend structure** with models, schemas, and API routes
✅ **Authentication system** (JWT-based)
✅ **Tournament management** (tournaments, fixtures, results)
✅ **Team management** (teams, players)
✅ **Content management** (banners, gallery, memories)
✅ **API documentation** (detailed endpoint guide)

## Project Structure

```
surjit-hockey/
├── frontend/               # React frontend (already exists)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
│
├── backend/               # FastAPI backend (NEW)
│   ├── app/
│   │   ├── api/          # API routes
│   │   │   ├── v1/
│   │   │   │   ├── auth.py
│   │   │   │   ├── tournaments.py
│   │   │   │   ├── teams.py
│   │   │   │   └── content.py
│   │   │   └── deps.py
│   │   ├── core/         # Configuration & utilities
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/       # Database models
│   │   │   ├── user.py
│   │   │   ├── tournament.py
│   │   │   ├── team.py
│   │   │   └── content.py
│   │   ├── schemas/      # Pydantic schemas
│   │   │   ├── user.py
│   │   │   ├── tournament.py
│   │   │   ├── team.py
│   │   │   └── content.py
│   │   └── main.py       # Application entry
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
└── README.md             # Main project documentation
```

## Next Steps

### 1. Setup Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials
```

### 2. Configure Database

Create `.env` file with your settings:

```env
DATABASE_URL=mysql+pymysql://root:yourpassword@localhost:3306/surjit_hockey
SECRET_KEY=generate-a-strong-secret-key-here
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**To generate a secret key:**

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3. Setup MySQL Database

```sql
-- Create database
CREATE DATABASE surjit_hockey CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- You can import your existing backup or let the models create tables
```

### 4. Run the Backend

```bash
# Make sure you're in the backend directory with venv activated
uvicorn app.main:app --reload
```

The API will be available at:

- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 5. Test the API

Open http://localhost:8000/docs in your browser to see interactive API documentation.

Try the health check:

```bash
curl http://localhost:8000/health
```

### 6. Connect Frontend to Backend

Update your frontend API calls to point to `http://localhost:8000/api/v1`

Example (in frontend):

```javascript
// Create an API client
const API_BASE = "http://localhost:8000/api/v1";

// Fetch tournaments
const response = await fetch(`${API_BASE}/tournaments`);
const tournaments = await response.json();
```

## Key Features

### 🔐 Authentication

- User registration and login
- JWT token-based auth
- Password hashing with bcrypt

### 🏆 Tournaments

- List all tournaments
- Tournament details
- Fixtures by tournament
- Match results

### 👥 Teams

- List all teams
- Team details
- Team player rosters

### 📸 Content

- Banners for homepage
- Photo galleries with albums
- Memory posts (user-generated)

## API Endpoints Quick Reference

### Authentication

- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user

### Tournaments

- `GET /api/v1/tournaments` - List tournaments
- `GET /api/v1/tournaments/{id}` - Get tournament
- `GET /api/v1/tournaments/{id}/fixtures` - Get fixtures
- `GET /api/v1/tournaments/{id}/results` - Get results

### Teams

- `GET /api/v1/teams` - List teams
- `GET /api/v1/teams/{id}` - Get team
- `GET /api/v1/teams/{id}/players` - Get players

### Content

- `GET /api/v1/banners` - Get banners
- `GET /api/v1/gallery` - Get gallery
- `GET /api/v1/memories` - Get memories
- `POST /api/v1/memories` - Create memory (auth required)

## Troubleshooting

### Port Already in Use

```powershell
# Find process using port 8000
netstat -ano | findstr :8000
# Kill the process
taskkill /PID <PID> /F
```

### Database Connection Error

- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

### Import Errors

- Make sure virtual environment is activated
- Reinstall requirements: `pip install -r requirements.txt`

## Development Tips

1. **Auto-reload**: The `--reload` flag enables auto-reload on code changes

2. **Interactive Docs**: Use `/docs` endpoint to test API without writing code

3. **Database Inspection**: Use MySQL Workbench or phpMyAdmin to inspect database

4. **Logging**: Check console output for errors and logs

## Production Checklist

Before deploying to production:

- [ ] Set `DEBUG=False` in `.env`
- [ ] Use strong `SECRET_KEY`
- [ ] Configure production database
- [ ] Update `CORS_ORIGINS`
- [ ] Set up HTTPS
- [ ] Configure proper logging
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Create database backups

## Documentation

- **Main README**: `/README.md` - Project overview
- **Backend README**: `/backend/README.md` - Backend details
- **API Docs**: `/backend/API_DOCUMENTATION.md` - API reference
- **Interactive Docs**: http://localhost:8000/docs (when running)

## Need Help?

1. Check the documentation files
2. Visit http://localhost:8000/docs for interactive API exploration
3. Review error messages in console
4. Check database connection and credentials

---

**You're all set!** 🎉

Start the backend server and begin integrating with your frontend.

**Command to start:**

```bash
cd backend
venv\Scripts\activate  # Windows
uvicorn app.main:app --reload
```
