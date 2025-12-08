# Surjit Hockey Tournament Website

A comprehensive web application for managing and showcasing the annual IndianOil Servo Surjit Hockey Tournament - one of India's premier Grade-I hockey tournaments.

## 🏑 About

The Surjit Hockey Tournament is an annual event held in Jalandhar, Punjab, bringing together the best hockey teams from across India. This web application provides a modern platform for tournament management, news updates, team information, and more.

## ✨ Features

- **Tournament Management** - Track multiple tournament editions, teams, and results
- **News & Announcements** - Latest updates and featured articles with images
- **Team Profiles** - Detailed information about participating teams
- **Committee Members** - Core committee and 75+ dedicated team profiles with photos
- **Content Management** - Dynamic page content with admin controls
- **Sponsors & Patrons** - Showcase tournament supporters
- **Admin Dashboard** - Secure content management system with JWT authentication
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **API-First Architecture** - RESTful API with automatic documentation

## 🚀 Quick Start

For a quick setup guide, see **[quickstart.md](quickstart.md)**

For detailed documentation, see **[backend/docs/SETUP.md](backend/docs/SETUP.md)**

### Prerequisites

- Python 3.11+
- Node.js 18+
- MySQL 8.0+

### Backend Setup

```bash
cd backend
python -m venv .venv

# Activate virtual environment
.venv\Scripts\activate              # Windows
source .venv/bin/activate           # Linux/Mac

pip install -r requirements.txt

# Configure .env file (see backend/docs/SETUP.md)

# Run migrations
python migrations/add_core_committee.py
python migrations/add_dedicated_team.py

# Start server
uvicorn app.main:app --reload
```

Backend runs at: **http://localhost:8000**  
API docs: **http://localhost:8000/docs**

### Frontend Setup

```bash
cd frontend
npm install

# Configure .env file (see backend/docs/SETUP.md)

npm run dev
```

Frontend runs at: **http://localhost:5173**

## 📁 Project Structure

```
surjit-hockey/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/v1/            # API endpoints (auth, tournaments, news, etc.)
│   │   ├── core/              # Configuration, database, security
│   │   ├── models/            # SQLAlchemy database models
│   │   └── schemas/           # Pydantic request/response schemas
│   ├── docs/                  # API, database, and setup documentation
│   ├── migrations/            # Database migration scripts
│   ├── uploads/               # User-uploaded files
│   ├── .env                   # Environment configuration
│   └── requirements.txt       # Python dependencies
│
├── frontend/                   # React frontend
│   ├── public/
│   │   └── images/            # Static images (teams, committee, etc.)
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components (Home, About, etc.)
│   │   ├── config/            # API configuration
│   │   └── utils/             # Utility functions
│   ├── .env                   # Environment configuration
│   └── package.json           # Node dependencies
│
├── Backup/                    # Database and site backups
├── quickstart.md              # Quick setup guide
└── README.md                  # This file
```

## 🛠️ Technology Stack

### Backend

- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **MySQL** - Relational database management system
- **PyMySQL** - Pure Python MySQL client
- **Pydantic** - Data validation using Python type hints
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Secure password hashing

### Frontend

- **React 18** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **React Router** - Declarative routing for React

## 📚 Documentation

| Document                                    | Description                                   |
| ------------------------------------------- | --------------------------------------------- |
| [API Documentation](backend/docs/API.md)    | Complete REST API reference with examples     |
| [Database Schema](backend/docs/DATABASE.md) | Database structure, tables, and relationships |
| [Setup Guide](backend/docs/SETUP.md)        | Detailed development environment setup        |
| [Quick Start](quickstart.md)                | Fast track setup instructions                 |

## 🔐 Environment Configuration

### Backend `.env`

```env
# Database Connection
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/surjit_hockey

# Security
SECRET_KEY=your-secret-key-here-use-openssl-rand-hex-32
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000
```

## 🗄️ Database

The application uses MySQL with the following main tables:

- `tournaments` - Tournament editions and details
- `teams` - Participating teams
- `news` - News articles and announcements
- `core_committee_members` - Core organizing committee (4 members)
- `dedicated_team_members` - Extended support team (75 members)
- `content_pages` - Dynamic page content
- `sponsors`, `patrons`, `advisors` - Supporting organizations/individuals
- `users` - Admin authentication

See [backend/docs/DATABASE.md](backend/docs/DATABASE.md) for complete schema.

## 🔌 API Endpoints

Main API endpoints available at `/api/v1`:

| Endpoint          | Method    | Description            | Auth Required |
| ----------------- | --------- | ---------------------- | ------------- |
| `/auth/login`     | POST      | User authentication    | No            |
| `/auth/me`        | GET       | Current user info      | Yes           |
| `/tournaments`    | GET, POST | Tournament management  | POST: Yes     |
| `/news`           | GET, POST | News articles          | POST: Yes     |
| `/teams`          | GET, POST | Team information       | POST: Yes     |
| `/core-committee` | GET       | Core committee members | No            |
| `/dedicated-team` | GET       | Dedicated team members | No            |
| `/sponsors`       | GET       | Tournament sponsors    | No            |

Full API documentation: http://localhost:8000/docs (when backend is running)

## 🚢 Deployment

### Backend Deployment

1. Set production environment variables
2. Use production WSGI server (Gunicorn with Uvicorn workers)
3. Set up Nginx as reverse proxy
4. Configure SSL/HTTPS certificates
5. Set up database backups
6. Enable logging and monitoring

### Frontend Deployment

1. Build production bundle: `npm run build`
2. Serve `dist` folder with web server (Nginx, Apache)
3. Configure production API URL
4. Enable gzip compression
5. Set up CDN for static assets (optional)
6. Configure caching headers

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest                          # Run all tests
pytest tests/test_endpoints.py  # Run specific test file
pytest --cov=app               # Run with coverage
```

### Frontend Tests

```bash
cd frontend
npm test                    # Run tests
npm run test:coverage       # Run with coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📧 Support

For questions, issues, or support:

- Create an issue in the repository
- Contact the development team
- Email: support@example.com

---

**Developed by:** ParaPixel DigiServices  
**Tournament Website:** [surjithockey.in](https://surjithockey.in)  
**Year:** 2024-2025
