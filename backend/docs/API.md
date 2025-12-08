# API Documentation

Base URL: `http://localhost:8000/api/v1`

## Authentication

### Login

```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=admin&password=your_password
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Get Current User

```http
GET /auth/me
Authorization: Bearer {access_token}
```

**Response:**

```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "is_active": true,
  "is_superuser": true
}
```

---

## Tournaments

### Get All Tournaments

```http
GET /tournaments
```

**Response:**

```json
[
  {
    "id": 1,
    "edition": "33rd",
    "year": 2024,
    "title": "IndianOil Servo Surjit Hockey Tournament",
    "sponsor": "IndianOil Servo",
    "start_date": "2024-10-15",
    "end_date": "2024-10-25",
    "venue": "Surjit Hockey Stadium",
    "teams_count": 12,
    "prize_money": "5,00,000",
    "status": "completed"
  }
]
```

### Get Tournament by ID

```http
GET /tournaments/{id}
```

### Create Tournament (Admin Only)

```http
POST /tournaments
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "edition": "34th",
  "year": 2025,
  "title": "IndianOil Servo Surjit Hockey Tournament",
  "sponsor": "IndianOil Servo",
  "start_date": "2025-10-15",
  "end_date": "2025-10-25",
  "venue": "Surjit Hockey Stadium",
  "teams_count": 12,
  "prize_money": "5,00,000",
  "status": "upcoming"
}
```

### Update Tournament (Admin Only)

```http
PUT /tournaments/{id}
Authorization: Bearer {access_token}
```

### Delete Tournament (Admin Only)

```http
DELETE /tournaments/{id}
Authorization: Bearer {access_token}
```

---

## News

### Get All News

```http
GET /news?skip=0&limit=10
```

**Query Parameters:**

- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Number of records to return (default: 10)

**Response:**

```json
[
  {
    "id": 1,
    "title": "Tournament Registration Opens",
    "content": "Registration for the 34th edition is now open...",
    "category": "announcement",
    "author": "Admin",
    "published_date": "2024-08-01T10:00:00",
    "image_url": "/uploads/news/image.jpg",
    "is_featured": true
  }
]
```

### Get News by ID

```http
GET /news/{id}
```

### Create News (Admin Only)

```http
POST /news
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "New Tournament Announcement",
  "content": "We are excited to announce...",
  "category": "announcement",
  "author": "Admin",
  "published_date": "2024-08-01T10:00:00",
  "is_featured": true
}
```

### Update News (Admin Only)

```http
PUT /news/{id}
Authorization: Bearer {access_token}
```

### Delete News (Admin Only)

```http
DELETE /news/{id}
Authorization: Bearer {access_token}
```

---

## Teams

### Get All Teams

```http
GET /teams
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Punjab Police",
    "coach": "Harjeet Singh",
    "captain": "Manpreet Singh",
    "year": 2024,
    "tournament_id": 1
  }
]
```

### Get Team by ID

```http
GET /teams/{id}
```

### Create Team (Admin Only)

```http
POST /teams
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "Indian Army",
  "coach": "Rajesh Kumar",
  "captain": "Simranjeet Singh",
  "year": 2024,
  "tournament_id": 1
}
```

---

## Committee

### Get Core Committee Members

```http
GET /core-committee
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Dr. Rajinder Singh",
    "role": "President",
    "description": "Leading the tournament organization...",
    "image_url": "/images/core-committee/core_committee_1.jpg",
    "display_order": 1
  }
]
```

### Get Dedicated Team Members

```http
GET /dedicated-team
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Mr. Varinder Kumar Sharma, IAS",
    "role": "Deputy Commissioner, Jalandhar",
    "image_url": "/images/dedicated-team/1-760.JPG",
    "display_order": 1
  }
]
```

---

## Content Pages

### Get Page Content

```http
GET /content/{page_name}
```

**Example:**

```http
GET /content/about-tournament
```

**Response:**

```json
{
  "id": 1,
  "page_name": "about-tournament",
  "title": "About the Tournament",
  "content": "The Surjit Hockey Tournament...",
  "meta_description": "Learn about India's premier hockey tournament"
}
```

### Update Page Content (Admin Only)

```http
PUT /content/{page_name}
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "About the Tournament",
  "content": "Updated content...",
  "meta_description": "New description"
}
```

---

## Additional Content

### Get Sponsors

```http
GET /sponsors
```

### Get Patrons

```http
GET /patrons
```

### Get Advisors

```http
GET /advisors
```

---

## Error Responses

### 401 Unauthorized

```json
{
  "detail": "Not authenticated"
}
```

### 403 Forbidden

```json
{
  "detail": "Not enough permissions"
}
```

### 404 Not Found

```json
{
  "detail": "Item not found"
}
```

### 422 Validation Error

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## File Uploads

### Upload Image

```http
POST /upload/image
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

file: [binary]
```

**Response:**

```json
{
  "url": "/uploads/images/filename.jpg"
}
```

---

## Notes

- All dates are in ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`
- All endpoints requiring authentication need `Authorization: Bearer {token}` header
- Protected endpoints (POST, PUT, DELETE) require admin authentication
- Image URLs are relative paths served from the frontend public directory
