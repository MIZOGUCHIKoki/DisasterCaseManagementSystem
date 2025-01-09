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
    reset_database()
    session = Session()
    
    session.execute(text('PRAGMA foreign_keys = ON;'))
    session.add_all([
        Person(
            id='1',
            nick_name='1,2,3',
            group_id=None,
            age=46,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='2',
            nick_name='4,5,6',
            group_id=None,
            age=6,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='3',
            nick_name='7,8,9',
            group_id=None,
            age=29,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='4',
            nick_name='10,1,2',
            group_id=None,
            age=14,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='5',
            nick_name='赤堀 雅代',
            group_id=None,
            age=7,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='6',
            nick_name='笠井 直子',
            group_id=1,
            age=0,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='7',
            nick_name='川見 達人',
            group_id=2,
            age=30,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='8',
            nick_name='竹内 一晃',
            group_id=3,
            age=69,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='9',
            nick_name='吉田 和美',
            group_id=4,
            age=15,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='10',
            nick_name='東根 真実',
            group_id=5,
            age=75,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='16',
            nick_name='長谷川 芳美',
            group_id=6,
            age=52,
            allergy=1,
            remarks_food='そば',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='17',
            nick_name='平井 剛士',
            group_id=7,
            age=51,
            allergy=1,
            remarks_food='大豆',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='18',
            nick_name='木村 直美',
            group_id=8,
            age=33,
            allergy=1,
            remarks_food='鶏卵',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='19',
            nick_name='武藤 悟',
            group_id=9,
            age=52,
            allergy=1,
            remarks_food='牛乳',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='20',
            nick_name='吉田 英樹',
            group_id=10,
            age=25,
            allergy=1,
            remarks_food='りんご',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='11',
            nick_name='田中 昭次',
            group_id=None,
            age=42,
            allergy=1,
            remarks_food='鶏卵',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='12',
            nick_name='森川 俊一',
            group_id=None,
            age=11,
            allergy=1,
            remarks_food='エビ;カニ',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='13',
            nick_name='丹羽 義典',
            group_id=None,
            age=25,
            allergy=1,
            remarks_food='牛乳',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='14',
            nick_name='中村 さおり',
            group_id=None,
            age=47,
            allergy=1,
            remarks_food='魚類',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='15',
            nick_name='中村 雄二郎',
            group_id=None,
            age=35,
            allergy=1,
            remarks_food='鶏卵;小麦',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='21',
            nick_name='吉岡 匠',
            group_id=11,
            age=22,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='22',
            nick_name='谷 保',
            group_id=12,
            age=70,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='23',
            nick_name='鈴木 秀太',
            group_id=None,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='24',
            nick_name='山本 林太郎',
            group_id=None,
            age=33,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='25',
            nick_name='金子 大介',
            group_id=None,
            age=2,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='26',
            nick_name='田中 太郎',
            group_id=1,
            age=28,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='27',
            nick_name='佐藤 花子',
            group_id=1,
            age=35,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='28',
            nick_name='鈴木 一郎',
            group_id=1,
            age=42,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='29',
            nick_name='高橋 美咲',
            group_id=1,
            age=27,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ2 (4人)
        Person(
            id='30',
            nick_name='山本 俊介',
            group_id=2,
            age=50,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='31',
            nick_name='中村 亜美',
            group_id=2,
            age=29,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='32',
            nick_name='小林 祐樹',
            group_id=2,
            age=33,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='33',
            nick_name='加藤 理恵',
            group_id=2,
            age=41,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ3 (4人)
        Person(
            id='34',
            nick_name='清水 遼',
            group_id=3,
            age=38,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='35',
            nick_name='石井 優子',
            group_id=3,
            age=26,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='36',
            nick_name='長谷川 大輔',
            group_id=3,
            age=45,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='37',
            nick_name='藤田 香織',
            group_id=3,
            age=37,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ4 (4人)
        Person(
            id='38',
            nick_name='吉田 圭一',
            group_id=4,
            age=53,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='39',
            nick_name='宮崎 沙織',
            group_id=4,
            age=31,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='40',
            nick_name='竹内 修',
            group_id=4,
            age=40,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='41',
            nick_name='岡田 紗江',
            group_id=4,
            age=22,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ5 (2人)
        Person(
            id='42',
            nick_name='佐々木 隆',
            group_id=5,
            age=60,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='43',
            nick_name='西村 美穂',
            group_id=5,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ6 (2人)
        Person(
            id='44',
            nick_name='清水 明',
            group_id=6,
            age=44,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='45',
            nick_name='中川 真理',
            group_id=6,
            age=32,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ7 (4人)
        Person(
            id='46',
            nick_name='大西 博',
            group_id=7,
            age=28,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='47',
            nick_name='田村 智子',
            group_id=7,
            age=34,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='48',
            nick_name='松本 貴志',
            group_id=7,
            age=42,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='49',
            nick_name='遠藤 由紀',
            group_id=7,
            age=37,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ8 (2人)
        Person(
            id='50',
            nick_name='河野 明子',
            group_id=8,
            age=50,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='51',
            nick_name='永井 大樹',
            group_id=8,
            age=33,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ9 (4人)
        Person(
            id='52',
            nick_name='1, 2, 2',
            group_id=9,
            age=43,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='53',
            nick_name='1,1,1',
            group_id=9,
            age=29,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='54',
            nick_name='2,3,1',
            group_id=9,
            age=38,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='55',
            nick_name='10,2,1',
            group_id=9,
            age=31,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        
        # グループ10 (4人)
        Person(
            id='56',
            nick_name='岡本 昭夫',
            group_id=10,
            age=45,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='57',
            nick_name='田島 美佳',
            group_id=10,
            age=30,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='58',
            nick_name='岩田 英子',
            group_id=10,
            age=38,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='59',
            nick_name='小松 光一',
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
        StockList(name='えびピラフ', size=None, unit='個', allergy=0, janure_id=2),
        StockList(name='アルファ米アレルギーフリー', size=None, unit='個', allergy=0, janure_id=2),
        StockList(name='カルボナーラ', size=None, unit='個', allergy=0, janure_id=3),
        StockList(name='パスタアレルギーフリー', size=None, unit='個', allergy=0, janure_id=2)
    ])
    session.commit()
    