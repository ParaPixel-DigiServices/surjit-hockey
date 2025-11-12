# Deployment Guide

## Production Deployment Options

### Option 1: Railway (Recommended for Backend)

1. **Install Railway CLI**

   ```bash
   npm install -g railway
   ```

2. **Login and Initialize**

   ```bash
   railway login
   cd backend
   railway init
   ```

3. **Add MySQL Database**

   - Go to Railway dashboard
   - Add MySQL database plugin
   - Copy connection string

4. **Set Environment Variables**

   ```bash
   railway variables set SECRET_KEY="your-secret-key"
   railway variables set DATABASE_URL="mysql://..."
   railway variables set CORS_ORIGINS="https://yourfrontend.com"
   railway variables set DEBUG="False"
   ```

5. **Deploy**
   ```bash
   railway up
   ```

### Option 2: Render

1. **Create Account** at render.com

2. **Create Web Service**

   - Connect GitHub repo
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

3. **Add MySQL Database**

   - Create MySQL database on Render
   - Copy connection string

4. **Set Environment Variables**
   In Render dashboard, add:
   - `SECRET_KEY`
   - `DATABASE_URL`
   - `CORS_ORIGINS`
   - `DEBUG=False`

### Option 3: DigitalOcean

1. **Create Droplet** (Ubuntu 22.04)

2. **Setup Server**

   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Python and MySQL
   sudo apt install python3-pip python3-venv mysql-server nginx -y

   # Clone repository
   git clone https://github.com/your-repo/surjit-hockey.git
   cd surjit-hockey/backend

   # Create virtual environment
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install gunicorn
   ```

3. **Configure MySQL**

   ```bash
   sudo mysql_secure_installation
   sudo mysql
   ```

   ```sql
   CREATE DATABASE surjit_hockey;
   CREATE USER 'surjit_user'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON surjit_hockey.* TO 'surjit_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Create Systemd Service**

   ```bash
   sudo nano /etc/systemd/system/surjit-api.service
   ```

   ```ini
   [Unit]
   Description=Surjit Hockey API
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/path/to/surjit-hockey/backend
   Environment="PATH=/path/to/venv/bin"
   EnvironmentFile=/path/to/.env
   ExecStart=/path/to/venv/bin/gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

   [Install]
   WantedBy=multi-user.target
   ```

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable surjit-api
   sudo systemctl start surjit-api
   ```

5. **Configure Nginx**

   ```bash
   sudo nano /etc/nginx/sites-available/surjit-api
   ```

   ```nginx
   server {
       listen 80;
       server_name api.surjithockey.in;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/surjit-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d api.surjithockey.in
   ```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**

   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables**
   In Vercel dashboard:
   - `VITE_API_URL=https://api.surjithockey.in`

### Option 2: Netlify

1. **Build frontend**

   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop `dist` folder to netlify.com
   - Or use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

## Environment Variables for Production

### Backend (.env)

```env
DATABASE_URL=mysql+pymysql://user:password@host:3306/database
SECRET_KEY=very-long-random-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=https://surjithockey.in,https://www.surjithockey.in
APP_NAME=Surjit Hockey API
DEBUG=False
API_VERSION=v1
```

### Frontend (.env.production)

```env
VITE_API_URL=https://api.surjithockey.in/api/v1
```

## Security Checklist

- [ ] Use HTTPS for all connections
- [ ] Set `DEBUG=False` in production
- [ ] Use strong, unique SECRET_KEY
- [ ] Restrict CORS to specific domains
- [ ] Use environment variables for secrets
- [ ] Enable firewall on server
- [ ] Keep dependencies updated
- [ ] Regular database backups
- [ ] Monitor logs for suspicious activity
- [ ] Implement rate limiting
- [ ] Use strong database passwords
- [ ] Disable root MySQL remote access

## Monitoring

### Health Checks

```bash
# Check API health
curl https://api.surjithockey.in/health

# Check frontend
curl https://surjithockey.in
```

### Logs

**DigitalOcean/VPS:**

```bash
# Application logs
sudo journalctl -u surjit-api -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

**Railway/Render:**

- View logs in dashboard

## Database Backup

### Automated Backup Script

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mysql"
DB_NAME="surjit_hockey"
DB_USER="surjit_user"
DB_PASS="your_password"

mkdir -p $BACKUP_DIR
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete
```

**Schedule with cron:**

```bash
crontab -e
# Add line:
0 2 * * * /path/to/backup-script.sh
```

## Performance Optimization

1. **Enable Gzip in Nginx**

   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

2. **Use CDN for static assets**

   - Upload images to Cloudflare Images or AWS S3
   - Serve via CDN

3. **Database Optimization**

   ```sql
   -- Add indexes
   CREATE INDEX idx_tournament_year ON hockey_event_master(event_year);
   CREATE INDEX idx_fixture_tournament ON hockey_fixture_master(tournament_id);
   ```

4. **Connection Pooling**
   Update `database.py`:
   ```python
   engine = create_engine(
       settings.DATABASE_URL,
       pool_size=20,
       max_overflow=0,
       pool_pre_ping=True
   )
   ```

## Rollback Plan

If deployment fails:

1. **Backend**: Revert to previous deployment or commit

   ```bash
   git revert HEAD
   railway up
   ```

2. **Frontend**: Use Vercel/Netlify rollback feature

3. **Database**: Restore from backup
   ```bash
   gunzip < backup_file.sql.gz | mysql -u user -p database
   ```

## Support

After deployment:

- Monitor error logs daily
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure alerting for downtime
- Regular security updates

---

**Production URL Examples:**

- API: https://api.surjithockey.in
- Frontend: https://surjithockey.in
- Docs: https://api.surjithockey.in/docs
