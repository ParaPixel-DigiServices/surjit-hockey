# Surjit Hockey Tournament Website

A modern full-stack web application for managing the Surjit Hockey Tournament, featuring tournament management, team information, player profiles, galleries, and news updates.

## Project Overview

The Surjit Hockey Tournament is India's Grade-I hockey tournament, organized annually in Jalandhar, Punjab. This application provides:

- **Frontend**: React-based modern UI with animations (Framer Motion)
- **Backend**: FastAPI-powered REST API
- **Database**: MySQL database for data persistence

## Project Structure

```
surjit-hockey/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets (images, icons)
│   └── package.json
│
├── backend/                # FastAPI backend application
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── core/          # Core functionality (config, security)
│   │   └── main.py        # Application entry point
│   └── requirements.txt
│
└── README.md
```

## Features

### Frontend Features

- 🏠 **Home Page**: Hero section, trending news, match schedule, gallery, messages
- 📋 **Tournament Info**: Tournament details, participating teams, fixtures, results
- 👥 **Teams**: Team profiles with logos and information
- 📊 **Results & Statistics**: Match results, points tables, tournament history
- 📰 **News**: Latest updates and trending articles
- 🖼️ **Gallery**: Photo galleries from tournaments and events
- ℹ️ **About**: Information about the tournament and organization

### Backend Features

- 🔐 **Authentication**: JWT-based user authentication
- 🏆 **Tournament Management**: CRUD operations for tournaments, matches, fixtures
- 👥 **Team Management**: Team information, player rosters
- 📊 **Statistics**: Match results, points tables, player statistics
- 📰 **Content Management**: News articles, galleries, memories
- 👤 **User Profiles**: Alumni registration and profile management

## Tech Stack

### Frontend

- **React** 19.2.0 - UI library
- **React Router** 7.9.5 - Routing
- **Framer Motion** 12.23.24 - Animations
- **Tailwind CSS** 4.1.17 - Styling
- **Vite** 7.2.2 - Build tool
- **Lucide React** - Icons

### Backend

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **MySQL** - Database
- **JWT** - Authentication
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- MySQL 5.7+

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend API will run on `http://localhost:8000`

API documentation available at `http://localhost:8000/docs`

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/surjit_hockey

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Application
DEBUG=True
```

## Database Schema

The application uses the following main tables:

- **Users & Authentication**

  - `alumni_user_register` - User accounts
  - `alumni_user_personal_details` - Personal information
  - `alumni_user_professional_details` - Professional details
  - `alumni_user_sports_details` - Sports background

- **Content Management**

  - `hockey_banner` - Banner images
  - `hockey_advertisements` - Advertisements
  - `alumni_gallery` - Photo galleries
  - `alumni_memory` - Memory posts

- **Tournament Management**

  - `hockey_event_master` - Tournament events
  - `hockey_fixture_master` - Match fixtures
  - `hockey_category_master` - Categories (Men/Women)
  - `hockey_capacity_master` - Team capacities

- **Teams & Players**
  - `hockey_alumni_master` - Alumni/player information
  - Team-related data stored in various tables

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Tournaments

- `GET /api/tournaments` - List all tournaments
- `GET /api/tournaments/{id}` - Get tournament details
- `GET /api/tournaments/{id}/fixtures` - Get tournament fixtures
- `GET /api/tournaments/{id}/results` - Get tournament results

### Teams

- `GET /api/teams` - List all teams
- `GET /api/teams/{id}` - Get team details
- `GET /api/teams/{id}/players` - Get team players

### Content

- `GET /api/news` - List news articles
- `GET /api/gallery` - Get gallery images
- `GET /api/memories` - Get memory posts

### User Profile

- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

See full API documentation at `/docs` when running the backend.

## Development

### Code Style

- Frontend: ESLint + Prettier
- Backend: Black + isort

### Running Tests

```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
pytest
```

## Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
```

### Backend (Railway/Render/DigitalOcean)

```bash
cd backend
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Contact

For queries contact: [Add contact information]

---

**Note**: This is a professional tournament management system. Handle all data with care and maintain confidentiality.
