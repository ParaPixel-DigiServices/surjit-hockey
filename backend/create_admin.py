from app.core import get_db, get_password_hash
from app.models.user import User, UserProfile

db = next(get_db())

# Check if admin exists
existing = db.query(User).filter(User.username == 'admin').first()

if existing:
    print(f'Admin user already exists: {existing.username} ({existing.email})')
else:
    # Create admin user
    admin = User(
        username='admin',
        email='admin@hockey.com',
        password=get_password_hash('admin123'),
        status=True
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)

    # Create profile
    profile = UserProfile(user_id=admin.id)
    db.add(profile)
    db.commit()

    print('✅ Admin user created successfully!')
    print('   Username: admin')
    print('   Password: admin123')
    print('   Email: admin@hockey.com')

db.close()
