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
GET /api/v1/tournaments?skip=0&limit=100
```

**Response:**

```json
[
  {
    "id": 100,
    "event_title": "DAY4 1",
    "description": "",
    "event_image": "100-950.JPG",
    "status": true,
    "date_created": "2024-10-22T04:27:26",
    "date_updated": null
  }
]
```

#### Get Tournament by ID

```http
GET /api/v1/tournaments/{id}
```

**Response:**

```json
{
  "id": 100,
  "event_title": "DAY4 1",
  "description": "",
  "event_image": "100-950.JPG",
  "status": true,
  "date_created": "2024-10-22T04:27:26",
  "date_updated": null
}
```

#### Get Tournament Fixtures

```http
GET /api/v1/tournaments/{id}/fixtures
```

**Response:**

```json
[
  {
    "id": 1,
    "year_id": 100,
    "date_match": "2024-10-22T10:00:00",
    "match_name": "Pool A Match 1",
    "pool_category_type": 1,
    "match_no": 1,
    "pool_type": 1,
    "team_id_1": 22,
    "team_id_2": 25,
    "winner_id": 0,
    "match_status": false
  }
]
```

#### Get Tournament Results

```http
GET /api/v1/tournaments/{id}/results
```

### Team Endpoints

#### Get All Teams

```http
GET /api/v1/teams?skip=0&limit=100
```

**Response:**

```json
[
  {
    "id": 22,
    "team_name": "Army-XI Delhi",
    "team_name_short": "ARMY",
    "team_logo": "22.png",
    "team_coach": "",
    "team_manager": "",
    "team_type": 0,
    "status": true
  }
]
```

#### Get Team by ID

```http
GET /api/v1/teams/{id}
```

**Response:**

```json
{
  "id": 22,
  "team_name": "Army-XI Delhi",
  "team_name_short": "ARMY",
  "team_logo": "22.png",
  "team_coach": "",
  "team_manager": "",
  "team_type": 0,
  "status": true
}
```

### Content Endpoints

#### Get Gallery

```http
GET /api/v1/content/gallery?skip=0&limit=50
```

**Response:**

```json
[
  {
    "id": 43,
    "image_name": "43-243.JPG",
    "title": "40th Indian Oil Servo Surjit Hockey Tournament Day 4",
    "parent_image": 0,
    "date_created": "2024-10-22T04:21:01",
    "status": true
  }
]
```

#### Get Memories

```http
GET /api/v1/content/memories?skip=0&limit=50
```

**Response:**

```json
[
  {
    "id": 38,
    "user_id": 114,
    "caption": "Ashaley Kaur Visit",
    "description": "Fitness & Bhangra by Ashley Kaur Reen Season",
    "image_name": "38-460.JPG",
    "date_created": "2022-06-25T22:24:01",
    "status": true
  }
]
```

#### Create Memory

```http
POST /api/v1/content/memories
Content-Type: application/json

{
  "user_id": 114,
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

### Tournaments

- `hockey_event_master` - Tournament events
- `hockey_fixture_master` - Match fixtures
- `hockey_match_results` - Match results

### Teams

- `hockey_team_master` - Team information

### Content

- `hockey_gallery` - Photo galleries
- `alumni_memory` - Memory posts

### Users

- `alumni_user_register` - User accounts

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
