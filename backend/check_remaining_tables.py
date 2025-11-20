import pymysql

conn = pymysql.connect(host='localhost', user='root',
                       password='', database='surjit_hockey')
cursor = conn.cursor()

tables = [
    'hockey_fixture_match_report',
    'hockey_streaming_master',
    'hockey_timer',
    'hockey_capacity_master',
    'hockey_level_master',
    'hockey_identity_master',
    'hockey_team_player_details'
]

for table in tables:
    print(f"\n=== {table} ===")
    cursor.execute(f'DESCRIBE {table}')
    cols = cursor.fetchall()
    for col in cols:
        print(f"  {col[0]}: {col[1]}")

    cursor.execute(f'SELECT * FROM {table} LIMIT 1')
    row = cursor.fetchone()
    if row:
        print(f"Sample: {row}")
    else:
        print("No data")

conn.close()
