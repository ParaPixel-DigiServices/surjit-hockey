# MySQL Installation & Setup Guide for Windows

## Option 1: Install XAMPP (Recommended - Easiest)

XAMPP includes MySQL, phpMyAdmin, and Apache in one package.

### Step 1: Download XAMPP

1. Go to: https://www.apachefriends.org/download.html
2. Download XAMPP for Windows (latest version)
3. Run the installer

### Step 2: Install XAMPP

1. Run the downloaded `.exe` file
2. If Windows Defender blocks it, click "More info" → "Run anyway"
3. Select components (at minimum: MySQL, phpMyAdmin)
4. Choose installation directory (default: `C:\xampp`)
5. Complete the installation

### Step 3: Start MySQL

1. Open XAMPP Control Panel (`C:\xampp\xampp-control.exe`)
2. Click **"Start"** next to MySQL
3. MySQL should now show as running (green highlight)

### Step 4: Verify Installation

Open PowerShell and run:

```powershell
cd backend
python test_db.py
```

---

## Option 2: Install MySQL Community Server (Standalone)

### Step 1: Download MySQL

1. Go to: https://dev.mysql.com/downloads/mysql/
2. Download MySQL Community Server (Windows)
3. Choose "Windows (x86, 64-bit), ZIP Archive" or MSI Installer

### Step 2: Install MySQL

1. Run the installer
2. Choose "Developer Default" or "Server only"
3. Set root password (remember this!)
4. Configure MySQL as a Windows Service
5. Complete installation

### Step 3: Start MySQL Service

```powershell
# Start MySQL service
Start-Service MySQL80

# Or use Services.msc
# Press Win+R → type "services.msc" → Find MySQL → Right-click → Start
```

### Step 4: Verify Installation

```powershell
mysql --version
```

---

## After Installation: Configure the Backend

### 1. Update `.env` file

Edit `backend/.env` with your MySQL credentials:

```env
# For XAMPP (default):
DATABASE_URL=mysql+pymysql://root:@localhost:3306/surjit_hockey

# For MySQL with password:
DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost:3306/surjit_hockey
```

### 2. Create Database

Open MySQL command line or phpMyAdmin and run:

```sql
CREATE DATABASE surjit_hockey CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Using PowerShell (XAMPP):**

```powershell
& "C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE surjit_hockey CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

**Using PowerShell (MySQL Server):**

```powershell
mysql -u root -p -e "CREATE DATABASE surjit_hockey CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 3. Import Database Backup

You have a backup at: `Backup/backup-11.12.2025_17-44-58_shwebdesign/mysql/shwebdes_db.sql`

**Using phpMyAdmin (XAMPP):**

1. Open http://localhost/phpmyadmin
2. Click on "surjit_hockey" database
3. Go to "Import" tab
4. Choose your SQL file
5. Click "Go"

**Using Command Line:**

```powershell
# For XAMPP:
& "C:\xampp\mysql\bin\mysql.exe" -u root surjit_hockey < "Backup/backup-11.12.2025_17-44-58_shwebdesign/mysql/shwebdes_db.sql"

# For MySQL Server:
mysql -u root -p surjit_hockey < "Backup/backup-11.12.2025_17-44-58_shwebdesign/mysql/shwebdes_db.sql"
```

---

## Testing the Setup

### Test 1: Database Connection

```powershell
cd backend
python test_db.py
```

Expected output:

```
✓ Database connection successful!
✓ MySQL Version: 8.0.x
✓ Database 'surjit_hockey' exists
✓ Found X tables
```

### Test 2: API Endpoints

```powershell
cd backend
pwsh -ExecutionPolicy Bypass -File .\test_api.ps1
```

---

## Troubleshooting

### Port Already in Use

If port 3306 is already in use:

1. Find what's using it: `netstat -ano | findstr :3306`
2. Stop the process or change MySQL port

### Cannot Connect to MySQL

1. Check if MySQL service is running
2. Verify credentials in `.env` file
3. Try connecting with command line: `mysql -u root -p`

### Permission Denied

Run PowerShell or Command Prompt as Administrator

### XAMPP MySQL Won't Start

1. Check if port 3306 is free
2. Check XAMPP logs: `C:\xampp\mysql\data\mysql_error.log`
3. Try running XAMPP as Administrator

---

## Quick Reference

### XAMPP Paths

- Control Panel: `C:\xampp\xampp-control.exe`
- MySQL Binary: `C:\xampp\mysql\bin\mysql.exe`
- phpMyAdmin: `http://localhost/phpmyadmin`
- Config: `C:\xampp\mysql\bin\my.ini`

### MySQL Commands

```powershell
# Connect to MySQL
mysql -u root -p

# Show databases
SHOW DATABASES;

# Use database
USE surjit_hockey;

# Show tables
SHOW TABLES;

# Exit
EXIT;
```

---

## Next Steps After MySQL is Running

1. ✅ MySQL installed and running
2. ✅ Database created
3. ✅ Backup imported
4. ✅ `.env` configured
5. 🚀 Run API tests: `pwsh .\test_api.ps1`
6. 🌐 Access API docs: http://127.0.0.1:8000/docs
