"""Check remaining unimplemented tables."""
import pymysql
from app.core.config import settings
from urllib.parse import urlparse

# Parse DATABASE_URL
db_url = urlparse(settings.DATABASE_URL)

conn = pymysql.connect(
    host=db_url.hostname,
    user=db_url.username,
    password=db_url.password,
    database=db_url.path.lstrip('/'),
    port=db_url.port or 3306
)
cursor = conn.cursor()
cursor.execute('SHOW TABLES')
all_tables = [table[0] for table in cursor.fetchall()]

# Tables we have models/endpoints for (34 tables)
implemented = [
    'users', 'user_profile', 'user_sports_details',
    'hockey_event_master', 'hockey_fixture_master', 'hockey_match_results',
    'hockey_category_master', 'hockey_team_master', 'hockey_team_player_master',
    'hockey_banner', 'hockey_advertisements', 'hockey_gallery', 'alumni_memory',
    'hockey_news', 'hockey_news_images', 'hockey_official', 'hockey_sponsor',
    'hockey_standing', 'hockey_fixture_scoring_details', 'hockey_pool_master',
    'hockey_pool_details', 'hockey_year_master', 'hockey_honour_master',
    'hockey_dedicated', 'hockey_ticker', 'hockey_image_of_day',
    'hockey_position_master', 'hockey_fixture_match_report', 'hockey_streaming_master',
    'hockey_timer', 'hockey_capacity_master', 'hockey_level_master',
    'hockey_identity_master', 'hockey_team_player_details', 'alumni_profile'
]

remaining = sorted([t for t in all_tables if t not in implemented])

print(f'\n{"="*70}')
print(f'DATABASE COVERAGE SUMMARY')
print(f'{"="*70}')
print(f'Total tables: {len(all_tables)}')
print(f'Implemented: {len(implemented)} ✅')
print(f'Remaining: {len(remaining)} ⏳')
print(f'Coverage: {len(implemented)/len(all_tables)*100:.1f}%')
print(f'{"="*70}\n')

if remaining:
    print('REMAINING UNIMPLEMENTED TABLES:\n')
    for i, table in enumerate(remaining, 1):
        cursor.execute(f'SELECT COUNT(*) FROM `{table}`')
        count = cursor.fetchone()[0]
        cursor.execute(f'DESCRIBE `{table}`')
        fields = cursor.fetchall()
        print(f'{i:2}. {table:40} | {count:5} rows | {len(fields):2} fields')

    print(f'\n{"="*70}')
    print('\nDETAILED TABLE STRUCTURES:\n')

    for table in remaining:
        cursor.execute(f'DESCRIBE `{table}`')
        fields = cursor.fetchall()
        cursor.execute(f'SELECT COUNT(*) FROM `{table}`')
        count = cursor.fetchone()[0]

        print(f'\n{table.upper()} ({count} rows):')
        print('-' * 70)
        for field in fields:
            field_name, field_type = field[0], field[1]
            null = 'NULL' if field[2] == 'YES' else 'NOT NULL'
            print(f'  {field_name:30} {field_type:20} {null}')
else:
    print('🎉 ALL TABLES IMPLEMENTED!')

conn.close()
