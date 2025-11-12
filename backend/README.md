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
│   │   ├── v1/          # API version 1
│   │   │   ├── auth.py  # Authentication endpoints
│   │   │   ├── tournaments.py
│   │   │   ├── teams.py
│   │   │   ├── news.py
│   │   │   └── gallery.py
│   │   └── deps.py      # Dependencies (auth, db)
│   │
│   ├── core/            # Core functionality
│   │   ├── config.py    # Configuration
│   │   ├── security.py  # Security utilities
│   │   └── database.py  # Database connection
│   │
│   ├── models/          # SQLAlchemy models
│   │   ├── user.py
│   │   ├── tournament.py
│   │   ├── team.py
│   │   └── content.py
│   │
│   ├── schemas/         # Pydantic schemas
│   │   ├── user.py
│   │   ├── tournament.py
│   │   ├── team.py
│   │   └── content.py
│   │
│   ├── crud/            # CRUD operations
│   │   ├── user.py
│   │   ├── tournament.py
│   │   └── team.py
│   │
│   └── main.py          # Application entry point
│
├── alembic/             # Database migrations
├── tests/               # Test files
├── requirements.txt
├── .env.example
└── README.md
```

## Key Features

### Authentication

- JWT-based authentication
- Secure password hashing with bcrypt
- Token refresh mechanism

### Tournament Management

- Create, read, update tournaments
- Manage fixtures and match schedules
- Track results and statistics

### Team Management

- Team profiles and information
- Player rosters
- Team statistics

### Content Management

- News articles
- Photo galleries
- Memory posts

## API Endpoints Overview

### Authentication (`/api/v1/auth`)

- `POST /register` - Register new user
- `POST /login` - User login (returns JWT token)
- `POST /refresh` - Refresh access token
- `GET /me` - Get current user info

### Tournaments (`/api/v1/tournaments`)

- `GET /` - List all tournaments
- `GET /{id}` - Get tournament details
- `GET /{id}/fixtures` - Get tournament fixtures
- `GET /{id}/teams` - Get participating teams
- `GET /{id}/results` - Get tournament results

### Teams (`/api/v1/teams`)

- `GET /` - List all teams
- `GET /{id}` - Get team details
- `GET /{id}/players` - Get team roster

### News (`/api/v1/news`)

- `GET /` - List news articles
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

### User Models

- `User` - User authentication and basic info
- `UserProfile` - Extended user profile
- `UserSportsDetails` - Sports background

### Tournament Models

- `Tournament` - Tournament information
- `Fixture` - Match fixtures
- `Result` - Match results
- `Category` - Men/Women categories

### Team Models

- `Team` - Team information
- `Player` - Player profiles

### Content Models

- `News` - News articles
- `Gallery` - Photo albums
- `GalleryImage` - Individual images
- `Memory` - Memory posts

## Development

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
# Format code
black app/

# Sort imports
isort app/
```

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
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

- All passwords are hashed using bcrypt
- JWT tokens expire after configured time
- CORS is configured for specific origins
- Input validation using Pydantic
- SQL injection protection via SQLAlchemy ORM

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
