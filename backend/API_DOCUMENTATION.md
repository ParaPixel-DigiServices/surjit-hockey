# API Documentation

## Quick Start Guide

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ParaPixel-DigiServices/surjit-hockey.git
   cd surjit-hockey/backend
   ```

2. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the server**

   ```bash
   uvicorn app.main:app --reload
   ```

   API will be available at `http://localhost:8000`

## API Endpoints

### Base URL

```
http://localhost:8000/api/v1
```

### Tournament Endpoints

#### Get All Tournaments

```http
GET /tournaments?skip=0&limit=100
```

**Response:**

```json
[
  {
    "id": 1,
    "event_name": "38th Surjit Hockey Tournament",
    "event_year": 2025,
    "start_date": "2025-11-15",
    "end_date": "2025-11-25",
    "venue": "Surjit Hockey Stadium, Jalandhar",
    "description": "Annual Grade-I Hockey Tournament",
    "status": true,
    "date_created": "2025-01-01T00:00:00"
  }
]
```

#### Get Tournament by ID

```http
GET /tournaments/{id}
```

#### Get Tournament Fixtures

```http
GET /tournaments/{id}/fixtures?category=Men
```

**Query Parameters:**

- `category` (optional): Filter by Men/Women

#### Get Tournament Results

```http
GET /tournaments/{id}/results
```

### Team Endpoints

#### Get All Teams

```http
GET /teams?skip=0&limit=100
```

**Response:**

```json
[
  {
    "id": 1,
    "team_name": "Indian Navy",
    "team_code": "NAVY",
    "logo": "teams/navy.png",
    "description": "Indian Navy Hockey Team",
    "status": true
  }
]
```

#### Get Team by ID

```http
GET /teams/{id}
```

#### Get Team Players

```http
GET /teams/{id}/players
```

### Content Endpoints

#### Get Gallery

```http
GET /gallery?skip=0&limit=50
```

#### Get Gallery Item

```http
GET /gallery/{id}
```

#### Get Gallery Album Images

```http
GET /gallery/{id}/images
```

#### Get Memories

```http
GET /memories?skip=0&limit=50
```

#### Create Memory (Authenticated)

```http
POST /memories
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 1,
  "caption": "Great memories from tournament",
  "description": "Wonderful experience playing in 2024 tournament",
  "image_name": "memory.jpg"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "detail": "Username already registered"
}
```

### 401 Unauthorized

```json
{
  "detail": "Could not validate credentials"
}
```

### 404 Not Found

```json
{
  "detail": "Tournament not found"
}
```

### 422 Validation Error

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

## Pagination

List endpoints support pagination:

**Query Parameters:**

- `skip`: Number of records to skip (default: 0)
- `limit`: Maximum records to return (default: varies by endpoint)

**Example:**

```http
GET /tournaments?skip=10&limit=20
```

## Interactive Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/docs

  - Interactive API documentation
  - Try endpoints directly in browser
  - View request/response schemas

- **ReDoc**: http://localhost:8000/redoc
  - Alternative documentation view
  - More detailed descriptions

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production deployment.

## CORS

CORS is configured to allow requests from:

- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (Alternative dev server)

Update `CORS_ORIGINS` in `.env` for production.

## Database Schema

### Users & Authentication

- `alumni_user_register` - User accounts
- `alumni_user_personal_details` - User profiles
- `alumni_user_sports_details` - Sports background

### Tournaments

- `hockey_event_master` - Tournament events
- `hockey_fixture_master` - Match fixtures
- `hockey_match_results` - Match results
- `hockey_category_master` - Categories

### Teams

- `hockey_teams` - Team information
- `hockey_alumni_master` - Players

### Content

- `hockey_banner` - Banner images
- `alumni_gallery` - Photo galleries
- `alumni_memory` - Memory posts

## Environment Variables

```env
DATABASE_URL=mysql+pymysql://user:pass@localhost:3306/db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:5173
APP_NAME=Surjit Hockey API
DEBUG=True
API_VERSION=v1
```

## Production Deployment

### Security Checklist

- [ ] Set `DEBUG=False`
- [ ] Use strong `SECRET_KEY`
- [ ] Configure production database
- [ ] Update `CORS_ORIGINS`
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Configure logging
- [ ] Set up monitoring

### Running with Gunicorn

```bash
gunicorn app.main:app \
  -w 4 \
  -k uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

## Support

For questions or issues:

- Check interactive docs at `/docs`
- Review this documentation
- Contact development team

---

**Version**: 1.0.0  
**Last Updated**: November 2025
