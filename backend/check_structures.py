import pymysql

conn = pymysql.connect(host='localhost', user='root',
                       password='', database='surjit_hockey')
cursor = conn.cursor()

tables = [
    'hockey_year_master',
    'hockey_pool_master',
    'hockey_pool_details',
    'hockey_honour',
    'hockey_dedicated',
    'hockey_ticker_master',
    'hockey_position_master'
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
