# Database Schema

## Tables Overview

### users

User authentication and authorization

| Column          | Type         | Constraints      | Description            |
| --------------- | ------------ | ---------------- | ---------------------- |
| id              | INTEGER      | PRIMARY KEY      | User ID                |
| username        | VARCHAR(50)  | UNIQUE, NOT NULL | Username               |
| email           | VARCHAR(100) | UNIQUE, NOT NULL | Email address          |
| hashed_password | VARCHAR(255) | NOT NULL         | Bcrypt hashed password |
| is_active       | BOOLEAN      | DEFAULT TRUE     | Account active status  |
| is_superuser    | BOOLEAN      | DEFAULT FALSE    | Admin privileges       |
| created_at      | TIMESTAMP    | DEFAULT NOW()    | Account creation time  |

---

### tournaments

Tournament information and editions

| Column      | Type         | Constraints   | Description                   |
| ----------- | ------------ | ------------- | ----------------------------- |
| id          | INTEGER      | PRIMARY KEY   | Tournament ID                 |
| edition     | VARCHAR(50)  | NOT NULL      | Edition (e.g., "33rd")        |
| year        | INTEGER      | NOT NULL      | Year                          |
| title       | VARCHAR(255) | NOT NULL      | Full title                    |
| sponsor     | VARCHAR(255) |               | Main sponsor name             |
| start_date  | DATE         |               | Tournament start date         |
| end_date    | DATE         |               | Tournament end date           |
| venue       | VARCHAR(255) |               | Venue location                |
| teams_count | INTEGER      |               | Number of participating teams |
| prize_money | VARCHAR(100) |               | Prize pool amount             |
| status      | VARCHAR(50)  |               | upcoming/ongoing/completed    |
| created_at  | TIMESTAMP    | DEFAULT NOW() | Record creation time          |
| updated_at  | TIMESTAMP    | DEFAULT NOW() | Last update time              |

---

### teams

Participating teams in tournaments

| Column        | Type         | Constraints   | Description                |
| ------------- | ------------ | ------------- | -------------------------- |
| id            | INTEGER      | PRIMARY KEY   | Team ID                    |
| name          | VARCHAR(255) | NOT NULL      | Team name                  |
| coach         | VARCHAR(255) |               | Coach name                 |
| captain       | VARCHAR(255) |               | Captain name               |
| year          | INTEGER      | NOT NULL      | Participation year         |
| tournament_id | INTEGER      | FOREIGN KEY   | Links to tournaments table |
| logo_url      | VARCHAR(255) |               | Team logo path             |
| created_at    | TIMESTAMP    | DEFAULT NOW() | Record creation time       |
| updated_at    | TIMESTAMP    | DEFAULT NOW() | Last update time           |

---

### news

News articles and announcements

| Column         | Type         | Constraints   | Description              |
| -------------- | ------------ | ------------- | ------------------------ |
| id             | INTEGER      | PRIMARY KEY   | News ID                  |
| title          | VARCHAR(255) | NOT NULL      | Article title            |
| content        | TEXT         | NOT NULL      | Article content          |
| category       | VARCHAR(50)  |               | news/announcement/result |
| author         | VARCHAR(100) |               | Author name              |
| published_date | TIMESTAMP    |               | Publication date         |
| image_url      | VARCHAR(255) |               | Featured image path      |
| is_featured    | BOOLEAN      | DEFAULT FALSE | Featured on homepage     |
| created_at     | TIMESTAMP    | DEFAULT NOW() | Record creation time     |
| updated_at     | TIMESTAMP    | DEFAULT NOW() | Last update time         |

---

### core_committee_members

Core organizing committee members

| Column        | Type         | Constraints   | Description           |
| ------------- | ------------ | ------------- | --------------------- |
| id            | INTEGER      | PRIMARY KEY   | Member ID             |
| name          | VARCHAR(255) | NOT NULL      | Full name             |
| role          | VARCHAR(255) | NOT NULL      | Committee role        |
| description   | TEXT         |               | Role description      |
| image_url     | VARCHAR(255) |               | Profile photo path    |
| display_order | INTEGER      | DEFAULT 0     | Display sorting order |
| created_at    | TIMESTAMP    | DEFAULT NOW() | Record creation time  |
| updated_at    | TIMESTAMP    | DEFAULT NOW() | Last update time      |

---

### dedicated_team_members

Extended tournament support team

| Column        | Type         | Constraints   | Description           |
| ------------- | ------------ | ------------- | --------------------- |
| id            | INTEGER      | PRIMARY KEY   | Member ID             |
| name          | VARCHAR(255) | NOT NULL      | Full name             |
| role          | VARCHAR(255) |               | Position/title        |
| image_url     | VARCHAR(255) |               | Profile photo path    |
| display_order | INTEGER      | DEFAULT 0     | Display sorting order |
| created_at    | TIMESTAMP    | DEFAULT NOW() | Record creation time  |
| updated_at    | TIMESTAMP    | DEFAULT NOW() | Last update time      |

---

### content_pages

Static page content management

| Column           | Type         | Constraints      | Description             |
| ---------------- | ------------ | ---------------- | ----------------------- |
| id               | INTEGER      | PRIMARY KEY      | Page ID                 |
| page_name        | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly identifier |
| title            | VARCHAR(255) | NOT NULL         | Page title              |
| content          | TEXT         | NOT NULL         | Page content (HTML)     |
| meta_description | TEXT         |                  | SEO meta description    |
| created_at       | TIMESTAMP    | DEFAULT NOW()    | Record creation time    |
| updated_at       | TIMESTAMP    | DEFAULT NOW()    | Last update time        |

---

### sponsors

Tournament sponsors

| Column        | Type         | Constraints   | Description              |
| ------------- | ------------ | ------------- | ------------------------ |
| id            | INTEGER      | PRIMARY KEY   | Sponsor ID               |
| name          | VARCHAR(255) | NOT NULL      | Company name             |
| logo_url      | VARCHAR(255) |               | Logo image path          |
| website_url   | VARCHAR(255) |               | Company website          |
| category      | VARCHAR(50)  |               | title/gold/silver/bronze |
| display_order | INTEGER      | DEFAULT 0     | Display sorting order    |
| created_at    | TIMESTAMP    | DEFAULT NOW() | Record creation time     |

---

### patrons

Tournament patrons and supporters

| Column        | Type         | Constraints   | Description           |
| ------------- | ------------ | ------------- | --------------------- |
| id            | INTEGER      | PRIMARY KEY   | Patron ID             |
| name          | VARCHAR(255) | NOT NULL      | Full name             |
| designation   | VARCHAR(255) |               | Title/position        |
| organization  | VARCHAR(255) |               | Organization name     |
| image_url     | VARCHAR(255) |               | Profile photo path    |
| display_order | INTEGER      | DEFAULT 0     | Display sorting order |
| created_at    | TIMESTAMP    | DEFAULT NOW() | Record creation time  |

---

### advisors

Advisory board members

| Column        | Type         | Constraints   | Description           |
| ------------- | ------------ | ------------- | --------------------- |
| id            | INTEGER      | PRIMARY KEY   | Advisor ID            |
| name          | VARCHAR(255) | NOT NULL      | Full name             |
| designation   | VARCHAR(255) |               | Title/position        |
| organization  | VARCHAR(255) |               | Organization name     |
| image_url     | VARCHAR(255) |               | Profile photo path    |
| display_order | INTEGER      | DEFAULT 0     | Display sorting order |
| created_at    | TIMESTAMP    | DEFAULT NOW() | Record creation time  |

---

## Relationships

```
tournaments (1) ----< (N) teams
    One tournament has many teams

users (1) ----< (N) news
    One user can author many news articles
```

---

## Indexes

- `users.username` - Unique index for fast username lookups
- `users.email` - Unique index for email lookups
- `tournaments.year` - Index for year-based filtering
- `news.published_date` - Index for chronological sorting
- `news.is_featured` - Index for featured content queries
- `content_pages.page_name` - Unique index for page routing

---

## Notes

- All timestamps use UTC timezone
- `display_order` fields allow manual sorting of displayed items
- Image URLs are relative paths (e.g., `/images/sponsors/logo.png`)
- Foreign keys have `ON DELETE CASCADE` constraints where appropriate
