"""
Migration script to create core_committee_members table and populate with initial data.
"""
from sqlalchemy import create_engine, text
from app.core.config import settings

# Create engine
engine = create_engine(settings.DATABASE_URL)

# SQL to create table
CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS core_committee_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
"""

# SQL to insert initial data
INSERT_DATA_SQL = """
INSERT INTO core_committee_members (name, role, description, image_url, display_order) VALUES
    ('Mr. L. R. Nayyar, IRS (Retd.)', 'Former Chief Commissioner', 'Income Tax', '/images/core-committee/core_committee_1.jpg', 1),
    ('Mr. Iqbal Singh Sandhu, PCS (Retd.)', 'Former Additional Deputy Commissioner', 'Ludhiana', '/images/core-committee/core_committee_2.jpg', 2),
    ('Mr. Lakwinder Pal Singh Khaira, PPS (Retd.)', 'Former Superintendent of Police', '', '/images/core-committee/core_committee_3.jpg', 3),
    ('Mr. Ram Partap', 'Former Sports Officer', '', '/images/core-committee/core_committee_6.jpg', 4)
ON DUPLICATE KEY UPDATE name=name;
"""


def run_migration():
    """Run the migration."""
    with engine.connect() as conn:
        # Create table
        print("Creating core_committee_members table...")
        conn.execute(text(CREATE_TABLE_SQL))
        conn.commit()
        print("Table created successfully!")

        # Insert data
        print("Inserting initial data...")
        conn.execute(text(INSERT_DATA_SQL))
        conn.commit()
        print("Data inserted successfully!")

        # Verify
        result = conn.execute(
            text("SELECT COUNT(*) as count FROM core_committee_members"))
        count = result.fetchone()[0]
        print(f"Total records: {count}")


if __name__ == "__main__":
    run_migration()
