from setting import Engine, Base, Session
from person import Person
from stockList import StockList
from serveLog import ServeLog
from stockIO import StockIO
from waitingQueue import WaitingQueue
from defaultList import DefaultList
import os

if __name__ == '__main__':
    if os.path.exists('dataBase.db'):
        os.remove('dataBase.db')
    Base.metadata.create_all(bind=Engine)
    session = Session()
    session.add_all([
        Person(
            id='1147d50765e7bbf4aa732e3273113c85',
            nickName='おみおみー',
            group_id=1,
            age=25,
            allergy=0,
            remarks_food='ピーナッツアレルギー',
            remarks_other='埃ダメ'
        ),
        Person(
            id='1679091c5a880faf6fb5e6087eb1b2dc',
            nickName='武蔵',
            group_id=1,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし'
        ),
        Person(
            id='c81e728d9d4c2f636f067f89cc14862c',
            nickName='愛美',
            group_id=1,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし'
        ),
        Person(
            id='c9f0f895fb98ab9159f51fd0297e236d',
            nickName='さく',
            group_id=1,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし'
        ),
        Person(
            id='c51ce410c124a10e0db5e4b97fc2af39',
            nickName='三上',
            group_id=None,
            age=25,
            allergy=0,
            remarks_food='なし',
            remarks_other='なし'
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