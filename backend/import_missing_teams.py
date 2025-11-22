"""
Import missing teams from backup data
"""
import sys
from sqlalchemy import create_engine, text
from app.core.config import settings

# Missing teams data from backup
missing_teams = [
    (19, 'PNB Delhi', 'PNB', '19.png', 0, '', '', '', '', 3,
     '2016-07-26 11:22:45', '2024-10-12 03:18:14', 1, 1, 0),
    (21, 'Namdhari-XI', 'NMD', '21.png', 0, '', '', '', '', 3,
     '2016-07-26 11:24:55', '2017-09-18 01:59:36', 1, 1, 0),
    (23, 'ONGC Delhi', 'ONGC', '23.png', 0, '', '', '', '', 2,
     '2016-07-26 11:26:53', '2023-10-18 09:51:20', 1, 1, 0),
    (30, 'RCF Kapurthala', 'RCFW', '30.png', 1, '', '', '', '',
     3, '2016-08-29 18:46:03', '2018-09-19 05:36:22', 1, 1, 0),
    (31, 'North Central Railways', 'NCR-W', '31.png', 1, '', '', '',
     '', 3, '2016-08-29 18:47:05', '2018-09-19 05:37:22', 1, 1, 0),
    (32, 'Central Railways', 'CR-W', '32.png', 1, '', '', '', '',
     3, '2016-08-29 18:47:34', '2018-09-19 05:37:37', 1, 1, 0),
    (33, 'Westren Railways', 'WR-W', '33.png', 1, '', '', '', '',
     3, '2016-08-29 18:48:22', '2018-09-19 05:37:10', 1, 1, 0),
    (34, 'Haryana', 'HR-W', '34.png', 1, '', '', '', '', 3,
     '2016-08-29 18:57:30', '2018-09-19 05:37:42', 1, 1, 0),
    (36, 'AIR India Mumbai', 'AI', '36.png', 0, '', '', '', '',
     3, '2016-09-02 10:24:28', '2021-10-29 09:09:02', 1, 1, 0),
    (37, 'Sports Authority of India', 'SAI', '37.png', 0, '', '', '',
     '', 3, '2016-09-02 10:25:15', '2024-10-12 03:19:40', 1, 1, 0),
    (38, 'IOC Chandigarh', 'IOC-C', '38.png', 0, '', '', '', '',
     3, '2016-09-02 10:25:45', '2024-10-20 00:17:02', 1, 1, 0),
    (39, 'ASC, Jalandhar', 'ASCJ', '53.png', 0, '', '', '', '',
     3, '2017-09-13 22:18:10', '2023-10-18 09:49:35', 1, 1, 0),
    (40, 'Hindustan Petroleum', 'HP', '40.png', 0, '', '', '', '',
     3, '2016-09-03 15:33:43', '2024-10-20 00:16:23', 1, 1, 0),
    (41, 'Punjab National Bank', 'PNB', '41.png', 0, '', '', '',
     '', 3, '2016-09-03 15:34:21', '2024-10-20 00:18:16', 1, 1, 0),
    (42, 'ONGC Mumbai', 'ONGC-M', '42.png', 0, '', '', '', '',
     3, '2016-09-03 15:34:43', '2024-10-12 03:20:03', 1, 1, 0),
    (43, 'Food Corporation of India', 'FCI', '43.png', 0, '', '', '',
     '', 3, '2016-09-03 15:35:05', '2024-10-12 03:20:20', 1, 1, 0),
    (44, 'Punjab XI', 'PB-W', '44.png', 1, '', '', '', '', 3,
     '2016-09-03 15:35:26', '2018-09-19 05:37:19', 1, 1, 0),
    (47, 'UCO Bank', 'UCO', '47.png', 1, '', '', '', '', 3,
     '2017-09-10 03:10:57', '2018-09-19 05:37:02', 1, 1, 0),
    (56, 'CRPF Delhi (Women)', 'CRPF-W', '56.png', 1, '', '', '',
     '', 3, '2017-09-17 22:16:38', '2018-09-19 05:37:40', 1, 1, 0),
]


def import_teams():
    try:
        engine = create_engine(settings.DATABASE_URL)

        with engine.connect() as conn:
            for team in missing_teams:
                # Check if team already exists
                result = conn.execute(
                    text("SELECT id FROM hockey_team_master WHERE id = :id"),
                    {"id": team[0]}
                )

                if result.fetchone():
                    print(
                        f"Team ID {team[0]} ({team[1]}) already exists, skipping...")
                    continue

                # Insert team
                conn.execute(
                    text("""
                        INSERT INTO hockey_team_master 
                        (id, team_name, team_name_short, team_logo, team_type, team_coach, 
                         team_manager, team_coach_mobile, team_manager_mobile, type, 
                         date_created, date_updated, user_created, user_updated, status)
                        VALUES 
                        (:id, :team_name, :team_name_short, :team_logo, :team_type, :team_coach,
                         :team_manager, :team_coach_mobile, :team_manager_mobile, :type,
                         :date_created, :date_updated, :user_created, :user_updated, :status)
                    """),
                    {
                        "id": team[0],
                        "team_name": team[1],
                        "team_name_short": team[2],
                        "team_logo": team[3],
                        "team_type": team[4],
                        "team_coach": team[5],
                        "team_manager": team[6],
                        "team_coach_mobile": team[7],
                        "team_manager_mobile": team[8],
                        "type": team[9],
                        "date_created": team[10],
                        "date_updated": team[11],
                        "user_created": team[12],
                        "user_updated": team[13],
                        "status": team[14]
                    }
                )
                conn.commit()
                print(f"✓ Imported team ID {team[0]}: {team[1]}")

        print(f"\n✓ Successfully imported {len(missing_teams)} teams!")

    except Exception as e:
        print(f"✗ Error importing teams: {e}")
        sys.exit(1)


if __name__ == "__main__":
    import_teams()
