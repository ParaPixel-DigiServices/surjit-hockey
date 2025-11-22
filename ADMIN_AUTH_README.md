# Admin Authentication Setup

## Features Implemented

✅ **Login Page** (`/login`)
- Modern UI with username/password fields
- Password visibility toggle
- Error handling and loading states
- Responsive design matching the site theme

✅ **Authentication Context** (`AuthContext`)
- Centralized auth state management
- Token storage in localStorage
- Auto-login on page refresh
- Logout functionality

✅ **Protected Routes**
- All `/admin/*` routes require authentication
- Automatic redirect to `/login` if not authenticated
- Loading state while checking auth

✅ **Admin Dashboard Integration**
- User info display in topbar
- Profile dropdown with logout button
- Displays username and email from JWT token

## Backend Requirements

The backend already has authentication endpoints:
- `POST /api/v1/auth/login` - Login with username/password (OAuth2 flow)
- `GET /api/v1/auth/me` - Get current user info (requires Bearer token)

## Creating Admin User

Due to bcrypt version compatibility, you need to create the admin user manually in the database or via backend admin panel.

### Option 1: Using Backend Script (after fixing bcrypt)
```bash
cd backend
.venv\Scripts\python create_admin.py
```

### Option 2: Manual SQL Insert
Execute this SQL in your MySQL database (replace password_hash with actual bcrypt hash):
```sql
INSERT INTO hockey_user (username, email, password, status)
VALUES ('admin', 'admin@hockey.com', '$2b$12$...', 1);
```

### Option 3: Use FastAPI Docs
1. Start backend: `uvicorn app.main:app --reload`
2. Go to `http://localhost:8000/docs`
3. Use `/api/v1/auth/register` endpoint to create admin user

## Usage

1. **Start Backend**:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Admin**:
   - Go to `http://localhost:5173/login`
   - Enter credentials (username: admin, password: admin123)
   - You'll be redirected to `/admin` dashboard

4. **Logout**:
   - Click on profile dropdown in topbar
   - Click "Logout"

## Security Features

- JWT tokens stored in localStorage
- Bearer token authentication on all admin API calls
- Protected routes with automatic redirect
- Token expiration handling
- Secure password hashing with bcrypt

## Next Steps

1. Fix bcrypt compatibility issue in backend
2. Run `create_admin.py` to create test admin user
3. Test login flow end-to-end
4. Add role-based access control if needed
