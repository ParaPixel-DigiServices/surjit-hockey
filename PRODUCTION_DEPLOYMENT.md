# Production Deployment Guide

## Overview

This guide will help you deploy the Surjit Hockey Tournament website to production. You'll need to deploy:

1. **Database**: MySQL on a cloud provider
2. **Backend API**: FastAPI/Python application
3. **Frontend**: React/Vite application

## Option 1: Recommended Setup (Most Common)

### Step 1: Deploy Database (MySQL)

**Choice A: Managed MySQL (Recommended)**

- **AWS RDS MySQL**: https://aws.amazon.com/rds/mysql/
- **Google Cloud SQL**: https://cloud.google.com/sql
- **Azure Database for MySQL**: https://azure.microsoft.com/en-us/products/mysql
- **DigitalOcean Managed MySQL**: https://www.digitalocean.com/products/managed-databases-mysql
- **PlanetScale** (MySQL-compatible): https://planetscale.com/

**Steps:**

1. Create a managed MySQL instance
2. Note down: hostname, port (usually 3306), username, password, database name
3. Import your local database:

   ```bash
   # Export local database first
   mysqldump -u root -p shwebdes_db > database_backup.sql

   # Import to production (replace with your credentials)
   mysql -h your-db-host.com -u your-username -p your-database-name < database_backup.sql
   ```

4. Configure firewall rules to allow connections from your backend server

### Step 2: Deploy Backend (FastAPI)

**Choice A: Railway (Easiest, Free Tier Available)**

- Website: https://railway.app/

**Steps:**

1. Sign up at https://railway.app/
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select `ParaPixel-DigiServices/surjit-hockey`
4. Railway will auto-detect Python and deploy the backend
5. Configure Environment Variables in Railway dashboard:
   ```
   DATABASE_URL=mysql+pymysql://username:password@your-db-host:3306/database_name
   SECRET_KEY=your-production-secret-key-generate-a-strong-one
   ALLOWED_ORIGINS=https://your-frontend-domain.com
   ```
6. Set the root directory to `/backend` in Railway settings
7. Railway will provide you with a production URL (e.g., `https://your-app.railway.app`)

**Choice B: Render.com (Free Tier Available)**

- Website: https://render.com/

**Steps:**

1. Sign up at https://render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: surjit-hockey-backend
   - **Root Directory**: backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables (same as above)
6. Render will provide a URL (e.g., `https://surjit-hockey-backend.onrender.com`)

**Choice C: DigitalOcean App Platform**

- Website: https://www.digitalocean.com/products/app-platform

**Choice D: AWS Elastic Beanstalk or EC2**

- More complex but full control

### Step 3: Deploy Frontend (React/Vite)

**Choice A: Vercel (Easiest, Free for Personal Projects)**

- Website: https://vercel.com/

**Steps:**

1. Sign up at https://vercel.com/
2. Click "Add New" → "Project"
3. Import your GitHub repository `ParaPixel-DigiServices/surjit-hockey`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build` (or `npm install && npm run build`)
   - **Output Directory**: dist
5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
6. Click "Deploy"
7. Vercel will provide a URL (e.g., `https://surjit-hockey.vercel.app`)
8. You can add a custom domain later

**Choice B: Netlify (Similar to Vercel)**

- Website: https://www.netlify.com/

**Steps:**

1. Sign up at https://netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repository
4. Configure:
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: frontend/dist
5. Add Environment Variables (same as Vercel)
6. Deploy

**Choice C: Cloudflare Pages**

- Website: https://pages.cloudflare.com/

### Step 4: Update Backend CORS Settings

Update `backend/app/core/config.py` to allow your production frontend domain:

```python
# In settings class, update:
ALLOWED_ORIGINS = "http://localhost:5173,https://your-frontend-domain.vercel.app"
```

Or use environment variable (recommended):

```python
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
```

### Step 5: Update Frontend API URL

Update `frontend/src/config/api.js` or create `.env.production`:

```env
VITE_API_URL=https://your-backend-url.railway.app
```

Update the API configuration:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
```

---

## Option 2: All-in-One VPS Deployment

Deploy everything on a single Virtual Private Server (VPS).

### Providers:

- **DigitalOcean Droplet**: $6/month (1GB RAM)
- **AWS Lightsail**: $5/month
- **Vultr**: $6/month
- **Linode**: $5/month

### Steps:

1. **Create a Ubuntu 22.04 LTS server**

2. **SSH into your server**:

   ```bash
   ssh root@your-server-ip
   ```

3. **Install dependencies**:

   ```bash
   # Update system
   apt update && apt upgrade -y

   # Install MySQL
   apt install mysql-server -y
   mysql_secure_installation

   # Install Python 3.11
   apt install python3.11 python3.11-venv python3-pip -y

   # Install Node.js 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install nodejs -y

   # Install Nginx
   apt install nginx -y

   # Install certbot for SSL
   apt install certbot python3-certbot-nginx -y
   ```

4. **Setup MySQL Database**:

   ```bash
   mysql -u root -p
   ```

   ```sql
   CREATE DATABASE shwebdes_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'surjit_user'@'localhost' IDENTIFIED BY 'strong_password_here';
   GRANT ALL PRIVILEGES ON shwebdes_db.* TO 'surjit_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

   Import your database:

   ```bash
   mysql -u surjit_user -p shwebdes_db < /path/to/database_backup.sql
   ```

5. **Clone your repository**:

   ```bash
   cd /var/www
   git clone https://github.com/ParaPixel-DigiServices/surjit-hockey.git
   cd surjit-hockey
   ```

6. **Setup Backend**:

   ```bash
   cd backend
   python3.11 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt

   # Create .env file
   nano .env
   ```

   Add:

   ```env
   DATABASE_URL=mysql+pymysql://surjit_user:strong_password_here@localhost:3306/shwebdes_db
   SECRET_KEY=generate-a-strong-secret-key-here
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

   Test backend:

   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

7. **Setup Backend as System Service**:

   ```bash
   nano /etc/systemd/system/surjit-backend.service
   ```

   Add:

   ```ini
   [Unit]
   Description=Surjit Hockey Backend
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/var/www/surjit-hockey/backend
   Environment="PATH=/var/www/surjit-hockey/backend/venv/bin"
   ExecStart=/var/www/surjit-hockey/backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

   Enable and start:

   ```bash
   systemctl daemon-reload
   systemctl enable surjit-backend
   systemctl start surjit-backend
   systemctl status surjit-backend
   ```

8. **Build Frontend**:

   ```bash
   cd /var/www/surjit-hockey/frontend

   # Update API URL in .env.production
   echo "VITE_API_URL=https://yourdomain.com/api" > .env.production

   npm install
   npm run build

   # Copy build files to nginx directory
   cp -r dist /var/www/html/surjit-hockey
   ```

9. **Configure Nginx**:

   ```bash
   nano /etc/nginx/sites-available/surjit-hockey
   ```

   Add:

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       # Frontend
       location / {
           root /var/www/html/surjit-hockey;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api/ {
           proxy_pass http://localhost:8000/api/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # Static uploads
       location /uploads/ {
           alias /var/www/surjit-hockey/backend/uploads/;
       }
   }
   ```

   Enable site:

   ```bash
   ln -s /etc/nginx/sites-available/surjit-hockey /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

10. **Setup SSL Certificate (HTTPS)**:

    ```bash
    certbot --nginx -d yourdomain.com -d www.yourdomain.com
    ```

    Follow the prompts. Certbot will automatically configure SSL and auto-renewal.

11. **Setup Firewall**:

    ```bash
    ufw allow OpenSSH
    ufw allow 'Nginx Full'
    ufw enable
    ```

12. **Setup Auto-deployment (Optional)**:

    ```bash
    cd /var/www/surjit-hockey
    nano deploy.sh
    ```

    Add:

    ```bash
    #!/bin/bash
    cd /var/www/surjit-hockey
    git pull origin main

    # Update backend
    cd backend
    source venv/bin/activate
    pip install -r requirements.txt
    systemctl restart surjit-backend

    # Update frontend
    cd ../frontend
    npm install
    npm run build
    cp -r dist/* /var/www/html/surjit-hockey/

    systemctl reload nginx
    ```

    Make executable:

    ```bash
    chmod +x deploy.sh
    ```

---

## Option 3: Docker Deployment (Advanced)

If you want to containerize your application:

1. Create `docker-compose.yml` in project root
2. Deploy to any cloud provider that supports Docker
3. Use Docker Hub or GitHub Container Registry

---

## Recommended Production Stack (Easiest)

**For Beginners/Quick Setup:**

```
Database:  PlanetScale (Free tier) or Railway MySQL
Backend:   Railway.app (Free tier)
Frontend:  Vercel (Free tier)
```

**Total Cost**: $0/month for small-medium traffic

**For Medium Projects:**

```
Database:  DigitalOcean Managed MySQL ($15/month)
Backend:   DigitalOcean App Platform ($5/month)
Frontend:  Vercel Pro ($20/month) or Cloudflare Pages (Free)
```

**For Full Control:**

```
Everything on DigitalOcean Droplet: $12-24/month
+ Domain name: ~$12/year
```

---

## Domain Setup

1. **Buy a domain** from:

   - Namecheap, GoDaddy, Google Domains, Cloudflare

2. **Point domain to your hosting**:

   **For Vercel/Netlify:**

   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → Vercel's IP

   **For VPS:**

   - Add A record: `@` → Your server IP
   - Add A record: `www` → Your server IP

---

## Post-Deployment Checklist

- [ ] Database is backed up regularly
- [ ] SSL certificate is active (HTTPS)
- [ ] Environment variables are set correctly
- [ ] CORS is configured for your domain
- [ ] File uploads work properly
- [ ] All API endpoints respond correctly
- [ ] Frontend can communicate with backend
- [ ] Images and static files load
- [ ] Admin panel is accessible
- [ ] Setup monitoring (optional: UptimeRobot, Pingdom)

---

## Monitoring & Maintenance

1. **Setup monitoring**: Use services like UptimeRobot (free) to monitor uptime
2. **Setup backups**: Automated daily database backups
3. **Update regularly**: Keep dependencies updated
4. **Check logs**: Monitor application logs for errors

---

## Need Help?

Common issues:

- **CORS errors**: Check ALLOWED_ORIGINS in backend
- **API not connecting**: Verify VITE_API_URL in frontend
- **Database connection failed**: Check DATABASE_URL
- **502 Bad Gateway**: Backend service is down
- **404 on refresh**: Missing nginx try_files configuration

---

## Quick Start Commands for Each Option

### Railway + Vercel (Recommended for beginners):

1. Push code to GitHub
2. Connect Railway to backend folder
3. Connect Vercel to frontend folder
4. Set environment variables
5. Done! ✅

### Single VPS:

```bash
ssh root@your-ip
git clone https://github.com/ParaPixel-DigiServices/surjit-hockey.git
cd surjit-hockey
./scripts/deploy.sh  # You'll need to create this
```