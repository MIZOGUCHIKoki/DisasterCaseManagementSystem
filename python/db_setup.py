import sqlite3

def make_testData_person(conn: sqlite3.Connection) -> None:
    cur: sqlite3.Cursor = conn.cursor()
    cur.executemany('''
        INSERT INTO person (id, nickName, group_id, age, allergy, remarks_food, remarks_other) VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', [
        ('c4ca4238a0b923820dcc509a6f75849b','おみおみー', None, 25, 0, 'ピーナッツアレルギー', '埃ダメ'),   # 1
        ('c81e728d9d4c2f636f067f89cc14862c','ムサリーの', 1, 30, 1, 'Gluten allergy, Prefers vegetarian', ''), # 2
        ('eccbc87e4b5ce2fe28308fd9f2a7baf3','田中氏', 1, 22, 0, 'Lactose intolerance', 'Has pets'), # 3
        ('a87ff679a2f3e71d9181a67b7542122c','チャンさく', 2, 28, 0, '', ''), # 4
        ('e4da3b7fbbce2345d7772b0674a318d5','みかきん', 1, 30, 1, 'Gluten allergy, Prefers vegetarian', ''), # 5
        ('1679091c5a880faf6fb5e6087eb1b2dc','さよねぇ', 2, 28, 0, '', ''), # 6
        ('8f14e45fceea167a5a36dedd4bea2543', 'もっちゃん', 2, 31, 0, '', ''), # 7
        ('c9f0f895fb98ab9159f51fd0297e236d','さよ', 2, 50, 0, '', ''), # 8
        ('45c48cce2e2d7fbdea1afc51c7c6ad26', 'しゅんぺい', 3, 29, 0, '', ''), # 9
        ('d3d9446802a44259755d38e6d163e820', 'はるちゃん', 3, 22, 1, 'ピーナッツ', '喘息持ち'), # 10
        ('6512bd43d9caa6e02c990b0a82652dca', 'まーくん', 3, 28, 0, '', ''), # 11
        ('c20ad4d76fe97759aa27a0c99bff6710', '福山', 3, 32, 1, 'カニ', ''), # 12
        ('c51ce410c124a10e0db5e4b97fc2af39', 'ちかちゃん', 4, 26, 0, '', ''), # 13
        ('aab3238922bcc25a6f606eb525ffdc56', 'こうた', 4, 24, 1, '乳製品', ''), # 14
        ('9bf31c7ff062936a96d3c8bd1f8f2ff3', 'さくら', 4, 29, 0, '', ''), # 15
        ('c74d97b01eae257e44aa9d5bade97baf', 'ゆかりん', 4, 27, 1, 'そば', 'アレルギーは軽度') # 16

    ])
    conn.commit()


def make_testData_serveLog(conn: sqlite3.Connection) -> None:
    cur: sqlite3.Cursor = conn.cursor()
    cur.executemany('''
        INSERT INTO serveLog (person_id, asGroup, receiveClassID) VALUES (?, ?, ?)
    ''', [
        ('1679091c5a880faf6fb5e6087eb1b2dc', True, 1),
        ('1679091c5a880faf6fb5e6087eb1b2dc', True, 1),
        ('1679091c5a880faf6fb5e6087eb1b2dc', True, 2),
        ('c81e728d9d4c2f636f067f89cc14862c', False, 3),
        ('c81e728d9d4c2f636f067f89cc14862c', False, 1),
        ('e4da3b7fbbce2345d7772b0674a318d5', True, 2)
        ('e4da3b7fbbce2345d7772b0674a318d5', True, 2)
        ('c74d97b01eae257e44aa9d5bade97baf', True, 3)
        ('c74d97b01eae257e44aa9d5bade97baf', True, 5)
    ])
    conn.commit()

def make_testData_stockList(conn: sqlite3.Connection) -> None:
    cur: sqlite3.Cursor = conn.cursor()
    cur.executemany('''
        INSERT INTO stockList (name, size, unit, allergy, janureID) VALUES (?, ?, ?, ?, ?)
    ''', [
        ('米', '500', 'g', 0, 1),               # 1
        ('水', '250', 'ml', 0, 1),              # 2
        ('水', '500', 'ml', 0, 1),              # 3
        ('水', '1000', 'ml', 0, 1),             # 4
        ('クルミパン', None, '個', 1, 1),        # 5
        ('缶パン', None, '個', 24, 1),           # 6
        ('クラッカー', None, '個', 24, 1),       # 7        ('みそ汁', None, '杯', 24, 1),           # 6
        ('おにぎり', None, '個', 24, 1),         # 8
        ('おかゆ', None, '個', 24, 1),           # 9
        ('乾電池', '単4', '本', 0, 2),           # 10
        ('乾電池', '単3', '本', 0, 2),           # 11
        ('絆創膏', None, '枚', 0, 3)            # 12
    ])
    conn.commit()

def make_testData_stockIO(conn: sqlite3.Connection) -> None:
    cur: sqlite3.Cursor = conn.cursor()
    cur.executemany('''
        INSERT INTO stockIO (stockList_id, serveLog_id, amount) VALUES (?, ?, ?)
    ''',[
        (1, None, 100),
        (2, None, 100),
        (3, None, 100),
        (4, None, 100),
        (5, None, 100),
        (6, None, 100),
        (7, None, 100),
        (8, None, 100),
        (9, None, 100),
        (1, 1, -1),
        (2, 2, -2),
        (3, 3, -3),
        (4, 4, -4),
        (5, None, 100),
        (6, 2, -1),
        (7, 3, -1),
        (8, 3, -1),
        (9, 1, -1)
    ])
    conn.commit()

def open_db(fileName:str) -> sqlite3.Connection:
    conn:sqlite3.Connection = sqlite3.connect(fileName)
    return conn

def setup_db_person(conn: sqlite3.Connection) -> None:
    cur:sqlite3.Cursor = conn.cursor()
    cur.execute('DROP TABLE IF EXISTS person')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS person (
        id TEXT PRIMARY KEY NOT NULL,
        nickName TEXT NOT NULL,
        group_id INTEGER default NULL,
        age INTEGER NOT NULL,
        allergy INTEGER NOT NULL default 0,
        remarks_food TEXT,
        remarks_other TEXT,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
        updated_at TEXT NOT NULL DEFAULT (DATETIME('now', '+9 hours'))
    )
    ''')
    conn.execute('PRAGMA foreign_keys = ON')
    conn.commit()
    make_testData_person(conn)

def setup_db_serveLog(conn: sqlite3.Connection) -> None:
    cur: sqlite3.Cursor = conn.cursor()
    cur.execute('DROP TABLE IF EXISTS serveLog')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS serveLog (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        person_id TEXT NOT NULL,
        asGroup BOOLEAN NOT NULL DEFAULT FALSE,
        receiveClassID INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
        FOREIGN KEY (person_id) REFERENCES person(id)
    )
    ''')
    conn.execute('PRAGMA foreign_keys = ON')
    conn.commit()
    make_testData_serveLog(conn)


def setup_db_stockList(conn: sqlite3.Connection) -> None:
    cur:sqlite3.Cursor = conn.cursor()
    cur.execute('DROP TABLE IF EXISTS stockList')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS stockList (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        size TEXT,
        unit TEXT NOT NULL, 
        allergy INTEGER NOT NULL default 0,
        janureID INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', '+9 hours'))
    )
    ''')
    conn.execute('PRAGMA foreign_keys = ON')
    conn.commit()
    make_testData_stockList(conn)
    

def setup_db_stockIO(conn: sqlite3.Connection) -> None:
    cur:sqlite3.Cursor = conn.cursor()
    cur.execute('DROP TABLE IF EXISTS stockIO')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS stockIO (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stockList_id INTEGER NOT NULL,
        serveLog_id INTEGER,
        amount INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
        FOREIGN KEY (serveLog_id) REFERENCES serveLog(id),
        FOREIGN KEY (stockList_id) REFERENCES stockList(id)
    )
    ''')
    conn.execute('PRAGMA foreign_keys = ON')
    conn.commit()
    make_testData_stockIO(conn)
    # If serveLog_id is NULL, it means that the stock is imported from the outside.