import pymysql

conn = pymysql.connect(host='localhost', user='root',
                       password='', database='surjit_hockey')
cursor = conn.cursor()

tables = [
    'hockey_advertisements',
    'hockey_capacity_master',
    'hockey_dedicated',
    'hockey_fixture_match_details',
    'hockey_fixture_match_report',
    'hockey_honour',
    'hockey_image_of_the_day',
    'hockey_pool_master',
    'hockey_pool_details',
    'hockey_position_master',
    'hockey_streaming_master',
    'hockey_team_player_master',
    'hockey_ticker_master',
    'hockey_timer',
    'hockey_year_master',
    'hockey_level_master',
    'hockey_identity_master',
    'hockey_identity_category_master'
]

print("\n=== TABLE ROW COUNTS ===\n")
for table in tables:
    cursor.execute(f'SELECT COUNT(*) FROM {table}')
    count = cursor.fetchone()[0]
    print(f'{table}: {count} rows')

conn.close()
