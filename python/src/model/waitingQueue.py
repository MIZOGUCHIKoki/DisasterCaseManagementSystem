from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, ForeignKey

from setting import Engine
from setting import Base

from person import Person

class WaitingQueue(Base):
    __tablename__ = 'waiting_queue'
    __table_args__ = {
        'comment': '待ち行列のテーブル'
    }
    
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    person_id = Column('person_id', String, ForeignKey('person.id'), nullable=False)
    number_of_person = Column('number_of_person', Integer, nullable=False)
    created_at = Column('created_at', DateTime, default=func.now())

if __name__ == '__main__':
    Base.metadata.create_all(bind = Engine)