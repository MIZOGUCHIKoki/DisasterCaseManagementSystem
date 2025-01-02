import sqlite3

def make_testData_person(conn: sqlite3.Connection) -> None:
    cur: sqlite3.Cursor = conn.cursor()
    cur.executemany('''
        INSERT INTO person (id, nickName, group_id, age, allergy, remarks_food, remarks_other) VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', [
        ('1147d50765e7bbf4aa732e3273113c85','おみおみー', 1, 25, 0, 'ピーナッツアレルギー', '埃ダメ'),   # 1
        ('1679091c5a880faf6fb5e6087eb1b2dc','武蔵', 1, 25, 0, 'なし', 'なし'),   # 2
        ('c81e728d9d4c2f636f067f89cc14862c','愛美', 1, 25, 0, 'なし', 'なし'),   # 3
        ('c9f0f895fb98ab9159f51fd0297e236d','さく', 1, 25, 0, 'なし', 'なし'),   # 4
        ('c51ce410c124a10e0db5e4b97fc2af39','三上', None, 25, 0, 'なし', 'なし'),   # 5
    ])
    conn.commit()


def make_testData_serveLog(conn: sqlite3.Connection) -> None:
    cur: sqlite3.Cursor = conn.cursor()
    cur.executemany('''
        INSERT INTO serveLog (person_id, numberOfPerson, receiveClassID) VALUES (?, ?, ?)
    ''', [
        ('1147d50765e7bbf4aa732e3273113c85', 2, 0),   # 1
        ('1679091c5a880faf6fb5e6087eb1b2dc', 1, 0),   # 2
        ('c81e728d9d4c2f636f067f89cc14862c', 1, 0),   # 3
        ('c9f0f895fb98ab9159f51fd0297e236d', 1, 0),   # 4
        ('c51ce410c124a10e0db5e4b97fc2af39', 1, 0)
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
        (1,1,10),
        (2,1,20)
    ])
    conn.commit()

def make_testData_defaultList(conn: sqlite3.Connection) -> None:
    cur: sqlite3.Cursor = conn.cursor()
    cur.executemany('''
        INSERT INTO defaultList (stockList_id, amount) VALUES (?, ?)
    ''',[
        (1, 10),
        (2, 20)
    ])
    conn.commit()

def setup_db_person(conn: sqlite3.Connection) -> None:
    cur:sqlite3.Cursor = conn.cursor()
    cur.execute('''
    CREATE TABLE IF NOT EXISTS person (
        id TEXT PRIMARY KEY NOT NULL,
        nickName TEXT NOT NULL,
        group_id INTEGER default NULL,
        age INTEGER NOT NULL,
        allergy INTEGER NOT NULL default 0,
        remarks_food TEXT,
        remarks_other TEXT,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', '+9 hours'))
    )
    ''')
    conn.commit()
    make_testData_person(conn)

def setup_db_serveLog(conn: sqlite3.Connection) -> None:
    cur: sqlite3.Cursor = conn.cursor()
    cur.execute('''
    CREATE TABLE IF NOT EXISTS serveLog (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        person_id TEXT NOT NULL,
        numberOfPerson INTEGER NOT NULL DEFAULT 1,
        receiveClassID INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
        FOREIGN KEY (person_id) REFERENCES person(id)
    )
    ''')
    conn.commit()
    make_testData_serveLog(conn)


def setup_db_stockList(conn: sqlite3.Connection) -> None:
    cur:sqlite3.Cursor = conn.cursor()
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
    conn.commit()
    make_testData_stockList(conn)
    

def setup_db_stockIO(conn: sqlite3.Connection) -> None:
    cur:sqlite3.Cursor = conn.cursor()
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
    conn.commit()
    # make_testData_stockIO(conn)
    # If serveLog_id is NULL, it means that the stock is imported from the outside.

def setup_db_defaultList(conn: sqlite3.Connection) -> None:
    cur:sqlite3.Cursor = conn.cursor()
    cur.execute('''
    CREATE TABLE IF NOT EXISTS defaultList (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stockList_id INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
        FOREIGN KEY (stockList_id) REFERENCES stockList(id)
    )
    ''')
    conn.commit()
    make_testData_defaultList(conn)


def initialize_database(conn:sqlite3.Connection) -> None:
    conn.execute("PRAGMA foreign_keys = OFF;")
    cur:sqlite3.Cursor = conn.cursor()
    cur.execute('DROP TABLE IF EXISTS person')
    cur.execute('DROP TABLE IF EXISTS serveLog')
    cur.execute('DROP TABLE IF EXISTS stockList')
    cur.execute('DROP TABLE IF EXISTS stockIO')
    cur.execute('DROP TABLE IF EXISTS defaultList')
    conn.commit()

def setup_database(conn: sqlite3.Connection) -> None:
    initialize_database(conn)
    conn.execute("PRAGMA foreign_keys = ON;")
    print (conn.execute("PRAGMA foreign_keys").fetchone())
    setup_db_person(conn)
    setup_db_serveLog(conn)
    setup_db_stockList(conn)
    setup_db_stockIO(conn)
    setup_db_defaultList(conn)
    print("Database setup")