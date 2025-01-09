from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from datetime import datetime
from sqlalchemy.sql import text

from models.default_list import Base
from models.person import Base
from models.stock_list import Base
from models.receive_log import Base
from models.stock_io import Base

from models.person import Person
from models.stock_list import StockList
from models.default_list import DefaultList
from models.receive_log import ReceiveLog
from models.stock_io import StockIO


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
            id='1147d50765e7bbf4aa732e3273113c85',
            nick_name='おみおみー',
            group_id=1,
            age=25,
            allergy=0,
            remarks_food='ピーナッツアレルギー',
            remarks_other='埃ダメ',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='1679091c5a880faf6fb5e6087eb1b2dc',
            nick_name='武蔵',
            group_id=1,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='c81e728d9d4c2f636f067f89cc14862c',
            nick_name='愛美',
            group_id=1,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='c9f0f895fb98ab9159f51fd0297e236d',
            nick_name='さく',
            group_id=1,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ),
        Person(
            id='c51ce410c124a10e0db5e4b97fc2af39',
            nick_name='三上',
            group_id=None,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし',
            created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        )
    ])
    session.commit()
    session.add_all([
        StockList(name='米', size='500', unit='g', allergy=0, janure_id=1),
        StockList(name='水', size='250', unit='ml', allergy=0, janure_id=1),
        StockList(name='水', size='500', unit='ml', allergy=0, janure_id=1),
        StockList(name='水', size='1000', unit='ml', allergy=0, janure_id=1),
        StockList(name='クルミパン', size=None, unit='個', allergy=1, janure_id=1),
        StockList(name='食パン', size=None, unit='斤', allergy=24, janure_id=1),
        StockList(name='乾電池', size='単4', unit='本', allergy=0, janure_id=2),
        StockList(name='乾電池', size='単3', unit='本', allergy=0, janure_id=2),
        StockList(name='絆創膏', size=None, unit='枚', allergy=0, janure_id=3),
    ])
    session.commit()

    session.add_all([
        DefaultList(stock_list_id=1, amount=2, isAccepted=True),
        DefaultList(stock_list_id=3, amount=4, isAccepted=True),
        DefaultList(stock_list_id=5, amount=6, isAccepted=True)
    ])
    session.commit()

    session.add_all([
        ReceiveLog(person_id='1147d50765e7bbf4aa732e3273113c85', receive_class=1, number_of_people=1)
    ])
    session.commit()

    session.add_all([
        StockIO(stock_list_id=1, receive_log_id=None, amount=10),
        StockIO(stock_list_id=1, receive_log_id=1, amount=2),
        StockIO(stock_list_id=3, receive_log_id=1, amount=4),
    ])
    session.commit()

    