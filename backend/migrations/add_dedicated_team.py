"""Add dedicated team members table and seed data"""
from app.core.config import settings
from sqlalchemy import create_engine, text
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))


def run_migration():
    engine = create_engine(settings.DATABASE_URL)

    with engine.connect() as conn:
        # Create dedicated_team_members table
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS dedicated_team_members (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                role VARCHAR(255),
                image_url VARCHAR(255),
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        """))

        # Insert dedicated team members
        conn.execute(text("""
            INSERT INTO dedicated_team_members (name, role, image_url, display_order) VALUES
            ('Mr. Varinder Kumar Sharma, IAS', 'Deputy Commissioner, Jalandhar', '/images/dedicated-team/1-760.JPG', 1),
            ('Mr. Pargat Singh Padmashree', 'MLA, Jalandhar Cantt', '/images/dedicated-team/2-798.png', 2),
            ('Mr. Rajinder Singh, PPS', 'Deputy Commissioner of Police, Jalandhar', '/images/dedicated-team/3-320.png', 3),
            ('Mr. L.R. Nayyar', 'IRS (Retd) Former Income tax Commissioner,', '/images/dedicated-team/4-462.png', 4),
            ('Mr. Iqbal Singh Sandhu, PCS', 'Additional Deputy Commissioner, Ludhiana', '/images/dedicated-team/5-779.JPG', 5),
            ('Mrs. Sarojini Sharda, PCS (Retd)', 'Vice President of Surjit Hockey Society, Jalandhar', '/images/dedicated-team/6-385.png', 6),
            ('Mr. Jaspreet Singh, IPS', 'Commandant, Patiala', '/images/dedicated-team/7-306.png', 7),
            ('Mr. LPS Khaira, PPS', 'Supdt. of Police,', '/images/dedicated-team/8-481.png', 8),
            ('Mr. Amrik Singh Powar, PPS', 'Deputy Commissioner of Police, Amritsar', '/images/dedicated-team/9-32.png', 9),
            ('Mr. Rajiv Verma,PCS', 'SDM, Jalandhar-1', '/images/dedicated-team/10-710.jpg', 10),
            ('Mr. Gary Johal', 'Managing Director, 24-Seven Gas Stations, Penticton, Canada', '/images/dedicated-team/11-648.png', 11),
            ('Mr. B.S. Makkar', 'CMD, Makkar Motors, Jalandhar', '/images/dedicated-team/12-421.png', 12),
            ('Mr. Surinder Singh Bhapa', '', '/images/dedicated-team/13-744.png', 13),
            ('Mr. Ram Partap', 'Sports Officer (Retd), Jalandhar', '/images/dedicated-team/14-417.png', 14),
            ('Ranbir Singh Tut', 'M/s. Amar Filling Station GT Road, Puragpur, Jalandhar', '/images/dedicated-team/15-194.png', 15),
            ('Mr. N.K. Agarwal', '', '/images/dedicated-team/16-697.png', 16),
            ('Mr. Gurvinder Singh Gullu', 'Secretary Sports, Punjab &amp; Sind Bank,', '/images/dedicated-team/17-731.png', 17),
            ('Mr. Tarsem Singh', 'Powar Advocate, Mithapur, Jalandhar', '/images/dedicated-team/18-853.png', 18),
            ('Mr. Narinder Pal Singh', 'Judge Advocate, Jalandhar', '/images/dedicated-team/19-682.png', 19),
            ('Mr. Guriqbal Singh Dhillon', 'Advocate, Jalandhar', '/images/dedicated-team/20-533.png', 20),
            ('Prof. Kirpal Singh Matharu', '', '/images/dedicated-team/21-843.png', 21),
            ('Mr. Baljit Singh Randhawa', '', '/images/dedicated-team/22-474.png', 22),
            ('Lt. Col. Manmohan Singh', '', '/images/dedicated-team/23-459.png', 23),
            ('Mr. Baldev Singh Randhawa', 'Commandat (Retd), BSF Jalandhar', '/images/dedicated-team/24-67.png', 24),
            ('Mr. Ranjit Singh Tut', ', NRI from USA', '/images/dedicated-team/25-51.png', 25),
            ('Mr. Surjit Singh Tut', ', NRI from USA', '/images/dedicated-team/26-159.png', 26),
            ('Mr. Jaswinder Singh Sangha', 'Secretary, Jalandhar Potato Growing Association Jalandhar', '/images/dedicated-team/27-690.png', 27),
            ('Mr. Harsimerjit Kaur', 'Indane Dealer, Jalandhar', '/images/dedicated-team/28-238.png', 28),
            ('Mr. Sukhjit Singh Cheema', 'CMD, Pukhraj Health Care Pvt. Ltd, Jalandhar', '/images/dedicated-team/29-789.png', 29),
            ('Mr. Nitin Kohli', 'Hike Shoes Pvt. Limited, Jalandhar', '/images/dedicated-team/30-9.png', 30),
            ('Mr. Rajan Chopra', 'CMD, Hotel Ramada, Jalandhar', '/images/dedicated-team/31-829.png', 31),
            ('Mr. Kamaljit Singh Hayre', 'CMD, Hotel Country Inn, Jalandhar', '/images/dedicated-team/32-628.png', 32),
            ('Mr. Tarlok Singh Bhullar', 'NRI &amp; Former Olympic Hockey Umpire Surrey , Canada', '/images/dedicated-team/33-192.png', 33),
            ('Mr. Raj Khela', 'NRI from Surrey, Canada', '/images/dedicated-team/34-458.png', 34),
            ('Mr. Harv Badesha', 'NRI from Surrey, Canada', '/images/dedicated-team/35-765.png', 35),
            ('Mr. Amarjit Singh Tut', 'NRI from Surrey, Canada', '/images/dedicated-team/36-203.png', 36),
            ('Mr. Sukhwinder Singh Chohla', 'Editor, NRI Sarokar, Edminton, Canada', '/images/dedicated-team/37-327.png', 37),
            ('Mr. Sukhwinder Singh Lally', 'Managing Director Lally Infosys, Jalandhar', '/images/dedicated-team/38-996.png', 38),
            ('Dr. Sanjeev Sharma', 'Dr. Sanjeev Sharma an ENT Ellergy Center, Jalandhar', '/images/dedicated-team/39-720.png', 39),
            ('Dr. S.S. Mann', '', '/images/dedicated-team/40-607.png', 40),
            ('Dr. B.S. Johal', 'Johal Hospital, Raman Mandi, Jalandhar', '/images/dedicated-team/41-671.png', 41),
            ('Dr. H.S. Mann', 'Mann Scanning and Diagnostic Centre, Jalandhar', '/images/dedicated-team/42-316.png', 42),
            ('Dr. Navjot Singh Dahiya', 'Global Hospital, Link Road, Jalandhar', '/images/dedicated-team/43-479.png', 43),
            ('Dr. T.S. Randhawa', '63-64, Guru Ravidas Nagar, Guru Ravidas Nagar, Jalandhar', '/images/dedicated-team/44-309.png', 44),
            ('Dr. Anoop Bohri', 'Secretary, Innocent Hearts School, Jalandhar', '/images/dedicated-team/45-847.jpg', 45),
            ('Mr. Laltesh Bhasin', 'Indane Dealer, Lok Sewa, Jalandhar', '/images/dedicated-team/46-817.png', 46),
            ('Mr. B.R. Tiwari', 'Indian OIl Dealer, Jalandhar', '/images/dedicated-team/48-956.png', 47),
            ('Mr. Amolak Singh Kalsi', 'DIO, NIC, Jalandhar', '/images/dedicated-team/49-863.png', 48),
            ('Mr. Harminder Singh', 'PRS Terhsildar, Jalandhar-I', '/images/dedicated-team/50-893.png', 49),
            ('Mr. Gurpreet Singh Naib', 'Tehsildar, Jalandhar-II', '/images/dedicated-team/51-20.png', 50),
            ('Mr. Pardeep Kumar Naib', 'Tehsilda, Jalandhar-I', '/images/dedicated-team/52-280.png', 51),
            ('Mr. Kulbir Singh Saini', '', '/images/dedicated-team/53-219.png', 52),
            ('Mr. Gaurav Mahajan', 'Jonex Sports, Jalandhar', '/images/dedicated-team/54-865.png', 53),
            ('Mr. Sukhdip Singh Jhikka', '', '/images/dedicated-team/55-450.png', 54),
            ('Mr. Sanjay Kohli', 'Managing Director, R.K. Sports Pvt. Ltd, Jalandhar', '/images/dedicated-team/56-785.png', 55),
            ('Mr. Pawan Agarwal', 'CMD, Dudhahari Exports Pvt. Ltd,, Jalandhar', '/images/dedicated-team/57-330.png', 56),
            ('Mr. Varinder Gupta', 'CMD, Jalandhar Spun Pipe Co., Jalandhar', '/images/dedicated-team/58-245.png', 57),
            ('Mr. Avinder Singh Kullar', 'VPO: Sufi Pind, Jalandhar', '/images/dedicated-team/59-59.png', 58),
            ('Mr. P.S. Sidhu', 'CMD Balle Balle Farms,', '/images/dedicated-team/60-437.png', 59),
            ('Mr. Bhavnoor Singh Bedi', 'CMD, Piramid eServices, Near Main Stand, Opp. Hotel Residency, Jalandhar', '/images/dedicated-team/61-495.jpg', 60),
            ('Mr. Parveen Gupta', '', '/images/dedicated-team/62-378.png', 61),
            ('Mr. Mohinder Singh Bhapa', '', '/images/dedicated-team/63-570.png', 62),
            ('Mr. Ankush Gupta', ', New Delhi', '/images/dedicated-team/64-472.png', 63),
            ('Mr. Jatinder Khaira', 'IndianOIl Dealer, Jalandhar', '/images/dedicated-team/65-259.png', 64),
            ('Mr. Pankaj Rana', ', Victoria Gardens, GT Road, Jalandha', '/images/dedicated-team/66-78.png', 65),
            ('Mr. SPS Murar', 'PCS (Retd),', '/images/dedicated-team/67-911.png', 66),
            ('Mr. Ravinder Singh Powar', ', NRI from England', '/images/dedicated-team/68-746.png', 67),
            ('Mr. Marheshinder Singh Meheshi', ', Phillour (Jalandhar)', '/images/dedicated-team/69-555.png', 68),
            ('Mr. Randeep Gupta', '', '/images/dedicated-team/70-814.png', 69),
            ('Mr. Gurcharan Singh', 'Sr. Manager, Air India, Amritsar', '/images/dedicated-team/71-681.png', 70),
            ('Mr. Jaspal Nagra, Banga', '', '/images/dedicated-team/72-970.png', 71),
            ('Mr. Nitin Aggarwal', 'IndianOIl Dealer, Jalandhar', '/images/dedicated-team/73-855.png', 72),
            ('Mr. Pardip Singh', ', Puranpur (Jalandhar)', '/images/dedicated-team/74-248.png', 73),
            ('Mr. Hardeepak Singh', '', '/images/dedicated-team/76-76.png', 74),
            ('Mr. N.K. Handa', 'CMD, New Saint Soldiers Educational institution s, Jalandhar', '/images/dedicated-team/77-771.jpg', 75)
        """))

        conn.commit()
        print("✅ Dedicated team members table created and seeded successfully!")


if __name__ == "__main__":
    run_migration()
