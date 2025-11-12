# Surjit Hockey Backend API

FastAPI-based REST API for the Surjit Hockey Tournament management system.

## Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update with your configuration:

```bash
cp .env.example .env
```

### 4. Setup Database

```bash
# Create database
mysql -u root -p
CREATE DATABASE surjit_hockey;

# Run migrations
alembic upgrade head
```

### 5. Run Development Server

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── app/
│   ├── api/              # API routes
│   │   └── v1/          # API version 1
│   │       ├── tournaments.py
│   │       ├── teams.py
│   │       └── content.py
│   │
│   ├── core/            # Core functionality
│   │   ├── __init__.py  # Database dependency
│   │   ├── config.py    # Configuration
│   │   └── database.py  # Database connection
│   │
│   ├── models/          # SQLAlchemy models
│   │   ├── tournament.py
│   │   ├── team.py
│   │   ├── content.py
│   │   └── user.py
│   │
│   ├── schemas/         # Pydantic schemas
│   │   ├── tournament.py
│   │   ├── team.py
│   │   ├── content.py
│   │   └── user.py
│   │
│   └── main.py          # Application entry point
│
├── tests/               # Test scripts
│   ├── test_endpoints.py
│   ├── test_db.py
│   └── test_api.ps1
├── requirements.txt
├── .env
├── .gitignore
├── API_DOCUMENTATION.md
└── README.md
```

## Key Features

### Tournament Management

- List all tournaments
- Get tournament details
- View tournament fixtures
- Access match results

### Team Management

- List all teams
- Get team details
- Team information and statistics

### Content Management

- Photo gallery
- Memory posts from alumni

## API Endpoints Overview

### Tournaments (`/api/v1/tournaments`)

- `GET /` - List all tournaments
- `GET /{id}` - Get tournament details
- `GET /{id}/fixtures` - Get tournament fixtures
- `GET /{id}/results` - Get tournament results

### Teams (`/api/v1/teams`)

- `GET /` - List all teams
- `GET /{id}` - Get team details

### Content (`/api/v1/content`)

- `GET /gallery` - Get gallery items
- `GET /memories` - Get memory posts
- `POST /memories` - Create new memory post
- `GET /{id}` - Get article details
- `GET /trending` - Get trending news

### Gallery (`/api/v1/gallery`)

- `GET /` - List gallery albums
- `GET /{id}` - Get album details
- `GET /{id}/images` - Get album images

### Memories (`/api/v1/memories`)

- `GET /` - List memory posts
- `POST /` - Create memory post (authenticated)
- `GET /{id}` - Get memory details

## Database Models

### Data Models

**Tournament Models**

- `Tournament` - Tournament events from `hockey_event_master`
- `Fixture` - Match fixtures from `hockey_fixture_master`
- `MatchResult` - Match results from `hockey_match_results`
- `Category` - Tournament categories from `hockey_category_master`

**Team Models**

- `Team` - Team information from `hockey_team_master`

**Content Models**

- `Gallery` - Photo galleries from `hockey_gallery`
- `Memory` - Memory posts from `alumni_memory`

**User Models**

- `User` - User accounts from `alumni_user_register`

## Development

### Running Tests

```bash
# Run comprehensive endpoint tests
python tests/test_endpoints.py

# Test database connection
python tests/test_db.py

# PowerShell test script
.\tests\test_api.ps1
```

## Production Deployment

### Environment Variables

Ensure all production environment variables are set:

- Set `DEBUG=False`
- Use strong `SECRET_KEY`
- Configure production database URL
- Set appropriate `CORS_ORIGINS`

### Running with Gunicorn

```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker Deployment

```bash
docker build -t surjit-hockey-api .
docker run -p 8000:8000 --env-file .env surjit-hockey-api
```

## Security Considerations

- CORS is configured for specific origins
- Input validation using Pydantic
- SQL injection protection via SQLAlchemy ORM
- Proper handling of MySQL zero dates

## Troubleshooting

### Database Connection Issues

- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists

### Import Errors

- Verify all dependencies are installed
- Check Python version (3.9+)

### Port Already in Use

```bash
# Kill process using port 8000
# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

## Contributing

Follow PEP 8 style guide and ensure all tests pass before submitting PRs.

## Support

For issues and questions, please contact the development team.
