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
        ('1679091c5a880faf6fb5e6087eb1b2dc','さよねぇ', 2, 28, 0, '', '') # 6
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
        ('クルミパン', None, '個', 1, 1),         # 5
        ('食パン', None, '斤', 24, 1),           # 6
        ('乾電池', '単4', '本', 0, 2),           # 7
        ('乾電池', '単3', '本', 0, 2),           # 8
        ('絆創膏', None, '枚', 0, 3)            # 9
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
        (6, None, -1),
        (7, 3, -1),
        (8, None, -1),
        (9, None, -1)
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