from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.sql import text
from datetime import datetime

from models.default_list import Base
from models.person import Base
from models.stock_list import Base
from models.receive_log import Base
from models.stock_io import Base
from models.qr_read import Base


from models.person import Person
from models.stock_list import StockList

import os
import shutil

DB_URL = "sqlite:///./dataBase.db"
engine = create_engine(
    DB_URL,
    echo = True
)

Session = scoped_session(
    sessionmaker(
        bind=engine,
        autocommit=False,
        autoflush=False # False にすると、commit() が必要になる
    )
)

def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    
    if os.path.exists("dataBase.db"):
        now = datetime.now().strftime('%Y%m%d%H%M%S')
        if not os.path.exists("../db_backup"):
            os.makedirs("../db_backup")
        shutil.copy("dataBase.db", f"../db_backup/dataBase_{now}.db")

    reset_database()
    session = Session()
    
    session.execute(text('PRAGMA foreign_keys = ON;'))
    session.add_all([
        Person(
            id='202501150001',
            nick_name='2,11',
            group_id=None,
            age=46,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150002',
            nick_name='2,12',
            group_id=None,
            age=6,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150003',
            nick_name='2,13',
            group_id=None,
            age=29,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150004',
            nick_name='2,14',
            group_id=None,
            age=14,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150005',
            nick_name='2,15',
            group_id=None,
            age=7,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150006',
            nick_name='1,11',
            group_id=1,
            age=32,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150007',
            nick_name='1,12',
            group_id=2,
            age=30,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150008',
            nick_name='1,13',
            group_id=3,
            age=69,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150009',
            nick_name='1,14',
            group_id=4,
            age=15,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150010',
            nick_name='1,15',
            group_id=5,
            age=75,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150016',
            nick_name='1,16',
            group_id=6,
            age=52,
            allergy=1,
            remarks_food='そば',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150017',
            nick_name='1,17',
            group_id=7,
            age=51,
            allergy=1,
            remarks_food='大豆',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150018',
            nick_name='1,18',
            group_id=8,
            age=33,
            allergy=1,
            remarks_food='鶏卵',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150019',
            nick_name='1,19',
            group_id=9,
            age=52,
            allergy=1,
            remarks_food='牛乳',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150020',
            nick_name='1,20',
            group_id=10,
            age=25,
            allergy=1,
            remarks_food='りんご',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150011',
            nick_name='2,16',
            group_id=None,
            age=42,
            allergy=1,
            remarks_food='鶏卵',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150012',
            nick_name='2,17',
            group_id=None,
            age=11,
            allergy=1,
            remarks_food='エビ;カニ',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150013',
            nick_name='2,18',
            group_id=None,
            age=25,
            allergy=1,
            remarks_food='牛乳',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150014',
            nick_name='2,19',
            group_id=None,
            age=47,
            allergy=1,
            remarks_food='魚類',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150015',
            nick_name='2,20',
            group_id=None,
            age=35,
            allergy=1,
            remarks_food='鶏卵;小麦',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150021',
            nick_name='2,11',
            group_id=11,
            age=22,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150022',
            nick_name='2,12',
            group_id=12,
            age=70,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150023',
            nick_name='2,13',
            group_id=None,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150024',
            nick_name='2,14',
            group_id=None,
            age=33,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150025',
            nick_name='2,15',
            group_id=None,
            age=2,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150026',
            nick_name='3,11',
            group_id=1,
            age=28,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150027',
            nick_name='3,12',
            group_id=1,
            age=35,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150028',
            nick_name='3,13',
            group_id=1,
            age=42,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150029',
            nick_name='3,14',
            group_id=1,
            age=27,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ2 (4人)
        Person(
            id='202501150030',
            nick_name='3,15',
            group_id=2,
            age=50,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150031',
            nick_name='3,16',
            group_id=2,
            age=29,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150032',
            nick_name='3,17',
            group_id=2,
            age=33,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150033',
            nick_name='3,18',
            group_id=2,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ3 (4人)
        Person(
            id='202501150034',
            nick_name='3,19',
            group_id=3,
            age=38,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150035',
            nick_name='3,20',
            group_id=3,
            age=26,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150036',
            nick_name='4,11',
            group_id=3,
            age=45,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150037',
            nick_name='4,12',
            group_id=3,
            age=37,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ4 (4人)
        Person(
            id='202501150038',
            nick_name='4,13',
            group_id=4,
            age=53,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150039',
            nick_name='4,14',
            group_id=4,
            age=31,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150040',
            nick_name='4,15',
            group_id=4,
            age=40,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150041',
            nick_name='4,15',
            group_id=4,
            age=22,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ5 (2人)
        Person(
            id='202501150042',
            nick_name='4,16',
            group_id=5,
            age=60,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150043',
            nick_name='4,17',
            group_id=5,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ6 (2人)
        Person(
            id='202501150044',
            nick_name='4,18',
            group_id=6,
            age=44,
            allergy=0,
            remarks_food='そば',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150045',
            nick_name='4,19',
            group_id=6,
            age=32,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ7 (4人)
        Person(
            id='202501150046',
            nick_name='4,20',
            group_id=7,
            age=28,
            allergy=0,
            remarks_food='大豆',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150047',
            nick_name='5,11',
            group_id=7,
            age=34,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150048',
            nick_name='5,12',
            group_id=7,
            age=42,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150049',
            nick_name='5,13',
            group_id=7,
            age=37,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ8 (2人)
        Person(
            id='202501150050',
            nick_name='5,14',
            group_id=8,
            age=50,
            allergy=0,
            remarks_food='鶏卵',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150051',
            nick_name='5,15',
            group_id=8,
            age=33,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ9 (4人)
        Person(
            id='202501150052',
            nick_name='5,16',
            group_id=9,
            age=43,
            allergy=0,
            remarks_food='牛乳',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150053',
            nick_name='5,17',
            group_id=9,
            age=29,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150054',
            nick_name='5,18',
            group_id=9,
            age=38,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150055',
            nick_name='5,19',
            group_id=9,
            age=31,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ10 (4人)
        Person(
            id='202501150056',
            nick_name='5,20',
            group_id=10,
            age=45,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150057',
            nick_name='6,11',
            group_id=10,
            age=30,
            allergy=0,
            remarks_food='りんご',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150058',
            nick_name='6,12',
            group_id=10,
            age=38,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='202501150059',
            nick_name='6,13',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='1',
            nick_name='7,11',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='2',
            nick_name='7,12',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='21',
            nick_name='7,13',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='22',
            nick_name='7,14',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='16',
            nick_name='7,15',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='17',
            nick_name='7,16',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='11',
            nick_name='7,17',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='12',
            nick_name='7,18',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='6',
            nick_name='7,19',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='7',
            nick_name='7,20',
            group_id=10,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
    ])
    session.commit()
    session.add_all([
        StockList(name='水', size='250', unit='本', allergy=0, janure_id=1),
        StockList(name='保存用パン', size=None, unit='個', allergy=1, janure_id=1),
        StockList(name='米粉クッキー', size=None, unit='個', allergy=24, janure_id=1),
       # StockList(name='えびピラフ', size=None, unit='個', allergy=0, janure_id=2),
       # StockList(name='アルファ米アレルギーフリー', size=None, unit='個', allergy=0, janure_id=2),
       StockList(name='カルボナーラ', size=None, unit='個', allergy=0, janure_id=3),
       StockList(name='パスタアレルギーフリー', size=None, unit='個', allergy=0, janure_id=2)
    ])
    session.commit()
    
