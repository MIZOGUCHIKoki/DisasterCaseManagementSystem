from sqlalchemy import Column, Integer, String, DateTime, func

from setting import Engine
from setting import Base

class Person(Base):
    __tablename__ = 'person'
    __table_args__ = {
        'comment': 'ユーザのテーブル'
    }
    
    id = Column('id', String, primary_key=True)
    nickName = Column('nickName', String, nullable=False)
    group_id = Column('group_id', Integer, default=None)
    age = Column('age', Integer, default=None)
    allergy = Column('allergy', Integer, default=0)
    remarks_food = Column('remarks_food', String, default=None)
    remarks_other = Column('remarks_other', String, default=None)
    created_at = Column('created_at', DateTime, default=func.now())

if __name__ == '__main__':
    Base.metadata.create_all(bind = Engine)