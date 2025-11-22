import bcrypt
from datetime import datetime
from app.core.database import get_db
from app.models.user import User, UserProfile

# Hash password directly with bcrypt
password = "admin123"
hashed = bcrypt.hashpw(password.encode(
    'utf-8'), bcrypt.gensalt()).decode('utf-8')

db = next(get_db())

# Check if admin exists
existing = db.query(User).filter(User.username == 'admin').first()

if existing:
    print(f'Admin user already exists: {existing.username} ({existing.email})')
else:
    # Create admin user with all required fields
    admin = User(
        first_name='Admin',
        last_name='User',
        username='admin',
        email='admin@hockey.com',
        password=hashed,
        mobile='0000000000',
        gender=0,
        date_created=datetime.now(),
        ip='127.0.0.1',
        session_id='',
        last_action=0,
        language_id=1,
        status_distinguished=False,
        status=True
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)

    # Create profile
    profile = UserProfile(
        user_id=admin.id,
        first_name='Admin',
        last_name='User'
    )
    db.add(profile)
    db.commit()

    print('✅ Admin user created successfully!')
    print('   Username: admin')
    print('   Password: admin123')
    print('   Email: admin@hockey.com')

db.close()
